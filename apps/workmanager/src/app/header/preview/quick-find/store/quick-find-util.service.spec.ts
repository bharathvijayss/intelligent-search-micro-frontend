import { TestBed } from '@angular/core/testing';
import { QuickFindUtilService } from './quick-find-util.service';
import { DateAdapter } from '@angular/material/core';
import { DateFilters, FilterType } from './quick-find.constant';
import { DateFilterState, QuickFindState } from './quick-find.store';
import { ISearchParam } from '../model/search-param';

describe('Service: QuickFindUtil', () => {

  function setup() {

    const dateAdaptorMock = {
      today: jest.fn(),
      addCalendarDays: jest.fn(),
      addCalendarMonths: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        QuickFindUtilService,
        {
          provide: DateAdapter,
          useValue: dateAdaptorMock
        }
      ]
    });

    const serviceUnderTest = TestBed.inject(QuickFindUtilService);
    const mockDateAdapter: DateAdapter<Date> = TestBed.inject(DateAdapter);

    return {
      serviceUnderTest,
      mockDateAdapter
    }
  }

  describe('constructor()', () => {

    it('should create instance', () => {
      const { serviceUnderTest } = setup();

      expect(serviceUnderTest).toBeDefined();
    })

  })

  describe('getCalculatedDateRange()', () => {
    it('should return today\'s date for DateFilters.today', () => {
      const { serviceUnderTest, mockDateAdapter } = setup();
      const today = new Date('2024-10-07');
      jest.spyOn(mockDateAdapter, 'today').mockReturnValue(today);

      const result: DateFilterState = serviceUnderTest.getCalculatedDateRange(DateFilters.today);

      expect(mockDateAdapter.today).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        fromDate: today,
        toDate: today,
        type: DateFilters.today
      });
    });

    it('should return the date range for the last week', () => {
      const { serviceUnderTest, mockDateAdapter } = setup();
      const today = new Date('2024-10-07');
      const lastWeek = new Date('2024-10-01');
      jest.spyOn(mockDateAdapter, 'today').mockReturnValue(today);
      jest.spyOn(mockDateAdapter, 'addCalendarDays').mockReturnValue(lastWeek);

      const result: DateFilterState = serviceUnderTest.getCalculatedDateRange(DateFilters.lastWeek);

      expect(mockDateAdapter.today).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        fromDate: lastWeek,
        toDate: today,
        type: DateFilters.lastWeek
      });
      expect(mockDateAdapter.addCalendarDays).toHaveBeenCalledWith(today, -6);
    });

    it('should return the date range for the last month', () => {
      const { serviceUnderTest, mockDateAdapter } = setup();
      const today = new Date('2024-10-07');
      const lastMonth = new Date('2024-09-07');
      jest.spyOn(mockDateAdapter, 'today').mockReturnValue(today);
      jest.spyOn(mockDateAdapter, 'addCalendarMonths').mockReturnValue(lastMonth);

      const result: DateFilterState = serviceUnderTest.getCalculatedDateRange(DateFilters.lastMonth);

      expect(mockDateAdapter.today).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        fromDate: lastMonth,
        toDate: today,
        type: DateFilters.lastMonth
      });
      expect(mockDateAdapter.addCalendarMonths).toHaveBeenCalledWith(today, -1);
    });

    it('should return null dates for DateFilters.allTime', () => {
      const { serviceUnderTest, mockDateAdapter } = setup();
      const today = new Date('2024-10-07');
      jest.spyOn(mockDateAdapter, 'today').mockReturnValue(today);

      const result: DateFilterState = serviceUnderTest.getCalculatedDateRange(DateFilters.allTime);

      expect(mockDateAdapter.today).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        fromDate: null,
        toDate: null,
        type: DateFilters.allTime
      });
    });
  });

  describe('getSearchRequestParam()', () => {
    it('should return the correct ISearchParam object from QuickFindState', () => {
      const mockState: QuickFindState = {
        searchQuery: 'test',
        filters: {
          [FilterType.action]: true,
          [FilterType.case]: false,
          [FilterType.ticket]: false,
          [FilterType.contact]: false,
          [FilterType.serviceAgent]: false,
          [FilterType.inboundEmail]: false,
          [FilterType.outboundEmail]: false,
          [FilterType.selfServiceComments]: false,
          [FilterType.notes]: false,
          [FilterType.fileAttachmentToPacket]: false,
          [FilterType.fileAttachmentToEmail]: false
        },
        dateFilter: {
          fromDate: new Date('2024-01-01'),
          toDate: new Date('2024-01-31'),
          type: DateFilters.lastMonth
        },
        items: [],
        isLoading: false,
        isError: false
      };
      const expectedParam: ISearchParam = {
        QueryData: mockState.searchQuery,
        Filters: mockState.filters,
        DateFilters: {
          fromDate: mockState.dateFilter.fromDate,
          toDate: mockState.dateFilter.toDate
        },
        Confidence: 0.5
      };
      const { serviceUnderTest } = setup();

      const result = serviceUnderTest.getSearchRequestParam(mockState);

      expect(result).toEqual(expectedParam);
    });
  });
});
