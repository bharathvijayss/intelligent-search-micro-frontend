import { FilterState } from "../store/quick-find.store"

export interface ISearchParam {
  QueryData: string,
  Confidence: number,
  DateFilters: {
    fromDate: Date | null,
    toDate: Date | null
  },
  Filters: FilterState
}
