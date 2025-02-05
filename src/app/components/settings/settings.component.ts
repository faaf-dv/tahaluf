import { Component, inject } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { SettingsStore } from '../../state/settings.store';

@Component({
  selector: 'app-settings',
  imports: [DrawerModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  _visible: boolean = false;
  settingsStore = inject(SettingsStore);

  set visible(val: boolean) {
    if (!val) this.settingsStore.reset();
  }

  get visible() {
    return this.settingsStore.control();
  }
}
