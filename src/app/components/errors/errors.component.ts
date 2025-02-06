import { Component, computed, inject } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { SettingsStore } from '../../state/settings.store';

@Component({
  selector: 'app-errors',
  imports: [DrawerModule],
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.css',
})
export class ErrorsComponent {
  settingsStore = inject(SettingsStore);
  isErrorsDrawerVisible = computed(() =>
    this.settingsStore.isErrorsDrawerVisible()
  );
  set visible(val: boolean) {
    this.settingsStore.setErrorsDrawerVisible(val);
  }

  get visible() {
    return this.isErrorsDrawerVisible();
  }
}
