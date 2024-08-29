import { computed, inject } from "@angular/core";
import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { filter, pipe, switchMap, tap } from "rxjs";
import { DateFilters, FilterType, QuickFindService } from "./quick-find.service";
import { QuickFindResult } from "./dummy-data.constant";
import { QuickFindUtilService } from "./quick-find-util.service";

export type FilterState = {
  [FilterType.case]: boolean,
  [FilterType.ticket]: boolean,
  [FilterType.action]: boolean,
  [FilterType.contact]: boolean,
  [FilterType.serviceAgent]: boolean,
  [FilterType.inboundEmail]: boolean,
  [FilterType.outboundEmail]: boolean,
  [FilterType.selfServiceComments]: boolean,
  [FilterType.notes]: boolean,
  [FilterType.fileAttachmentToPacket]: boolean,
  [FilterType.fileAttachmentToEmail]: boolean,
}

type DateFilterState = {
  fromDate: Date | null,
  toDate: Date | null,
  type: DateFilters | null
}

export type QuickFindState = {
  searchQuery: string,
  items: QuickFindResult[],
  isLoading: boolean,
  isError: boolean,
  filters: FilterState,
  dateFilter: DateFilterState
};

const initialState: QuickFindState = {
  searchQuery: '',
  items: [],
  isLoading: false,
  isError: false,
  filters: {
    [FilterType.case]: false,
    [FilterType.ticket]: false,
    [FilterType.action]: false,
    [FilterType.contact]: false,
    [FilterType.serviceAgent]: false,
    [FilterType.inboundEmail]: false,
    [FilterType.outboundEmail]: false,
    [FilterType.selfServiceComments]: false,
    [FilterType.notes]: false,
    [FilterType.fileAttachmentToPacket]: false,
    [FilterType.fileAttachmentToEmail]: false,
  },
  dateFilter: {
    fromDate: null,
    toDate: null,
    type: null
  }
};

const _findCompletionState = (filters: boolean[]) => {
  if (filters.every(filter => filter)) {
    return {
      completed: true,
      indeterminate: false
    }
  } else if (filters.some(filter => filter)) {
    return {
      completed: false,
      indeterminate: true
    }
  } else {
    return {
      completed: false,
      indeterminate: false
    }
  }
}

export const QuickFindStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withComputed((store) => ({
    allWorkItems: computed(() => {

      const filters = [
        store.filters[FilterType.case](),
        store.filters[FilterType.ticket](),
        store.filters[FilterType.action]()
      ];

      return _findCompletionState(filters);

    }),
    allComms: computed(() => {

      const filters = [
        store.filters[FilterType.inboundEmail](),
        store.filters[FilterType.outboundEmail](),
        store.filters[FilterType.notes](),
        store.filters[FilterType.selfServiceComments]()
      ];

      return _findCompletionState(filters);

    }),
    allUsers: computed(() => {

      const filters = [
        store.filters[FilterType.contact](),
        store.filters[FilterType.serviceAgent]()
      ];

      return _findCompletionState(filters);

    }),
    allFiles: computed(() => {

      const filters = [
        store.filters[FilterType.fileAttachmentToPacket](),
        store.filters[FilterType.fileAttachmentToEmail]()
      ];

      return _findCompletionState(filters);

    }),
    filteredResult: computed(() => {
      const filters = Object.values(store.filters());
      const allSelected = filters.every(Boolean); // Checks if all values are true
      const nothingSelected = filters.every(val => !val); // Checks if all values are false
      const items = store.items();

      if (allSelected || nothingSelected) {
        return items;
      }

      return items.filter(item => store.filters()[item.type]);
    })
  })),
  withMethods((store, quickFindSrv = inject(QuickFindService), quickFindUtilSrv = inject(QuickFindUtilService)) => ({
    getResult: rxMethod<void>(
      pipe(
        filter(() => store.searchQuery().length > 2),
        tap(() => patchState(store, { isLoading: true, isError: false, items: [] })),
        switchMap(() => {

          const searchParam = quickFindUtilSrv.getSearchRequestParam(getState(store));

          return quickFindSrv.getSearchResultForQuery(searchParam).pipe(
            tap({
              next: (result) => {
                patchState(store, { items: result.search_results, isLoading: false })
              },
              error: (err) => {
                console.error(err);
                patchState(store, { isError: true, isLoading: false })
              }
            })
          );

        })
      )
    ),
    updateFilters: (updatedState: Partial<FilterState>) => {
      patchState(store, (state) => {
        return { filters: { ...state.filters, ...updatedState } }
      })
    },
    setSearchQuery: (query: string) => {
      patchState(store, { searchQuery: query });
    },
    resetSearchQueryAndResult: () => {
      patchState(store, { items: [], searchQuery: '' });
    },
    setDateFilter: (val: DateFilters) => {
      patchState(store, { dateFilter: { ...quickFindUtilSrv.getCalculatedDateRange(val) } });
    },
    setFromAndToDate: (val: Partial<DateFilterState>) => {
      patchState(store, (state) => {
        return { dateFilter: { ...state.dateFilter, ...val } }
      })
    }
  })),
  withHooks({
    onInit(store) {
      store.setDateFilter(DateFilters.lastWeek);
    },
  })
);

