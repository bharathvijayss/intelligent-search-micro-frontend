import { FilterType } from "../store/quick-find.constant";

export interface ICommunicationItemResult {
  type: FilterType;
  packetGuid: string;
  processType: number;
  body: string | null;
  guid: string;
  emailAddress: string | null;
  reference: string;
  title: string | null;
  logged?: string | null;
  subject?: string | null;
  attachmentCount?: number | null;
  importance: boolean | null;
  fullName: string | null;
  confidence: number;
}
