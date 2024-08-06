import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dummy_data, ISearchResult } from './dummy-data.constant';
import { delay, Observable, of } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class QuickFindService {

  constructor(private _http: HttpClient) { }

  getSearchResultForQuery(searchQuery: string): Observable<ISearchResult> {
    return of({ ...dummy_data, searchQuery }).pipe(delay(2000));
  }

}
