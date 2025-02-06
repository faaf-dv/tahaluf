import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { registerFormConfig } from '../config/register-form-config';
import { inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { ISetting } from '../interfaces/form.interface';

type SettingsState = {
  selectedControl: any;
  initialSettings: ISetting[];
};

const initialState: SettingsState = {
  selectedControl: undefined,
  initialSettings: [],
};

export const SettingsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, settingsService = inject(SettingsService)) => ({
    setSelectedControl: (selectedControl: any) => {
      patchState(store, (state) => ({
        ...state,
        selectedControl,
        initialSettings: selectedControl.settings,
      }));
    },
    updateSettings: (settings: any) => {
      patchState(store, (state) => ({
        ...state,
        selectedControl: {
          ...store.selectedControl(),
          settings,
        },
      }));
      settingsService.updateControlSettings(store.selectedControl(), settings);
    },
    resetSettings: () => {
      patchState(store, (state) => ({
        ...state,
        selectedControl: {
          ...store.selectedControl(),
          settings: store.initialSettings(),
        },
      }));
      settingsService.updateControlSettings(
        store.selectedControl(),
        store.initialSettings()
      );
    },
    resetSelectedControl: () => {
      patchState(store, (state) => ({
        ...state,
        selectedControl: undefined,
        initialSettings: [],
      }));
    },
  }))
);
