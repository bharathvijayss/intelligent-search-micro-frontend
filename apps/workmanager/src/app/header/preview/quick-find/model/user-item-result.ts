import { FilterType } from "../store/quick-find.constant";

export interface IUserItemResult {
  userGuid: string;
  type: FilterType;
  fullName: string;
  emailAddress: string | null;
  confidence: number;
}
