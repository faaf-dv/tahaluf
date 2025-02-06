import { Component, computed, effect, inject } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { SettingsStore } from '../../state/settings.store';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-settings',
  imports: [DrawerModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  constructor() {
    this.settingsForm = this.fb.group({});
    effect(() => {
      this.settingsForm = this.fb.group({});
      const settings = this.settingsStore.selectedControl()?.settings;
      if (settings) {
        for (let i = 0; i < settings?.length; i++) {
          const setting = settings[i];
          this.settingsForm.addControl(
            setting.name,
            this.fb.control(setting.value)
          );
        }
      }
    });
  }

  name = computed(() => {
    const found = this.settingsStore
      .selectedControl()
      .settings?.find((t: any) => t.name == 'name');
    if (found) {
      return found.value;
    }
    return 'Name';
  });

  _visible: boolean = false;
  settingsStore = inject(SettingsStore);
  fb = inject(FormBuilder);

  settingsForm!: FormGroup;

  set visible(val: boolean) {
    if (!val) this.settingsStore.resetSelectedControl();
  }

  get visible() {
    return this.settingsStore.selectedControl();
  }

  onSave() {
    const settings: any[] = [];
    const entries = Object.entries(this.settingsForm.value);
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      settings.push({
        name: entry[0],
        value: entry[1],
      });
    }
    this.settingsStore.updateSettings(settings);
  }

  onReset() {
    this.settingsForm = this.fb.group({});
    this.settingsStore.resetSettings();
  }
}
