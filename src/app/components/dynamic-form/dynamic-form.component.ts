import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IForm, IFormControl } from '../../interfaces/form.interface';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { SettingsStore } from '../../state/settings.store';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
  ],
})
export class DynamicFormComponent implements OnInit {
  getCaption(control: IFormControl): string | undefined {
    const rows = control.settings?.find((t: any) => t.name == 'caption');
    if (rows) {
      return rows.value;
    }
    return undefined;
  }

  getRows(control: IFormControl) {
    const rows = control.settings?.find((t: any) => t.name == 'rows');
    if (rows) {
      return rows.value;
    }
    return undefined;
  }
  getCols(control: IFormControl) {
    const cols = control.settings?.find((t: any) => t.name == 'cols');
    if (cols) {
      return cols.value;
    }
    return undefined;
  }
  getBorder(control: IFormControl) {
    const border = control.settings?.find((t: any) => t.name == 'border');
    if (border) {
      return border.value;
    }
    return undefined;
  }

  @Input() form!: IForm;
  dynamicFormGroup: FormGroup;
  settingsStore = inject(SettingsStore);

  constructor(private fb: FormBuilder) {
    this.dynamicFormGroup = this.fb.group({}, { updateOn: 'submit' });
  }

  ngOnInit(): void {
    if (this.form?.formControls) {
      const formGroup: any = {};
      this.form.formControls.forEach((control: any) => {
        const controlValidators: any = [];
        if (control.validators) {
          control.validators.forEach((val: any) => {
            if (val.validatorName === 'required')
              controlValidators.push(Validators.required);
            if (val.validatorName === 'email')
              controlValidators.push(Validators.email);
            if (val.validatorName === 'minlength')
              controlValidators.push(Validators.minLength(val.minLength));
            if (val.validatorName === 'pattern')
              controlValidators.push(Validators.pattern(val.pattern));
            if (val.validatorName === 'maxlength')
              controlValidators.push(Validators.maxLength(val.maxLength));
          });
        }
        formGroup[control.name] = [control.value || '', controlValidators];
      });
      this.dynamicFormGroup = this.fb.group(formGroup);
    }
  }

  onSubmit() {
    if (this.dynamicFormGroup.valid) {
      console.log('Form values:', this.dynamicFormGroup.value);
    }
  } // Implement validation error message handling here

  resetForm() {
    this.dynamicFormGroup.reset();
  }

  getErrorMessage(control: any) {}

  onSelectControl(control: any) {
    this.settingsStore.setSelectedControl(control);
  }
}
