import {Component, OnDestroy, OnInit} from '@angular/core';
import { SettingsService } from '../../services/settings.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  vat: number;
  constructor(private settingsService: SettingsService,
              private router: Router) { }

  ngOnInit() {
    this.vat = this.settingsService.getVat();
  }
  onSubmit() {
    this.settingsService.changeVat(this.vat);
    window.location.reload();

  }

}
