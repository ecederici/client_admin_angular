import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable()
export class SettingsService {
  settings: Settings = {
    allowRegistration: false,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false,
    disableDeleteButton: false
  }
  vat: number;
  constructor() {
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

    getSettings(): Settings {
      return this.settings;
    }

  changeSettings(settings: Settings) {
      localStorage.setItem('settings', JSON.stringify(settings));
  }

  changeVat(vat) {
    localStorage.setItem('vat', JSON.stringify(vat));
  }

  getVat() {
    if (localStorage.getItem('vat') != null) {
      this.vat = JSON.parse(localStorage.getItem('vat'));
    }
    return this.vat;

  }
}
