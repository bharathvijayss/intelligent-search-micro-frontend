import { Component, DestroyRef, effect, inject, Injector, input, OnInit, signal, untracked, WritableSignal } from '@angular/core';
import { QuickFindStore } from '../store/quick-find.store';
import { IFilter } from '../model/filter';
import { DateFilters, FilterType } from '../store/quick-find.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IDateFilter } from '../model/date-filter';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, skip } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'en8-qf-modal-filters',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatAccordion,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    TranslateModule,
    NgClass
  ],
  templateUrl: './qf-modal-filters.component.html',
  styleUrl: './qf-modal-filters.component.scss',
})
export class QFModalFiltersComponent implements OnInit {

  filters!: IFilter[];

  store = inject(QuickFindStore);

  translateSrv = inject(TranslateService);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

  filterTitle: WritableSignal<string> = signal("");

  dateFilters!: IDateFilter[];

  readonly dateRange = new FormGroup({
    fromDate: new FormControl<Date | null>(null),
    toDate: new FormControl<Date | null>(null),
  });

  constructor(
    private injector: Injector,
    private _dateAdapter: DateAdapter<Date>,
    private destroyRef: DestroyRef
  ) { }

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

  ngOnInit(): void {
    this.initDateFilterTypes();
    this.initFilterTypes();
    this.initSearch();
  }

  applyCustomDateRange() {
    this.store.setFromAndToDate(this.dateRange.value);
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

  initFilterTypes() {
    this.filters = [
      {
        name: this.locale().filters.work_items.all,
        state: this.store.allWorkItems,
        subfilters: [
          { name: this.locale().filters.work_items.case, completed: this.store.filters[FilterType.case], type: FilterType.case },
          { name: this.locale().filters.work_items.ticket, completed: this.store.filters[FilterType.ticket], type: FilterType.ticket },
          { name: this.locale().filters.work_items.action, completed: this.store.filters[FilterType.action], type: FilterType.action },
        ],
      }, {
        name: this.locale().filters.comms.all,
        state: this.store.allComms,
        subfilters: [
          { name: this.locale().filters.comms.received, completed: this.store.filters[FilterType.inboundEmail], type: FilterType.inboundEmail },
          { name: this.locale().filters.comms.sent, completed: this.store.filters[FilterType.outboundEmail], type: FilterType.outboundEmail },
          { name: this.locale().filters.comms.notes, completed: this.store.filters[FilterType.notes], type: FilterType.notes },
          { name: this.locale().filters.comms.self_service, completed: this.store.filters[FilterType.selfServiceComments], type: FilterType.selfServiceComments },
        ],
      }, {
        name: this.locale().filters.users.all,
        state: this.store.allUsers,
        subfilters: [
          { name: this.locale().filters.users.external, completed: this.store.filters[FilterType.contact], type: FilterType.contact },
          { name: this.locale().filters.users.internal, completed: this.store.filters[FilterType.serviceAgent], type: FilterType.serviceAgent },
        ],
      }, {
        name: this.locale().filters.files.all,
        state: this.store.allFiles,
        subfilters: [
          { name: this.locale().filters.files.work_item, completed: this.store.filters[FilterType.fileAttachmentToPacket], type: FilterType.fileAttachmentToPacket },
          { name: this.locale().filters.files.communication, completed: this.store.filters[FilterType.fileAttachmentToEmail], type: FilterType.fileAttachmentToEmail },
        ],
      }
    ]
    effect(() => {
      this.initFilterTitle();
    }, { injector: this.injector, allowSignalWrites: true });
  }

  initDateFilterTypes() {
    this.dateFilters = [
      { value: DateFilters.allTime, label: this.locale().filters.date[DateFilters.allTime] },
      { value: DateFilters.today, label: this.locale().filters.date[DateFilters.today] },
      { value: DateFilters.lastWeek, label: this.locale().filters.date[DateFilters.lastWeek] },
      { value: DateFilters.lastMonth, label: this.locale().filters.date[DateFilters.lastMonth] }
    ];
  }

  initFilterTitle() {
    const allFiltersApplied = this.filters.every(filter => filter.state().completed);

    if (allFiltersApplied) {
      this.setAllFiltersAppliedTitle();
      return;
    }

    const { appliedFilters, multiFiltersAppliedCount, singleFilterIndex } = this.getAppliedFiltersInfo();

    if (this.shouldSetMultipleFiltersTitle(multiFiltersAppliedCount, singleFilterIndex)) {
      this.setMultipleFiltersTitle(appliedFilters);
      return;
    }

    this.setSingleFilterTitle(singleFilterIndex);
  }

  setAllFiltersAppliedTitle() {
    this.filterTitle.set(this.getAppliedFiltersTitle(this.locale().filters.all));
  }

  getAppliedFiltersTitle(placeholder: string) {
    return this.translateSrv.instant("header.intelligent_search.filters.applied_filters_title", {
      'f': placeholder
    })
  }

  getAppliedFiltersInfo() {
    const appliedFilters: string[] = [];
    let multiFiltersAppliedCount = 0;
    let singleFilterIndex = -1;

    this.filters.forEach((filter, i) => {
      if (filter.state().completed || filter.state().indeterminate) {
        singleFilterIndex = i;
        multiFiltersAppliedCount++;
      }
      filter.subfilters.forEach(subfilter => {
        if (subfilter.completed()) {
          appliedFilters.push(subfilter.name);
        }
      });
    });

    return { appliedFilters, multiFiltersAppliedCount, singleFilterIndex };
  }

  shouldSetMultipleFiltersTitle(multiFiltersAppliedCount: number, singleFilterIndex: number) {
    return multiFiltersAppliedCount > 1 ||
      (multiFiltersAppliedCount === 1 && this.filters[singleFilterIndex].state().indeterminate);
  }

  setMultipleFiltersTitle(appliedFilters: string[]) {
    if (appliedFilters.length > 1) {
      this.filterTitle.set(this.getAppliedFiltersTitle(`${appliedFilters[0]} + ${appliedFilters.length - 1} ${this.locale().filters.more}`));
    } else {
      this.filterTitle.set(this.getAppliedFiltersTitle(appliedFilters[0]));
    }
  }

  setSingleFilterTitle(singleFilterIndex: number) {
    const title = this.getAppliedFiltersTitle(singleFilterIndex !== -1
      ? `${this.locale().all} ${this.filters[singleFilterIndex].name}`
      : this.locale().filters.none);
    this.filterTitle.set(title);
  }

  updateFilter(completed: boolean, index: number, subindex?: number) {
    const chosenFilter = this.filters[index];
    const updatedFilters: { [key: string]: boolean } = {};
    if (subindex !== undefined) {
      updatedFilters[chosenFilter.subfilters[subindex].type] = completed;
    } else {
      chosenFilter.subfilters.forEach(subFilter => {
        updatedFilters[subFilter.type] = completed;
      });
    }
    this.store.updateFilters(updatedFilters);
  }

}
