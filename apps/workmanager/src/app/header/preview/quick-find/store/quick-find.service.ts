import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dummy_data, ISearchResult } from './dummy-data.constant';
import { delay, Observable, of } from 'rxjs';
import { ISearchParam } from '../model/search-param';

export enum FilterType {
  case = 'case',
  ticket = 'ticket',
  action = 'action',
  contact = 'contact',
  serviceAgent = 'serviceAgent',
  inboundEmail = 'inboundEmail',
  outboundEmail = 'outboundEmail',
  selfServiceComments = 'selfServiceComments',
  notes = 'notes',
  fileAttachmentToPacket = 'fileAttachmentToPacket',
  fileAttachmentToEmail = 'fileAttachmentToEmail',
  // customData = 'customData'
}

export enum DateFilters {
  allTime = 'all_time',
  today = 'today',
  lastWeek = 'last_week',
  lastMonth = 'last_month'
}

@Injectable({
  providedIn: 'root'
})
export class QuickFindService {

  constructor(private _http: HttpClient) { }

  getSearchResultForQuery(searchParam: ISearchParam): Observable<ISearchResult> {
    console.log(searchParam);
    return of({ ...dummy_data }).pipe(delay(2000));
  }

}
