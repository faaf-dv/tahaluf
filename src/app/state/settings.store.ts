import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { registerFormConfig } from '../config/register-form-config';
import { inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { ISetting } from '../interfaces/form.interface';

type SettingsState = {
  selectedControl: any;
  initialSettings: ISetting[];
  errors: { key: string; value: string }[];
  isErrorsDrawerVisible: boolean;
};

const initialState: SettingsState = {
  selectedControl: undefined,
  initialSettings: [],
  errors: [],
  isErrorsDrawerVisible: false,
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
        isErrorsDrawerVisible: store.errors().length > 0,
      }));
    },
    updateSettings: (settings: any) => {
      const key = store.selectedControl().name;
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
    addError: (error: { key: string; value: string }) => {
      const key = store.selectedControl().name + ' ' + error.key;
      const found = store.errors().find((t: any) => t.key == error.key);
      if (found) {
        patchState(store, (state) => ({
          ...state,
          errors: [
            ...store.errors().map((t: any) => {
              if (t.key == found.key) {
                return {
                  key,
                  value:
                    error.value +
                    ' is not a valid name. Length should be between 5 and 10 characters!',
                };
              } else {
                return {
                  key,
                  value:
                    t.value +
                    ' is not a valid name. Length should be between 5 and 10 characters!',
                };
              }
            }),
          ],
          isErrorsDrawerVisible: true,
        }));
      } else {
        patchState(store, (state) => ({
          ...state,
          errors: [
            ...store.errors(),
            {
              key,
              value:
                error.value +
                ' is not a valid name. Length should be between 5 and 10 characters!',
            },
          ],
          isErrorsDrawerVisible: true,
        }));
      }
    },
    setErrors: (errors: { key: string; value: string }[]) => {
      patchState(store, (state) => ({
        ...state,
        errors,
        isErrorsDrawerVisible: errors.length > 0,
      }));
    },
    setErrorsDrawerVisible: (isErrorsDrawerVisible: boolean) => {
      patchState(store, (state) => ({
        ...state,
        isErrorsDrawerVisible,
      }));
    },
    resetErrors: () => {
      patchState(store, (state) => ({
        ...state,
        errors: [],
      }));
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
