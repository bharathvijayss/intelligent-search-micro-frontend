import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, filter, pipe, switchMap, tap } from "rxjs";
import { FilterType, QuickFindService } from "./quick-find.service";
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

type QuickFindState = {
  items: QuickFindResult[],
  isLoading: boolean,
  isError: boolean,
  filters: FilterState
};

const initialState: QuickFindState = {
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
    getResult: rxMethod<string>(
      pipe(
        filter((query: string) => query.length > 2),
        debounceTime(300),
        tap(() => patchState(store, { isLoading: true, isError: false, items: [] })),
        switchMap((query: string) => {
          return quickFindSrv.getSearchResultForQuery(query).pipe(
            tap({
              next: (result) => {
                patchState(store, { items: result.search_results })
              },
              error: (err) => {
                console.error(err);
                patchState(store, { isError: true })
              },
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
    updateFilters: (updatedState: Partial<FilterState>) => {
      patchState(store, (state) => {
        return { filters: { ...state.filters, ...updatedState } }
      })
    }
  }))
);

// no data state - initial state or no result in db for query or no result according to filter.
// error state
// loading state
// data available state

