import { IAttachmentItemResult } from "../model/attachment-item-result";
import { ICommunicationItemResult } from "../model/communication-item-result";
import { IUserItemResult } from "../model/user-item-result";
import { IWorkItemResult } from "../model/work-item-result";

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

export type IQuickFindResult = IWorkItemResult | ICommunicationItemResult | IAttachmentItemResult | IUserItemResult
