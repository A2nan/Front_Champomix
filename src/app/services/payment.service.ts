import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  createCheckoutSession(productName: string, amount: number) {
    return this.http.post<any>('/champomix/api/payment/create-checkout-session', {
      product_name: productName,
      amount: amount,
      success_url: window.location.origin + '/success',
      cancel_url: window.location.origin + '/cancel'
    });
  }
}
