import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateFilters } from './quick-find.service';
import { ISearchParam } from '../model/search-param';
import { QuickFindState } from './quick-find.store';

@Injectable({
  providedIn: 'root'
})
export class QuickFindUtilService {

  constructor(private _dateAdapter: DateAdapter<Date>) { }

  getCalculatedDateRange(value: DateFilters) {
    const currentDate = this._dateAdapter.today();
    switch (value) {
      case DateFilters.allTime: {
        return {
          fromDate: null,
          toDate: null,
          type: DateFilters.allTime
        }
      }
      case DateFilters.today: {
        return {
          fromDate: currentDate,
          toDate: currentDate,
          type: DateFilters.today
        };
      }
      case DateFilters.lastWeek: {
        return {
          fromDate: this._dateAdapter.addCalendarDays(currentDate, -6),
          toDate: currentDate,
          type: DateFilters.lastWeek
        };
      }
      case DateFilters.lastMonth: {
        return {
          fromDate: this._dateAdapter.addCalendarMonths(currentDate, -1),
          toDate: currentDate,
          type: DateFilters.lastMonth
        };
      }
    }
  }

  getSearchRequestParam(qfState: QuickFindState): ISearchParam {
    return {
      QueryData: qfState.searchQuery,
      Filters: qfState.filters,
      DateFilters: {
        fromDate: qfState.dateFilter?.fromDate,
        toDate: qfState.dateFilter?.toDate
      },
      Confidence: 0.5
    }
  }

}
