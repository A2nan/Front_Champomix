import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StripeService } from '../../services/stripe.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private stripeService = inject(StripeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  items: any[] = [];
  loading = false;
  error: string | null = null;
  success = false;
  status: 'checkout' | 'success' | 'cancel' = 'checkout';

  ngOnInit(): void {
    // Récupérer les paramètres de la route
    this.route.queryParams.subscribe(params => {
      if (params['status'] === 'success') {
        this.status = 'success';
        this.success = true;
        localStorage.removeItem('checkoutItems'); // Nettoyer après succès
      } else if (params['status'] === 'cancel') {
        this.status = 'cancel';
      } else {
        // Récupérer les items depuis localStorage
        const storedItems = localStorage.getItem('checkoutItems');
        if (storedItems) {
          try {
            this.items = JSON.parse(storedItems);
          } catch (e) {
            console.error('Erreur lors du parsing des items:', e);
            this.items = [];
          }
        }
      }
    });
  }

  getTotal(): number {
    return this.items.reduce((total, item) => {
      return total + ((item.price || item.amount || 1000) * (item.quantity || 1));
    }, 0);
  }

  async proceedToPayment(): Promise<void> {
    if (this.items.length === 0) {
      this.error = 'Veuillez sélectionner au moins un produit';
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      await this.stripeService.checkout(this.items);
    } catch (error: any) {
      this.error = error.message || 'Une erreur est survenue lors du paiement';
      this.loading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/Champomi']);
  }
}