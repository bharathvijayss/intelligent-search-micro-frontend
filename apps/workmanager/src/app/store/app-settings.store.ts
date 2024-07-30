import { computed } from "@angular/core";
import { signalStore, withComputed, withState } from "@ngrx/signals";

type ProfileState = {
  WorkManagerRole: {
    Permissions: {
      AssignWorkItemToSelf: boolean
    }
  }
};

const initialState: ProfileState = {
  WorkManagerRole: {
    Permissions: {
      "AssignWorkItemToSelf": true,
    }
  },
};

export const ProfileStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    AssignWorkItemToSelf: computed(() => store.WorkManagerRole.Permissions.AssignWorkItemToSelf()),
  }))
);
