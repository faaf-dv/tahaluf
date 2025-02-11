import { Component, OnInit } from '@angular/core';
import { registerFormConfig } from './config/register-form-config';
import { IForm } from './interfaces/form.interface';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ErrorsComponent } from './components/errors/errors.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [DynamicFormComponent, SettingsComponent, ErrorsComponent],
})
export class AppComponent implements OnInit {
  title = 'dynamic-form-building';
  registerForm = registerFormConfig as IForm;

  ngOnInit(): void {}
}
