import { fakeAsync, TestBed, tick } from "@angular/core/testing"
import { FilterState, QuickFindStore } from "./quick-find.store"
import { QuickFindService } from "./quick-find.service"
import { provideAutoSpy, Spy } from "jest-auto-spies"
import { QuickFindUtilService } from "./quick-find-util.service"
import { DateFilters, FilterType, IQuickFindResult } from "./quick-find.constant"
import { ISearchParam } from "../model/search-param"
import { defer, delay, Observable, of } from "rxjs"
import { getState } from "@ngrx/signals"


describe('Store: QuickFind', () => {

  function setup() {

    TestBed.configureTestingModule({
      providers: [
        provideAutoSpy(QuickFindService),
        provideAutoSpy(QuickFindUtilService),
      ]
    })

    const qfSrvMock: Spy<QuickFindService> = TestBed.inject<unknown>(QuickFindService) as Spy<QuickFindService>
    const qfUtilSrvMock: Spy<QuickFindUtilService> = TestBed.inject<unknown>(QuickFindUtilService) as Spy<QuickFindUtilService>

    const currentDate = new Date();
    const dateFilterObj = {
      fromDate: currentDate,
      toDate: currentDate,
      type: DateFilters.lastWeek
    };
    qfUtilSrvMock.getCalculatedDateRange.mockImplementation((val: DateFilters) => {
      dateFilterObj.type = val;
      return dateFilterObj;
    })

    const dummySearchResult = [{
      userGuid: 'user_guid',
      type: FilterType.serviceAgent,
      fullName: 'full_name',
      emailAddress: 'email_address',
      confidence: 0.5
    }];

    const dummySearchParam: ISearchParam = {
      QueryData: 'query',
      Confidence: 0.5,
      DateFilters: {
        fromDate: null,
        toDate: null
      },
      Filters: {
        action: false,
        case: false,
        contact: false,
        fileAttachmentToEmail: false,
        fileAttachmentToPacket: false,
        inboundEmail: false,
        notes: false,
        outboundEmail: false,
        selfServiceComments: false,
        serviceAgent: false,
        ticket: false
      }
    }

    const qfStore = TestBed.inject(QuickFindStore);

    return {
      qfStore,
      qfSrvMock,
      qfUtilSrvMock,
      dateFilterObj,
      dummySearchResult,
      dummySearchParam
    }
  }

  describe('OnInit()', () => {

    it('dateFilterObj by default should be last week', () => {
      const { qfStore, dateFilterObj } = setup();

      expect(qfStore.dateFilter()).toStrictEqual(dateFilterObj)
    })

    it('all filters should be false by default', () => {
      const { qfStore } = setup();

      const noFiltersAppliedCheck = Object.values(qfStore.filters()).every(val => !val);

      expect(noFiltersAppliedCheck).toBeTruthy();
    })

    it('isError by default should be false', () => {
      const { qfStore } = setup();

      expect(qfStore.isError()).toBeFalsy();
    })

    it('isLoading by default should be false', () => {
      const { qfStore } = setup();

      expect(qfStore.isLoading()).toBeFalsy();
    })

    it('items by default should be empty', () => {
      const { qfStore } = setup();

      expect(qfStore.items().length).toBe(0);
    })

    it('searchQuery by default should be empty string', () => {
      const { qfStore } = setup();

      expect(qfStore.searchQuery()).toBe("");
    })

  })

  describe('allWorkItems()', () => {

    it('should return { completed: true, indeterminate: false } when all the work item filters are true', () => {
      const { qfStore } = setup();

      qfStore.updateFilters({ case: true, ticket: true, action: true });

      expect(qfStore.allWorkItems()).toStrictEqual({ completed: true, indeterminate: false })
    })

    it('should return { completed: false, indeterminate: true } when some of the work item filters are true', () => {
      const { qfStore } = setup();

      qfStore.updateFilters({ case: true, ticket: true, action: false });

      expect(qfStore.allWorkItems()).toStrictEqual({ completed: false, indeterminate: true })
    })

    it('should return { completed: false, indeterminate: false } when none of the work item filters are true', () => {
      const { qfStore } = setup();

      qfStore.updateFilters({ case: false, ticket: false, action: false });

      expect(qfStore.allWorkItems()).toStrictEqual({ completed: false, indeterminate: false })
    })

  })

  describe('allComms()', () => {

    it('should return { completed: true, indeterminate: false } when all the communication item filters are true', () => {
      const { qfStore } = setup();

      qfStore.updateFilters({ inboundEmail: true, outboundEmail: true, notes: true, selfServiceComments: true });

      expect(qfStore.allComms()).toStrictEqual({ completed: true, indeterminate: false })
    })

    it('should return { completed: false, indeterminate: true } when some of the communication item filters are true', () => {
      const { qfStore } = setup();

      qfStore.updateFilters({ inboundEmail: false, outboundEmail: true, notes: true, selfServiceComments: true });

      expect(qfStore.allComms()).toStrictEqual({ completed: false, indeterminate: true })
    })

    it('should return { completed: false, indeterminate: false } when none of the communication item filters are true', () => {
      const { qfStore } = setup();

      qfStore.updateFilters({ inboundEmail: false, outboundEmail: false, notes: false, selfServiceComments: false });

      expect(qfStore.allComms()).toStrictEqual({ completed: false, indeterminate: false })
    })

  })

  describe('allUsers()', () => {

    it('should return { completed: true, indeterminate: false } when all the user item filters are true', () => {
      const { qfStore } = setup();

      qfStore.updateFilters({ contact: true, serviceAgent: true, });

      expect(qfStore.allUsers()).toStrictEqual({ completed: true, indeterminate: false })
    })

    it('should return { completed: false, indeterminate: true } when some of the user item filters are true', () => {
      const { qfStore } = setup();

      qfStore.updateFilters({ contact: true, serviceAgent: false });

      expect(qfStore.allUsers()).toStrictEqual({ completed: false, indeterminate: true })
    })

    it('should return { completed: false, indeterminate: false } when none of the user item filters are true', () => {
      const { qfStore } = setup();

      qfStore.updateFilters({ contact: false, serviceAgent: false });

      expect(qfStore.allUsers()).toStrictEqual({ completed: false, indeterminate: false })
    })

  })

  describe('allFiles()', () => {

    it('should return { completed: true, indeterminate: false } when all the attachment item filters are true', () => {
      const { qfStore } = setup();

      qfStore.updateFilters({ fileAttachmentToPacket: true, fileAttachmentToEmail: true, });

      expect(qfStore.allFiles()).toStrictEqual({ completed: true, indeterminate: false })
    })

    it('should return { completed: false, indeterminate: true } when some of the attachment item filters are true', () => {
      const { qfStore } = setup();

      qfStore.updateFilters({ fileAttachmentToPacket: true, fileAttachmentToEmail: false });

      expect(qfStore.allFiles()).toStrictEqual({ completed: false, indeterminate: true })
    })

    it('should return { completed: false, indeterminate: false } when none of the attachment item filters are true', () => {
      const { qfStore } = setup();

      qfStore.updateFilters({ fileAttachmentToPacket: false, fileAttachmentToEmail: false });

      expect(qfStore.allFiles()).toStrictEqual({ completed: false, indeterminate: false })
    })

  })

  describe('setFromAndToDate()', () => {

    it('should set the date filters fromDate and toDate appropriately', () => {
      const { qfStore } = setup();

      qfStore.setFromAndToDate({ fromDate: null, toDate: null });

      expect(qfStore.dateFilter.fromDate()).toBeNull();
      expect(qfStore.dateFilter.toDate()).toBeNull();
    })

  })

  describe('updateFilters()', () => {

    it('should set the filters appropriately', () => {
      const { qfStore } = setup();

      qfStore.updateFilters({ case: true });

      expect(qfStore.filters.case()).toBeTruthy();

      qfStore.updateFilters({ case: false });

      expect(qfStore.filters.case()).toBeFalsy();
    })

  })

  describe('setSearchQuery()', () => {

    it('should set the search query appropriately', () => {
      const { qfStore } = setup();
      const searchQuery = 'query';

      qfStore.setSearchQuery(searchQuery);

      expect(qfStore.searchQuery()).toBe(searchQuery);
    })

  })

  describe('setDateFilter()', () => {

    it('should set the search query appropriately', () => {
      const { qfStore, dateFilterObj } = setup();

      qfStore.setDateFilter(DateFilters.allTime);

      expect(qfStore.dateFilter()).toStrictEqual(dateFilterObj);
    })

  })

  describe('resetSearchQueryAndResult()', () => {

    function resetSearchQueryAndResultSetup() {
      const { qfStore, qfUtilSrvMock, qfSrvMock, dummySearchParam, dummySearchResult } = setup();

      qfUtilSrvMock.getSearchRequestParam.mockReturnValue(dummySearchParam);

      qfSrvMock.getSearchResultForQuery.mockReturnValue(of(dummySearchResult));

      return {
        qfStore
      }
    }

    it('should reset the search query and items to initial state', () => {
      const { qfStore } = resetSearchQueryAndResultSetup();

      qfStore.setSearchQuery('query');
      qfStore.getResult();

      expect(qfStore.searchQuery()).not.toBe("");
      expect(qfStore.items().length).not.toBe(0);

      qfStore.resetSearchQueryAndResult();

      expect(qfStore.searchQuery()).toBe("");
      expect(qfStore.items().length).toBe(0);
    })

  })

  describe('getResult()', () => {

    it('should not process the request if the search query length is less than 2', () => {
      const { qfStore, qfSrvMock, qfUtilSrvMock } = setup();

      qfStore.setSearchQuery('qu');
      qfStore.getResult();

      expect(qfUtilSrvMock.getSearchRequestParam).not.toHaveBeenCalled();
      expect(qfSrvMock.getSearchResultForQuery).not.toHaveBeenCalled();
    })

    it("should update 'items' on success", fakeAsync(() => {
      const { qfStore, qfSrvMock, qfUtilSrvMock, dummySearchParam, dummySearchResult } = setup();
      qfStore.setSearchQuery('query');
      qfUtilSrvMock.getSearchRequestParam.mockReturnValue(dummySearchParam);
      qfSrvMock.getSearchResultForQuery.mockReturnValue(of(dummySearchResult).pipe(delay(500)));

      qfStore.getResult();

      expect(qfStore.isLoading()).toBeTruthy();
      expect(qfStore.isError()).toBeFalsy();
      expect(qfStore.items().length).toBe(0);
      expect(qfUtilSrvMock.getSearchRequestParam).toHaveBeenCalledTimes(1);
      expect(qfUtilSrvMock.getSearchRequestParam).toHaveBeenCalledWith(getState(qfStore));

      tick(500);

      expect(qfSrvMock.getSearchResultForQuery).toHaveBeenCalledTimes(1);
      expect(qfSrvMock.getSearchResultForQuery).toHaveBeenCalledWith(dummySearchParam);
      expect(qfStore.items()).toStrictEqual(dummySearchResult);
      expect(qfStore.isLoading()).toBeFalsy();
    }));

    it("should update 'isError' to true on failure", fakeAsync(() => {
      const { qfStore, qfSrvMock, qfUtilSrvMock, dummySearchParam } = setup();
      qfStore.setSearchQuery('query');
      qfUtilSrvMock.getSearchRequestParam.mockReturnValue(dummySearchParam);
      qfSrvMock.getSearchResultForQuery.mockReturnValue(
        defer(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject('API error');
            });
          });
        }) as Observable<IQuickFindResult[]>
      );

      qfStore.getResult();


      expect(qfStore.isLoading()).toBeTruthy();
      expect(qfStore.isError()).toBeFalsy();
      expect(qfStore.items().length).toBe(0);

      expect(qfUtilSrvMock.getSearchRequestParam).toHaveBeenCalledTimes(1);
      expect(qfUtilSrvMock.getSearchRequestParam).toHaveBeenCalledWith(getState(qfStore));
      expect(qfSrvMock.getSearchResultForQuery).toHaveBeenCalledTimes(1);
      expect(qfSrvMock.getSearchResultForQuery).toHaveBeenCalledWith(dummySearchParam);

      tick();

      expect(qfStore.items().length).toBe(0);
      expect(qfStore.isLoading()).toBeFalsy();
      expect(qfStore.isError()).toBeTruthy();
    }))

  })

  describe('allFiltersApplied()', () => {

    function allFiltersAppliedSetup(filterStatus = false) {

      const { qfStore } = setup();

      const state: FilterState = {
        action: filterStatus,
        case: filterStatus,
        contact: filterStatus,
        fileAttachmentToEmail: filterStatus,
        fileAttachmentToPacket: filterStatus,
        inboundEmail: filterStatus,
        notes: filterStatus,
        outboundEmail: filterStatus,
        selfServiceComments: filterStatus,
        serviceAgent: filterStatus,
        ticket: filterStatus
      };

      return {
        qfStore, state
      }
    }
    it('should return true when all the filters are true', () => {
      const filterStatus = true;
      const { qfStore, state } = allFiltersAppliedSetup(filterStatus);

      qfStore.updateFilters(state);

      expect(qfStore.allFiltersApplied()).toBeTruthy();
    })

    it('should return false when all the filters are false', () => {
      const filterStatus = false;
      const { qfStore, state } = allFiltersAppliedSetup(filterStatus);

      qfStore.updateFilters(state);

      expect(qfStore.allFiltersApplied()).toBeFalsy();
    })
  })

  describe('noFiltersApplied()', () => {

    function noFiltersAppliedSetup(filterStatus = false) {

      const { qfStore } = setup();

      const state: FilterState = {
        action: filterStatus,
        case: filterStatus,
        contact: filterStatus,
        fileAttachmentToEmail: filterStatus,
        fileAttachmentToPacket: filterStatus,
        inboundEmail: filterStatus,
        notes: filterStatus,
        outboundEmail: filterStatus,
        selfServiceComments: filterStatus,
        serviceAgent: filterStatus,
        ticket: filterStatus
      };

      return {
        qfStore, state
      }
    }
    it('should return true when all the filters are false', () => {
      const filterStatus = false;
      const { qfStore, state } = noFiltersAppliedSetup(filterStatus);

      qfStore.updateFilters(state);

      expect(qfStore.noFiltersApplied()).toBeTruthy();
    })

    it('should return false when all the filters are true', () => {
      const filterStatus = true;
      const { qfStore, state } = noFiltersAppliedSetup(filterStatus);

      qfStore.updateFilters(state);

      expect(qfStore.noFiltersApplied()).toBeFalsy();
    })
  })

})
