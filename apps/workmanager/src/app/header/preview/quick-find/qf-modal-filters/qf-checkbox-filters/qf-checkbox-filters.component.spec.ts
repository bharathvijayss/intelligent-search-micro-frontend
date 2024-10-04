import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QfCheckboxFiltersComponent } from './qf-checkbox-filters.component';
import { QuickFindStore } from '../../store/quick-find.store';
import { TranslateService } from '@ngx-translate/core';
import { provideAutoSpy, Spy } from 'jest-auto-spies';
import { FilterType } from '../../store/quick-find.constant';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { IFilter } from '../../model/filter';
import { noop } from 'rxjs';
import { signal } from '@angular/core';
import { signalState } from '@ngrx/signals';

describe('QfCheckboxFiltersComponent', () => {

  async function setup() {

    const locale = {
      all: "All",
      filters: {
        "all": "All Filters Selected",
        "none": "No Filters Selected",
        "more": "more",
        "work_items": {
          "all": "Work Items",
          "case": "Cases",
          "ticket": "Tickets",
          "action": "Actions"
        },
        "comms": {
          "all": "Comms",
          "received": "Emails Received",
          "sent": "Emails Sent",
          "self_service": "Self Service Comments",
          "notes": "Notes"
        },
        "users": {
          "all": "Users",
          "internal": "Agents",
          "external": "Contacts"
        },
        "files": {
          "all": "Files",
          "work_item": "Work Item Attachments",
          "communication": "Email Attachments"
        },
      }
    }

    const MockQuickFindStore = {
      allWorkItems: signal(true),
      allComms: signal(true),
      allUsers: signal(true),
      allFiles: signal(true),
      updateFilters: jest.fn(),
      filters: signalState({
        [FilterType.case]: true,
        [FilterType.ticket]: true,
        [FilterType.action]: true,
        [FilterType.contact]: true,
        [FilterType.serviceAgent]: true,
        [FilterType.inboundEmail]: true,
        [FilterType.outboundEmail]: true,
        [FilterType.selfServiceComments]: true,
        [FilterType.notes]: true,
        [FilterType.fileAttachmentToPacket]: true,
        [FilterType.fileAttachmentToEmail]: true,
      }),
    }

    TestBed.configureTestingModule({
      imports: [QfCheckboxFiltersComponent],
      providers: [
        provideAutoSpy(TranslateService),
        provideNoopAnimations(),
        {
          provide: QuickFindStore,
          useValue: MockQuickFindStore
        },
      ]
    }).compileComponents();

    const fixture: ComponentFixture<QfCheckboxFiltersComponent> = TestBed.createComponent(QfCheckboxFiltersComponent);
    const component: QfCheckboxFiltersComponent = fixture.componentInstance;
    const mockStore = TestBed.inject(QuickFindStore);
    const translateServiceSpy: Spy<TranslateService> = TestBed.inject<unknown>(TranslateService) as Spy<TranslateService>;

    fixture.componentRef.setInput('locale', locale);

    return {
      fixture,
      component,
      mockStore,
      locale,
      translateServiceSpy
    }

  }

  describe('constructor()', () => {

    it('should create instance', async () => {
      const { component } = await setup();

      expect(component).toBeDefined();
    })

    it('locale should be defined', async () => {
      const { component } = await setup();

      expect(component.locale).toBeDefined();
    })

    it('store should be defined', async () => {
      const { component } = await setup();

      expect(component.store).toBeDefined();
    })

    it('filters should be empty array by default', async () => {
      const { component } = await setup();

      expect(component.filters().length).toBe(0);
    })

    it('filterTitle should be empty string by default', async () => {
      const { component } = await setup();

      expect(component.filterTitle()).toBe("");
    })

  })

  describe('ngOnInit()', () => {

    it('should call initFilterTypes() only once', async () => {
      const { component } = await setup();
      const initFilterTypesSpy = jest.spyOn(component, 'initFilterTypes');

      component.ngOnInit();

      expect(initFilterTypesSpy).toHaveBeenCalledTimes(1);
    })

  })

  describe('initFilterTitle()', () => {
    async function setupInitFilterTitle(
      allFiltersApplied = false,
      multiFilterTitle = false
    ) {
      const { component } = await setup();

      jest.spyOn(component, 'filters').mockReturnValue([
        {
          state: jest.fn().mockReturnValue({ completed: allFiltersApplied }),
        } as unknown as IFilter,
      ]);

      jest.spyOn(component, 'setAllFiltersAppliedTitle');

      const getAppliedFiltersInfoMockReturnVal = {
        appliedFilters: ['appliedFilters'],
        multiFiltersAppliedCount: 1,
        singleFilterIndex: 1,
      };

      jest.spyOn(component, 'getAppliedFiltersInfo').mockReturnValue(getAppliedFiltersInfoMockReturnVal);
      jest.spyOn(component, 'shouldSetMultipleFiltersTitle').mockReturnValue(multiFilterTitle);
      jest.spyOn(component, 'setMultipleFiltersTitle');
      jest.spyOn(component, 'setSingleFilterTitle').mockImplementation(noop);

      return { component, getAppliedFiltersInfoMockReturnVal };
    }

    it('should call setAllFiltersAppliedTitle() if all filters are selected', async () => {
      const { component } = await setupInitFilterTitle(true);

      component.initFilterTitle();

      expect(component.setAllFiltersAppliedTitle).toHaveBeenCalledTimes(1);
      expect(component.getAppliedFiltersInfo).not.toHaveBeenCalled();
      expect(component.shouldSetMultipleFiltersTitle).not.toHaveBeenCalled();
      expect(component.setMultipleFiltersTitle).not.toHaveBeenCalled();
      expect(component.setSingleFilterTitle).not.toHaveBeenCalled();
    });

    it('should call setSingleFilterTitle() if a single filter is selected', async () => {
      const { component, getAppliedFiltersInfoMockReturnVal } = await setupInitFilterTitle(false, false);

      component.initFilterTitle();

      expect(component.setAllFiltersAppliedTitle).not.toHaveBeenCalled();
      expect(component.getAppliedFiltersInfo).toHaveBeenCalledTimes(1);
      expect(component.shouldSetMultipleFiltersTitle).toHaveBeenCalledWith(
        getAppliedFiltersInfoMockReturnVal.multiFiltersAppliedCount,
        getAppliedFiltersInfoMockReturnVal.singleFilterIndex
      );
      expect(component.setMultipleFiltersTitle).not.toHaveBeenCalled();
      expect(component.setSingleFilterTitle).toHaveBeenCalledWith(getAppliedFiltersInfoMockReturnVal.singleFilterIndex);
    });

    it('should call setMultipleFiltersTitle() if multiple filters are selected', async () => {
      const { component, getAppliedFiltersInfoMockReturnVal } = await setupInitFilterTitle(false, true);

      component.initFilterTitle();

      expect(component.setAllFiltersAppliedTitle).not.toHaveBeenCalled();
      expect(component.getAppliedFiltersInfo).toHaveBeenCalledTimes(1);
      expect(component.shouldSetMultipleFiltersTitle).toHaveBeenCalledWith(
        getAppliedFiltersInfoMockReturnVal.multiFiltersAppliedCount,
        getAppliedFiltersInfoMockReturnVal.singleFilterIndex
      );
      expect(component.setMultipleFiltersTitle).toHaveBeenCalledWith(getAppliedFiltersInfoMockReturnVal.appliedFilters);
      expect(component.setSingleFilterTitle).not.toHaveBeenCalled();
    });
  });

  describe('setAllFiltersAppliedTitle()', () => {
    it('should call filterTitle.set() with the appropriate locale value', async () => {
      const { component, locale } = await setup();
      jest.spyOn(component.filterTitle, 'set');

      component.setAllFiltersAppliedTitle();

      expect(component.filterTitle.set).toHaveBeenCalledWith(locale.filters.all);
      expect(component.filterTitle.set).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAppliedFiltersInfo()', () => {
    async function setupGetAppliedFiltersInfo(
      completed = false,
      indeterminate = false,
      subfilter_completed = false
    ) {
      const { component } = await setup();

      const subfilter = 'subfilter';

      jest.spyOn(component, 'filters').mockReturnValue([
        {
          state: jest.fn().mockReturnValue({ completed, indeterminate }),
          subfilters: [
            {
              name: subfilter,
              completed: jest.fn().mockReturnValue(subfilter_completed),
            },
          ],
        } as unknown as IFilter,
      ]);

      return { component, subfilter };
    }

    it('should return default values for no selected filters', async () => {
      const { component } = await setupGetAppliedFiltersInfo();

      const result = component.getAppliedFiltersInfo();

      expect(result).toStrictEqual({
        appliedFilters: [],
        multiFiltersAppliedCount: 0,
        singleFilterIndex: -1,
      });
    });

    it('should return index 0 and count 1 for a single completed filter', async () => {
      const { component } = await setupGetAppliedFiltersInfo(true);

      const result = component.getAppliedFiltersInfo();

      expect(result).toStrictEqual({
        appliedFilters: [],
        multiFiltersAppliedCount: 1,
        singleFilterIndex: 0,
      });
    });

    it('should return index 0 and count 1 for a single indeterminate filter', async () => {
      const { component } = await setupGetAppliedFiltersInfo(false, true);

      const result = component.getAppliedFiltersInfo();

      expect(result).toStrictEqual({
        appliedFilters: [],
        multiFiltersAppliedCount: 1,
        singleFilterIndex: 0,
      });
    });

    it('should return names of applied subfilters when selected', async () => {
      const { component, subfilter } = await setupGetAppliedFiltersInfo(false, true, true);

      const result = component.getAppliedFiltersInfo();

      expect(result).toStrictEqual({
        appliedFilters: [subfilter],
        multiFiltersAppliedCount: 1,
        singleFilterIndex: 0,
      });
    });
  });

  describe('shouldSetMultipleFiltersTitle()', () => {
    async function setupShouldSetMultipleFiltersTitle(indeterminate = false) {
      const { component } = await setup();

      jest.spyOn(component, 'filters').mockReturnValue([
        {
          state: jest.fn().mockReturnValue({ indeterminate }),
        } as unknown as IFilter,
      ]);

      return component;
    }

    it('should return true when multiple filters are applied', async () => {
      const component = await setupShouldSetMultipleFiltersTitle();

      const result = component.shouldSetMultipleFiltersTitle(2, 0);

      expect(result).toBeTruthy();
    });

    it('should return true when one filter is applied and it is indeterminate', async () => {
      const component = await setupShouldSetMultipleFiltersTitle(true);

      const result = component.shouldSetMultipleFiltersTitle(1, 0);

      expect(result).toBeTruthy();
    });

    it('should return false when one filter is applied and it is not indeterminate', async () => {
      const component = await setupShouldSetMultipleFiltersTitle();

      const result = component.shouldSetMultipleFiltersTitle(1, 0);

      expect(result).toBeFalsy();
    });

    it('should return false when no filters are applied', async () => {
      const component = await setupShouldSetMultipleFiltersTitle();

      const result = component.shouldSetMultipleFiltersTitle(0, 0);

      expect(result).toBeFalsy();
    });
  });

  describe('setMultipleFiltersTitle()', () => {
    async function setupSetMultipleFiltersTitle() {
      const { component } = await setup();

      const filterTitleSetSpy = jest.spyOn(component.filterTitle, 'set');

      const getAppliedFiltersTitleSpy = jest.spyOn(component, 'getAppliedFiltersTitle')
        .mockImplementation((title) => title);

      return {
        component,
        filterTitleSetSpy,
        getAppliedFiltersTitleSpy,
      };
    }

    it('should call set with correct title for multiple applied filters', async () => {
      const { component, filterTitleSetSpy, getAppliedFiltersTitleSpy } = await setupSetMultipleFiltersTitle();
      const appliedFilters = ['Filter1', 'Filter2', 'Filter3'];
      const expectedTitle = `${appliedFilters[0]} + ${appliedFilters.length - 1} more`;

      component.setMultipleFiltersTitle(appliedFilters);

      expect(getAppliedFiltersTitleSpy).toHaveBeenCalledWith(expectedTitle);
      expect(filterTitleSetSpy).toHaveBeenCalledWith(expectedTitle);
    });

    it('should call set with correct title for a single applied filter', async () => {
      const { component, filterTitleSetSpy, getAppliedFiltersTitleSpy } = await setupSetMultipleFiltersTitle();
      const appliedFilters = ['Filter1'];
      const expectedTitle = appliedFilters[0];

      component.setMultipleFiltersTitle(appliedFilters);

      expect(getAppliedFiltersTitleSpy).toHaveBeenCalledWith(expectedTitle);
      expect(filterTitleSetSpy).toHaveBeenCalledWith(expectedTitle);
    });
  });

  describe('setSingleFilterTitle()', () => {
    async function setupSetSingleFilterTitle() {
      const { component, locale } = await setup();

      const filterName = 'Filter1';

      jest.spyOn(component.filterTitle, 'set');

      jest.spyOn(component, 'getAppliedFiltersTitle').mockImplementation((title) => title);

      jest.spyOn(component, 'filters').mockReturnValue([
        {
          name: filterName,
        } as unknown as IFilter
      ]);

      return {
        component,
        locale,
        filterName
      };
    }

    it('should set the title for a valid single filter index', async () => {
      const { component, filterName, locale } = await setupSetSingleFilterTitle();
      const singleFilterIndex = 0;
      const expectedTitle = `${locale.all} ${filterName}`;

      component.setSingleFilterTitle(singleFilterIndex);

      expect(component.getAppliedFiltersTitle).toHaveBeenCalledWith(expectedTitle);
      expect(component.getAppliedFiltersTitle).toHaveBeenCalledTimes(1);
      expect(component.filterTitle.set).toHaveBeenCalledWith(expectedTitle);
      expect(component.filterTitle.set).toHaveBeenCalledTimes(1);
    });

    it('should set the title to none for an invalid single filter index', async () => {
      const { component, locale } = await setupSetSingleFilterTitle();
      const singleFilterIndex = -1;

      component.setSingleFilterTitle(singleFilterIndex);

      expect(component.getAppliedFiltersTitle).not.toHaveBeenCalled();
      expect(component.filterTitle.set).toHaveBeenCalledWith(locale.filters.none);
      expect(component.filterTitle.set).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAppliedFiltersTitle()', () => {
    async function setupGetAppliedFiltersTitle() {
      const { component, translateServiceSpy } = await setup();

      const mockedReturnVal = 'mocked_val';

      translateServiceSpy.instant.mockReturnValue(mockedReturnVal)

      return { component, translateServiceSpy, mockedReturnVal };
    }

    it('should return the translated title with the provided placeholder', async () => {
      const { component, translateServiceSpy, mockedReturnVal } = await setupGetAppliedFiltersTitle();
      const placeholder = 'Filter1';

      const result = component.getAppliedFiltersTitle(placeholder);

      expect(translateServiceSpy.instant).toHaveBeenCalledTimes(1);
      expect(translateServiceSpy.instant).toHaveBeenCalledWith("header.intelligent_search.filters.applied_filters_title", {
        'f': placeholder
      });
      expect(result).toBe(mockedReturnVal);
    });
  });

  describe('updateFilter()', () => {
    async function setupUpdateFilter() {
      const { component, mockStore } = await setup();

      const filtersMock = [
        {
          subfilters: [
            { type: 'subfilter1' },
            { type: 'subfilter2' },
          ],
        },
      ] as unknown as IFilter[];

      jest.spyOn(component, 'filters').mockReturnValue(filtersMock);

      return { component, mockStore };
    }

    it('should update the chosen filter and its subfilters when subindex is undefined', async () => {
      const { component, mockStore } = await setupUpdateFilter();
      const completed = true;
      const index = 0;

      component.updateFilter(completed, index);

      expect(mockStore.updateFilters).toHaveBeenCalledTimes(1);
      expect(mockStore.updateFilters).toHaveBeenCalledWith({
        subfilter1: completed,
        subfilter2: completed,
      });
    });

    it('should update only the specified subfilter when subindex is provided', async () => {
      const { component, mockStore } = await setupUpdateFilter();
      const completed = false;
      const index = 0;
      const subindex = 1; // Updating the second subfilter

      component.updateFilter(completed, index, subindex);

      expect(mockStore.updateFilters).toHaveBeenCalledTimes(1);
      expect(mockStore.updateFilters).toHaveBeenCalledWith({
        subfilter2: completed, // Only the specified subfilter is updated
      });
    });
  });

  describe('initFilterTypes()', () => {

    it('should initialize filter types and call initFilterTitle()', async () => {
      const { component, mockStore, locale, fixture } = await setup();
      jest.spyOn(component, 'initFilterTitle');
      jest.spyOn(component.filters, 'set');

      fixture.detectChanges();

      expect(component.filters.set).toHaveBeenCalledTimes(1);
      expect(component.filters.set).toHaveBeenCalledWith([
        expect.objectContaining({
          name: locale.filters.work_items.all,
          state: mockStore.allWorkItems,
          subfilters: expect.arrayContaining([
            expect.objectContaining({
              name: locale.filters.work_items.case,
              completed: mockStore.filters[FilterType.case],
              type: FilterType.case
            }),
            expect.objectContaining({
              name: locale.filters.work_items.ticket,
              completed: mockStore.filters[FilterType.ticket],
              type: FilterType.ticket
            }),
            expect.objectContaining({
              name: locale.filters.work_items.action,
              completed: mockStore.filters[FilterType.action],
              type: FilterType.action
            }),
          ])
        }),
        expect.objectContaining({
          name: locale.filters.comms.all,
          state: mockStore.allComms,
          subfilters: expect.arrayContaining([
            expect.objectContaining({
              name: locale.filters.comms.received,
              completed: mockStore.filters[FilterType.inboundEmail],
              type: FilterType.inboundEmail
            }),
            expect.objectContaining({
              name: locale.filters.comms.sent,
              completed: mockStore.filters[FilterType.outboundEmail],
              type: FilterType.outboundEmail
            }),
            expect.objectContaining({
              name: locale.filters.comms.notes,
              completed: mockStore.filters[FilterType.notes],
              type: FilterType.notes
            }),
            expect.objectContaining({
              name: locale.filters.comms.self_service,
              completed: mockStore.filters[FilterType.selfServiceComments],
              type: FilterType.selfServiceComments
            }),
          ])
        }),
        expect.objectContaining({
          name: locale.filters.users.all,
          state: mockStore.allUsers,
          subfilters: expect.arrayContaining([
            expect.objectContaining({
              name: locale.filters.users.external,
              completed: mockStore.filters[FilterType.contact],
              type: FilterType.contact
            }),
            expect.objectContaining({
              name: locale.filters.users.internal,
              completed: mockStore.filters[FilterType.serviceAgent],
              type: FilterType.serviceAgent
            }),
          ])
        }),
        expect.objectContaining({
          name: locale.filters.files.all,
          state: mockStore.allFiles,
          subfilters: expect.arrayContaining([
            expect.objectContaining({
              name: locale.filters.files.work_item,
              completed: mockStore.filters[FilterType.fileAttachmentToPacket],
              type: FilterType.fileAttachmentToPacket
            }),
            expect.objectContaining({
              name: locale.filters.files.communication,
              completed: mockStore.filters[FilterType.fileAttachmentToEmail],
              type: FilterType.fileAttachmentToEmail
            }),
          ])
        })
      ]);

      TestBed.flushEffects();

      expect(component.initFilterTitle).toHaveBeenCalledTimes(1);
    });
  });

});
