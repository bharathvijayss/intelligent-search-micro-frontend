import { Component, DestroyRef, effect, inject, input, OnInit, untracked } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IDateFilter } from '../../model/date-filter';
import { DateFilters } from '../../store/quick-find.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateAdapter } from '@angular/material/core';
import { debounceTime, skip } from 'rxjs';
import { QuickFindStore } from '../../store/quick-find.store';

@Component({
  selector: 'en8-qf-date-filters',
  templateUrl: './qf-date-filters.component.html',
  styleUrls: ['./qf-date-filters.component.scss'],
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    TranslateModule,
    NgClass
  ]
})
export class QfDateFiltersComponent implements OnInit {

  dateFilters!: IDateFilter[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

  readonly dateRange = new FormGroup({
    fromDate: new FormControl<Date | null>(null),
    toDate: new FormControl<Date | null>(null),
  });

  store = inject(QuickFindStore);

  constructor(
    private _dateAdapter: DateAdapter<Date>,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.initDateFilterTypes();
    this.initSearch();
  }

  dateRangeEffectRef = effect(() => {
    const appliedDateFilter = this.store.dateFilter.type();
    untracked(() => {
      const appliedFilter = this.store.dateFilter();
      this.dateRange.setValue({ fromDate: appliedFilter.fromDate, toDate: appliedFilter.toDate });
    })
    if (appliedDateFilter === DateFilters.allTime) {
      this.dateRange.enable({ emitEvent: false });
    } else {
      this.dateRange.disable({ emitEvent: false });
    }
  })

  initDateFilterTypes() {
    this.dateFilters = [
      { value: DateFilters.allTime, label: this.locale().filters.date[DateFilters.allTime] },
      { value: DateFilters.today, label: this.locale().filters.date[DateFilters.today] },
      { value: DateFilters.lastWeek, label: this.locale().filters.date[DateFilters.lastWeek] },
      { value: DateFilters.lastMonth, label: this.locale().filters.date[DateFilters.lastMonth] }
    ];
  }

  initSearch() {
    this.dateRange.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(100),
        skip(1)
      ).subscribe({
        next: () => {
          this.store.getResult();
        }
      });
  }

  applyCustomDateRange() {
    this.store.setFromAndToDate(this.dateRange.value);
  }

  dateFilterChanged(changeValue: MatSelectChange) {
    const currentDate = this._dateAdapter.today();
    switch (changeValue.value) {
      case DateFilters.allTime: {
        this.store.setDateFilter({
          fromDate: null,
          toDate: null,
          type: DateFilters.allTime
        })
        break;
      }
      case DateFilters.today: {
        this.store.setDateFilter({
          fromDate: currentDate,
          toDate: currentDate,
          type: DateFilters.today
        })
        break;
      }
      case DateFilters.lastWeek: {
        this.store.setDateFilter({
          fromDate: this._dateAdapter.addCalendarDays(currentDate, -6),
          toDate: currentDate,
          type: DateFilters.lastWeek
        })
        break;
      }
      case DateFilters.lastMonth: {
        this.store.setDateFilter({
          fromDate: this._dateAdapter.addCalendarMonths(currentDate, -1),
          toDate: currentDate,
          type: DateFilters.lastMonth
        })
        break;
      }
    }
  }

}
