import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IExchangeRateRequest } from '../interfaces/exchange-rate-request.interface';
import { IExchangeRateResponse } from '../interfaces/exchange-rate-response.interface';

@Injectable()
export class ExchangeRateService {

  constructor(private http: HttpClient) { }

  calculate(request: IExchangeRateRequest) {
    return this.http.post<IExchangeRateResponse>(`${environment.baseUrl}/exchange-rate/calculate`, request);
  }

}
