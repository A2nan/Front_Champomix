import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  constructor(private paymentService: PaymentService) {}

  async pay() {
    const stripe = await loadStripe('pk_test_51RfdQ7PVmtayri89DfEXu2kTTefpem9yDJlmuotOimDtuSoBsAQx2srtGs8el2G3bXxxdwyCss04rvOoqkD0iFII00bpbHJt1i');
    this.paymentService.createCheckoutSession('Champomi Premium', 19.99)
      .subscribe(async (session) => {
        if (stripe) {
          await stripe.redirectToCheckout({ sessionId: session.id });
        }
      });
  }
}
