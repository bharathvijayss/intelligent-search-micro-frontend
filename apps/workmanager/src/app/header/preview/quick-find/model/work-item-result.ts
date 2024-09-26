import { ActionSubType, PacketStatus, RAGStatus } from '../../../../shared/dto';
import { FilterType } from "../store/quick-find.constant";

export interface IWorkItemResult {
  guid: string;
  packetType: number;
  type: FilterType;
  reference: string;
  title: string | null;
  dueDate: string | null;
  status: PacketStatus;
  endDate: string | null;
  ragStatus: RAGStatus | null;
  newInformationReceived: boolean;
  timeRemainingWhenPaused: string | number | null;
  problem: boolean;
  canBeDoneByRobot: boolean | null;
  willBeDoneByRobot: boolean | null;
  actionSubType: ActionSubType | null;
  inPeerReview: boolean | null;
  confidence: number;
}
