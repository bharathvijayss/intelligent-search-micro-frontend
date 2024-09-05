import { FilterType } from "../store/quick-find.constant";

export interface IWorkItemResult {
  guid: string;
  packetType: number;
  type: FilterType;
  reference: string;
  title: string | null;
  dueDate: string | null;
  status: number;
  endDate: string | null;
  ragStatus: number;
  newInformationReceived: boolean;
  timeRemainingWhenPaused: string | number | null;
  problem: boolean;
  canBeDoneByRobot: boolean | null;
  willBeDoneByRobot: boolean | null;
  actionSubType: number | null;
  inPeerReview: boolean | null;
  confidence: number;
}
