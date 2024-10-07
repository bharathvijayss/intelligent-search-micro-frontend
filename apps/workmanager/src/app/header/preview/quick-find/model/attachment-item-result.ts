import { PacketCommunicationType, PacketFileSource } from "./../../../../shared/dto";
import { FilterType } from "../store/quick-find.constant";

export interface IAttachmentItemResult {
  type: FilterType;
  source: PacketFileSource;
  fileName: string | null;
  packetGUID: string;
  packetReference: string;
  packetTitle: string | null;
  guid: string;
  packetCommunicationType: PacketCommunicationType | null;
  confidence: number;
}
