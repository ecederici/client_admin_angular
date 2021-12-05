import {Component, OnInit, ViewChild} from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  clientsWKDV: Client[];
  totalOwed: number;
  VAT: number;
  vat: number;
  // This class should be refactored
  constructor(private clientService: ClientService,
              private settingsService: SettingsService) { }

  ngOnInit() {

    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
    this.clientService.getClients().subscribe(c => {
      this.clientsWKDV = c;
      this.getTotalOwedKDV();
    });
    this.vat = this.settingsService.getVat();
  }


  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);

  }

  getTotalOwedKDV() {
    if (this.vat == 0) {
      this.VAT = this.totalOwed;
    } else {
      this.VAT = this.clientsWKDV.filter(c => c.balance > 40)
          .map(c => {
            c.balance = c.balance * (this.vat / 100);
            return c;
          }).reduce((total, c) => {
            return total + c.balance;
          }, 0);
    }
  }

}
