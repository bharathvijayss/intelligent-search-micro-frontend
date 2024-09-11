import { Component, DestroyRef, effect, inject, input, OnInit } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IDateFilter } from '../../model/date-filter';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs';
import { QuickFindStore } from '../../store/quick-find.store';
import { DateFilters } from '../../store/quick-find.constant';

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
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.initDateFilterTypes();
    this.initSearch();
  }

  dateRangeEffectRef = effect(() => {

    const appliedFilter = this.store.dateFilter();
    this.dateRange.setValue({ fromDate: appliedFilter.fromDate, toDate: appliedFilter.toDate });

    if (appliedFilter.type === DateFilters.allTime) {
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
        distinctUntilChanged((prev, next) => prev.fromDate === next.fromDate && prev.toDate === next.toDate),
        debounceTime(50),
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
    this.store.setDateFilter(changeValue.value);
  }

}
