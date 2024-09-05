import { DataFieldType, UserTypeFilter } from "./../../../../shared/dto";

export interface IPacketResult {
  packetEntities: IPacketEntities[];
  customDatas: ICustomDatas[];
}

export interface IRelatedDataFields {
  fieldName: string;
  data: unknown;
}

export interface IPacket {
  guid: string;
  type: string;
  dueDate: string;
  processType: number;
  assignedToUserGuid: string;
  status: number;
  startDate: string;
  endDate: string | null;
  title: string;
  reference: string;
  ragStatus: number;
  actionSubType: number | null;
  inPeerReview: boolean | null;
  timeRemainingWhenPaused: string | number | null;
  problem: boolean;
  newInformationReceived: boolean;
  canBeDoneByRobot: boolean | null;
  willBeDoneByRobot: boolean | null;
}

export interface IPacketEntities extends IPacket {
  dataFieldId: string;
  dataFieldType: DataFieldType;
  dataFieldName: string;
  confidence: number;
  relatedDataFields: IRelatedDataFields[];
}

export interface ICustomDatas {
  guid: string;
  type: string;
  dataFieldType: string;
  dataFieldName: string;
  dataFieldValue: string;
  confidence: number;
}

export interface IUserEntities {
  guid: string;
  type: string;
  userType: UserTypeFilter;
  dataFieldType: string;
  dataFieldName: string;
  dataFieldValue: string;
  relatedDataFields: IRelatedDataFields[];
  confidence: number;
}

export interface IDataField {
  language: string;
  name: string;
  description: string;
}

export interface IObjectEntities {
  id: string;
  type: string;
  dataField: IDataField;
  nameConfidence: number;
  descriptionConfidence: number;
}

export interface IProcessResults {
  process: IObjectEntities;
  packet: IPacket;
}

export interface ISearchResult {
  packetResult: IPacketResult;
  userEntities: IUserEntities[];
  objectEntities: IObjectEntities[];
  processResults: IProcessResults[];
}
