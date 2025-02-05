import { Component, OnInit } from '@angular/core';
import { registerFormConfig } from './config/register-form-config';
import { IForm } from './interfaces/form.interface';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [DynamicFormComponent],
})
export class AppComponent implements OnInit {
  title = 'dynamic-form-building';
  registerForm = registerFormConfig as IForm;

  ngOnInit(): void {}
}
