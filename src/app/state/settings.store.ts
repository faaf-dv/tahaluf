import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type SettingsState = {
  control: any;
};

const initialState: SettingsState = {
  control: undefined,
};

export const SettingsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setControl: (control: any) => {
      patchState(store, (state) => ({ ...state, control }));
    },
    reset: () => {
      patchState(store, (state) => ({ ...state, control: undefined }));
    },
  }))
);
