import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CurrencyService } from '../../service/currencyapi';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  countryCodes = [];
  countriesName = new Map();

  rates: any;
  swappedRate: any;

  from: any;
  to: any;

  fromCurr: any = 'MYR';
  toCurr: any = 'USD';

  constructor(
    public navCtrl: NavController,
    protected currenService: CurrencyService,
    public http: HttpClient
    ) {}
  
  ngOnInit() {
    this.fetchCountriesData();
    this.fetchCurrencyRates();
  }

  async fetchCountriesData() {
    try {
      const res = await this.currenService.getCountries();
      for (let x in res['results']) {
        this.countryCodes.push(x);
        this.countriesName.set(x, res['results'][x].currencyName);
      }
    } catch (err) {
      console.error(err);
    }
    console.log(this.countriesName);
  }

  async fetchCurrencyRates() {
    let from = this.fromCurr;
    let to = this.toCurr;
    try {
      const exchangeRate = await this.currenService.getExchangeRate(from, to);
      let rate = exchangeRate[from + "_" + to].val;
      this.rates = rate;
    }
    catch (err) {
      console.error(err);
    }
  }
  calculateCurrencyOne() {
    this.to = this.from * parseFloat(this.rates);
    console.log('Final Value: ' + this.to);
  }

  calculateCurrencyTwo() {
    this.from = this.to / parseFloat(this.rates);
    console.log('Final Value: ' + this.to);
  }
}
