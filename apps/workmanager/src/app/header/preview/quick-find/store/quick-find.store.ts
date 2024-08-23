import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { filter, pipe, switchMap, tap } from "rxjs";
import { DateFilters, FilterType, QuickFindService } from "./quick-find.service";
import { QuickFindResult } from "./dummy-data.constant";

type FilterState = {
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
  type: DateFilters
}

type QuickFindState = {
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
    [FilterType.case]: true,
    [FilterType.ticket]: true,
    [FilterType.action]: true,
    [FilterType.contact]: true,
    [FilterType.serviceAgent]: true,
    [FilterType.inboundEmail]: true,
    [FilterType.outboundEmail]: true,
    [FilterType.selfServiceComments]: true,
    [FilterType.notes]: true,
    [FilterType.fileAttachmentToPacket]: true,
    [FilterType.fileAttachmentToEmail]: true,
  },
  dateFilter: {
    fromDate: null,
    toDate: null,
    type: DateFilters.allTime
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
      return store.items().filter((item) => {
        return store.filters()[item.type];
      })
    })
  })),
  withMethods((store, quickFindSrv = inject(QuickFindService)) => ({
    getResult: rxMethod<void>(
      pipe(
        filter(() => store.searchQuery().length > 2),
        tap(() => patchState(store, { isLoading: true, isError: false, items: [] })),
        switchMap(() => {
          return quickFindSrv.getSearchResultForQuery({
            searchQuery: store.searchQuery(),
            fromDate: store.dateFilter.fromDate(),
            toDate: store.dateFilter.toDate()
          }).pipe(
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
    setDateFilter: (val: DateFilterState) => {
      patchState(store, { dateFilter: { ...val } });
    },
    setFromAndToDate: (val: Partial<DateFilterState>) => {
      patchState(store, (state) => {
        return { dateFilter: { ...state.dateFilter, ...val } }
      })
    }
  }))
);

// no data state - initial state or no result in db for query or no result according to filter.
// error state
// loading state
// data available state

