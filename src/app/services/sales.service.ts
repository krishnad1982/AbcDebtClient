import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Sale } from '../shared/sale.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  username = 'abccorp';
  password = 'abc123corp'
  currencyList = ["AUD", "USD", "NZD"];
  baseUri = 'http://localhost:63992';

  constructor(private http: HttpClient) { }


  requestToken = () => {
    let url = `${this.baseUri}/token`;
    let body = `username=${this.username}&password=${this.password}&grant_type=password`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post(url, body, { headers: headers }).subscribe
      (
      (response) => {
        localStorage.setItem('access_token', response["access_token"]);
        localStorage.setItem('expires_in', response["expires_in"]);
        localStorage.setItem('token_type', response["token_type"]);
      },
      error => {
        throw error;
      }
      );
  }

  captureSaleAndPaymentDetails = (sale: Sale) => {
    let url = `${this.baseUri}/api/sales`;
    const token = localStorage.getItem("access_token");
    const token_type = localStorage.getItem("token_type");
    if (token === '' || token == null) {
      return this.requestToken();
    }
    const header = this.createAuthorizationHeader(token, token_type);
    this.http.post(url, sale, { headers: header }).subscribe
      (
      (response) => {
        alert("Payment process has been completed succesfully!");
      }, (err: HttpErrorResponse) => {
        throw err;
      }
      );

    return token;
  }

  createAuthorizationHeader = (token: string, tokeType: string) => {
    let headers = new HttpHeaders({ 'Authorization': `${tokeType} ${token}` });
    return headers;
  }

  generateUniqueId = () => {
    return UUID.UUID();
  }
  getCurrencyList = () => {
    return this.currencyList;
  }
}
