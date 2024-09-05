import { PacketCommunicationType, PacketFileSource } from "./../../../../shared/dto";
import { FilterType } from "../store/quick-find.constant";

export interface IAttachmentItemResult {
  type: FilterType;
  source: PacketFileSource;
  fileName: string;
  packetGUID: string;
  packetReference: string;
  packetTitle: string;
  guid: string;
  packetCommunicationType: PacketCommunicationType | null;
  confidence: number;
}
