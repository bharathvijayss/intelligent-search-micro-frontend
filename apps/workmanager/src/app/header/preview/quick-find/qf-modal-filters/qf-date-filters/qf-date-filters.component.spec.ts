import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { QfDateFiltersComponent } from './qf-date-filters.component';
import { DateFilterState, QuickFindStore } from '../../store/quick-find.store';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormGroup } from '@angular/forms';
import { DateFilters } from '../../store/quick-find.constant';
import { MatSelectChange } from '@angular/material/select';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { signalState } from '@ngrx/signals';
import { patchState } from '@ngrx/signals';

describe('QfDateFiltersComponent', () => {

  async function setup() {

    const locale = {
      filters: {
        date: {
          "all_time": "All Time",
          "today": "Today",
          "last_week": "Last Week",
          "last_month": "Last Month",
          "date_range_placeholder": {
            "from_date": "From Date",
            "to_date": "To Date"
          }
        }
      }
    }

    const dateFilterSignal = signalState<DateFilterState>({ fromDate: null, toDate: null, type: null });

    const MockQuickFindStore = {
      dateFilter: dateFilterSignal,
      getResult: jest.fn(),
      setFromAndToDate: jest.fn(),
      setDateFilter: jest.fn()
    }

    TestBed.configureTestingModule({
      imports: [
        QfDateFiltersComponent,
        TranslateTestingModule.withTranslations({
          global: {
            "cancel": "cancel",
            "apply": "apply"
          }
        })
      ],
      providers: [
        {
          provide: QuickFindStore,
          useValue: MockQuickFindStore
        },
        provideNativeDateAdapter(),
        provideNoopAnimations()
      ]
    }).compileComponents();
    const fixture: ComponentFixture<QfDateFiltersComponent> = TestBed.createComponent(QfDateFiltersComponent);
    const component: QfDateFiltersComponent = fixture.componentInstance;
    const mockStore = TestBed.inject(QuickFindStore);

    fixture.componentRef.setInput('locale', locale);

    return {
      fixture,
      component,
      mockStore,
      locale,
      dateFilterSignal
    }
  }

  describe('constructor()', () => {

    it('should create instance', async () => {
      const { component } = await setup();

      expect(component).toBeDefined();
    })

    it('dateFilters should be defined', async () => {
      const { component } = await setup();

      expect(component.dateFilters).toBeDefined();
    })

    it('locale should be defined', async () => {
      const { component } = await setup();

      expect(component.locale).toBeDefined();
    })

    it('dateRange should be defined', async () => {
      const { component } = await setup();

      expect(component.dateRange).toBeInstanceOf(FormGroup);
    })

    it('store should be defined', async () => {
      const { component } = await setup();

      expect(component.store).toBeDefined();
    })

  })

  describe('ngOnInit()', () => {
    it('should call initDateFilterTypes and initSearch only once', async () => {
      const { component } = await setup();
      jest.spyOn(component, 'initDateFilterTypes');
      jest.spyOn(component, 'initSearch');

      component.ngOnInit();

      expect(component.initDateFilterTypes).toHaveBeenCalledTimes(1);
      expect(component.initSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe('initDateFilterTypes()', () => {
    it('should set date filters with locale values', async () => {
      const { component, locale } = await setup();
      jest.spyOn(component.dateFilters, 'set');

      component.initDateFilterTypes();

      expect(component.dateFilters.set).toHaveBeenCalledTimes(1)
      expect(component.dateFilters.set).toHaveBeenCalledWith([
        { value: DateFilters.allTime, label: locale.filters.date.all_time },
        { value: DateFilters.today, label: locale.filters.date.today },
        { value: DateFilters.lastWeek, label: locale.filters.date.last_week },
        { value: DateFilters.lastMonth, label: locale.filters.date.last_month }
      ]);
    });
  });

  describe('applyCustomDateRange()', () => {
    it('should call setFromAndToDate from store with dateRange value', async () => {
      const { component, mockStore } = await setup();
      const dateRangeValue = { fromDate: new Date(), toDate: new Date() };
      component.dateRange.setValue(dateRangeValue);

      component.applyCustomDateRange();

      expect(mockStore.setFromAndToDate).toHaveBeenCalledTimes(1);
      expect(mockStore.setFromAndToDate).toHaveBeenCalledWith(dateRangeValue);
    });
  });

  describe('dateFilterChanged()', () => {
    it('should call setDateFilter from store with selected value', async () => {
      const { component, mockStore } = await setup();
      const changeValue = { value: 'today' } as MatSelectChange;

      component.dateFilterChanged(changeValue);

      expect(mockStore.setDateFilter).toHaveBeenCalledTimes(1);
      expect(mockStore.setDateFilter).toHaveBeenCalledWith(changeValue.value);
    });
  });

  describe('initSearch()', () => {
    it('should trigger store.getResult() after debouncing and distinct changes in dateRange', fakeAsync(async () => {
      const { component, mockStore } = await setup();
      component.initSearch();

      component.dateRange.setValue({ fromDate: new Date('2024-01-01'), toDate: new Date('2024-01-15') });
      tick(50);

      expect(mockStore.getResult).not.toHaveBeenCalled();

      component.dateRange.setValue({ fromDate: new Date('2024-01-02'), toDate: new Date('2024-01-16') });
      tick(50);

      expect(mockStore.getResult).toHaveBeenCalledTimes(1);

      component.dateRange.setValue({ fromDate: new Date('2024-01-02'), toDate: new Date('2024-01-16') })
      tick(50);

      expect(mockStore.getResult).toHaveBeenCalledTimes(1);
    }));
  });

  describe('dateRangeEffectRef', () => {

    async function dateRangeEffectRefSetup(filterType: DateFilters = DateFilters.allTime) {

      const { component, fixture, dateFilterSignal } = await setup();

      jest.spyOn(component.dateRange, 'enable');
      jest.spyOn(component.dateRange, 'disable');
      jest.spyOn(component.dateRange, 'setValue');

      patchState(dateFilterSignal, { fromDate: new Date(), toDate: new Date(), type: filterType });

      fixture.detectChanges();

      return { component, dateFilterSignal }
    }

    it('should enable date range if applied filter is "all_time"', async () => {
      const { component, dateFilterSignal } = await dateRangeEffectRefSetup(DateFilters.allTime);

      TestBed.flushEffects();

      expect(component.dateRange.setValue).toHaveBeenCalledTimes(1);
      expect(component.dateRange.setValue).toHaveBeenCalledWith({
        fromDate: dateFilterSignal.fromDate(),
        toDate: dateFilterSignal.toDate(),
      });
      expect(component.dateRange.enable).toHaveBeenCalledTimes(1);
      expect(component.dateRange.enable).toHaveBeenCalledWith({ emitEvent: false });
      expect(component.dateRange.disable).not.toHaveBeenCalled();
    });

    it('should disable date range if applied filter is not "all_time"', async () => {
      const { component, dateFilterSignal } = await dateRangeEffectRefSetup(DateFilters.lastMonth);

      TestBed.flushEffects();

      expect(component.dateRange.setValue).toHaveBeenCalledTimes(1);
      expect(component.dateRange.setValue).toHaveBeenCalledWith({
        fromDate: dateFilterSignal.fromDate(),
        toDate: dateFilterSignal.toDate(),
      });
      expect(component.dateRange.enable).not.toHaveBeenCalled();
      expect(component.dateRange.disable).toHaveBeenCalledTimes(1);
      expect(component.dateRange.disable).toHaveBeenCalledWith({ emitEvent: false });
    });
  });

});

