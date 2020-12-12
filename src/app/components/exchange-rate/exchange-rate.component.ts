import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IExchangeRateRequest } from 'src/app/interfaces/exchange-rate-request.interface';
import { IExchangeRateResponse } from 'src/app/interfaces/exchange-rate-response.interface';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit {

  form = new FormGroup({
    sourceCurrency: new FormControl('', Validators.required),
    targetCurrency: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  });

  model: IExchangeRateResponse;

  constructor(private service: ExchangeRateService) { }

  ngOnInit(): void { }

  calculate() {
    this.service.calculate(this.form.value as IExchangeRateRequest)
      .subscribe(response => {
        this.model = response;
      })
  }

}
