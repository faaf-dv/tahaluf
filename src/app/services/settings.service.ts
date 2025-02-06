import { Injectable } from '@angular/core';
import { IFormControl, ISetting } from '../interfaces/form.interface';
import { registerFormConfig } from '../config/register-form-config';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  updateControlSettings(control: IFormControl, settings: ISetting[]) {
    const found = registerFormConfig.formControls.find(
      (t: any) => t.id == control.id
    );
    if (found) {
      found.settings = settings;
    }
  }

  constructor() {}
}
