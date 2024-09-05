import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dummy_data } from './dummy-data.constant';
import { delay, map, Observable, of } from 'rxjs';
import { ISearchParam } from '../model/search-param';
import { IPacketEntities, ISearchResult, IUserEntities } from '../model/search-result';
import { FilterType, IQuickFindResult } from './quick-find.constant';
import { DataFieldType, PacketFileSource, ProcessType, UserTypeFilter } from '../../../../shared/dto';
import { IWorkItemResult } from '../model/work-item-result';
import { ICommunicationItemResult } from '../model/communication-item-result';
import { IAttachmentItemResult } from '../model/attachment-item-result';
import { IUserItemResult } from '../model/user-item-result';

@Injectable({
  providedIn: 'root'
})
export class QuickFindService {

  constructor(private _http: HttpClient) { }

  getSearchResultForQuery(searchParam: ISearchParam): Observable<IQuickFindResult[]> {
    console.log(searchParam);
    return of<ISearchResult>({ ...dummy_data })
      .pipe(
        map((result: ISearchResult) => {

          const convertedResponse: IQuickFindResult[] = [];

          for (const packetRes of result.packetResult.packetEntities) {
            if (packetRes.dataFieldType === DataFieldType.Packet) {
              convertedResponse.push(this.processWorkItemData(packetRes));
            } else if (
              [
                DataFieldType.EmailIncomingPacketCommunication,
                DataFieldType.EmailOutgoingPacketCommunication,
                DataFieldType.ESSCommentPacketCommunication,
                DataFieldType.AuditNotePacketCommunication
              ].includes(packetRes.dataFieldType)) {
              convertedResponse.push(this.processCommItemData(packetRes));
            } else if (
              [
                DataFieldType.PacketFile,
                DataFieldType.PacketCommunicationAttachment
              ].includes(packetRes.dataFieldType)) {
              convertedResponse.push(this.processAttachmentItemData(packetRes));
            }
          }

          for (const userRes of result.userEntities) {
            convertedResponse.push(this.processUserItemData(userRes));
          }

          convertedResponse.sort((a, b) => {
            return a.confidence < b.confidence ? 1 : -1;
          });

          console.log(convertedResponse);

          return convertedResponse;
        }),
        delay(1500)
      );
  }

  processWorkItemData(data: IPacketEntities): IWorkItemResult {

    function getResultType(processType: ProcessType): FilterType {
      if (processType === ProcessType.Case) {
        return FilterType.case;
      } else if (processType === ProcessType.Ticket) {
        return FilterType.ticket;
      } else {
        return FilterType.action;
      }
    }

    return {
      guid: data.guid,
      packetType: data.processType,
      type: getResultType(data.processType),
      reference: data.reference,
      title: data.title,
      dueDate: data.dueDate,
      status: data.status,
      endDate: data.endDate,
      ragStatus: data.ragStatus,
      newInformationReceived: data.newInformationReceived,
      timeRemainingWhenPaused: data.timeRemainingWhenPaused,
      problem: data.problem,
      canBeDoneByRobot: data.canBeDoneByRobot,
      willBeDoneByRobot: data.willBeDoneByRobot,
      actionSubType: data.actionSubType,
      inPeerReview: data.inPeerReview,
      confidence: data.confidence
    }

  }

  processCommItemData(data: IPacketEntities): ICommunicationItemResult {

    function getResultType(dataFieldType: DataFieldType): FilterType {
      if (dataFieldType === DataFieldType.EmailIncomingPacketCommunication) {
        return FilterType.inboundEmail;
      } else if (dataFieldType === DataFieldType.EmailOutgoingPacketCommunication) {
        return FilterType.outboundEmail;
      } else if (dataFieldType === DataFieldType.ESSCommentPacketCommunication) {
        return FilterType.selfServiceComments;
      } else {
        return FilterType.notes;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processedRelatedDataFields: { [key: string]: any } = {};

    data.relatedDataFields.forEach((val) => {
      processedRelatedDataFields[val.fieldName] = val.data;
    })

    return {
      type: getResultType(data.dataFieldType),
      packetGuid: data.guid,
      processType: data.processType,
      guid: data.dataFieldId,
      reference: data.reference,
      title: data.title,
      confidence: data.confidence,
      body: processedRelatedDataFields?.['body'],
      emailAddress: processedRelatedDataFields?.['emailAddress'] ?? null,
      logged: processedRelatedDataFields?.['logged'] ?? null,
      subject: processedRelatedDataFields?.['subject'] ?? null,
      attachmentCount: processedRelatedDataFields?.['attachmentCount'] ?? null,
      importance: processedRelatedDataFields?.['importance'] ?? null,
      fullName: processedRelatedDataFields?.['fullName'] ?? null,
    };
  }

  processAttachmentItemData(data: IPacketEntities): IAttachmentItemResult {

    function getResultType(dataFieldType: DataFieldType): FilterType {
      if (dataFieldType === DataFieldType.PacketCommunicationAttachment) {
        return FilterType.fileAttachmentToEmail;
      } else {
        return FilterType.fileAttachmentToPacket;
      }
    }

    function getSource(dataFieldType: DataFieldType): PacketFileSource {
      if (dataFieldType === DataFieldType.PacketCommunicationAttachment) {
        return PacketFileSource.EmailAttachment;
      } else {
        return PacketFileSource.AttachedToPacket;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processedRelatedDataFields: { [key: string]: any } = {};

    data.relatedDataFields.forEach((val) => {
      processedRelatedDataFields[val.fieldName] = val.data;
    })

    return {
      type: getResultType(data.dataFieldType),
      source: getSource(data.dataFieldType),
      fileName: processedRelatedDataFields?.['fileName'],
      packetGUID: data.guid,
      packetReference: data.reference,
      packetTitle: data.title,
      guid: data.dataFieldId,
      packetCommunicationType: processedRelatedDataFields?.['packetCommunicationType'] ?? null,
      confidence: data.confidence
    };
  }

  processUserItemData(data: IUserEntities): IUserItemResult {

    function getResultType(userType: UserTypeFilter): FilterType {
      if (userType === UserTypeFilter.Contact) {
        return FilterType.contact;
      } else {
        return FilterType.serviceAgent;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processedRelatedDataFields: { [key: string]: any } = {};

    data.relatedDataFields.forEach((val) => {
      processedRelatedDataFields[val.fieldName] = val.data;
    })

    return {
      userGuid: data.guid,
      type: getResultType(data.userType),
      fullName: processedRelatedDataFields?.['fullName'],
      emailAddress: processedRelatedDataFields?.['emailAddress'] ?? null,
      confidence: data.confidence
    }
  }



}
