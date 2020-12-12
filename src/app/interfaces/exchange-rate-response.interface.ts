export interface IExchangeRateResponse {
  amount: number;
  convertedAmount: number;
  sourceCurrency: string;
  targetCurrency: string;
  rate: number;
}
