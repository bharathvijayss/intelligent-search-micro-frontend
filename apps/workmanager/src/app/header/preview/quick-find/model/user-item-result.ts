import { FilterType } from "../store/quick-find.constant";

export interface IUserItemResult {
  userGuid: string;
  type: FilterType;
  fullName: string | null;
  emailAddress: string | null;
  confidence: number;
}
