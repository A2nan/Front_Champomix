import { Component, OnInit, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NgForOf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-champomi-list',
  standalone: true,
  imports: [NgForOf, CommonModule, FormsModule],
  templateUrl: './champomi-list.component.html',
  styleUrls: ['./champomi-list.component.css']
})
export class ChampomiListComponent implements OnInit {
  champomis: any[] = [];
  users: any[] = [];
  orders: any[] = [];
  ajouterUser: any = {};
  ajouterOrder: any = {};
  ajouterChampomi: any = {};

  selectedChampomi: any = null;
  selectedUser: any = null;
  selectedOrder: any = null;

  showAddChampomi = false;
  showAddUser = false;
  showAddOrder = false;

  private router = inject(Router);

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.loadChampomis();
    this.loadUsers();
    this.loadOrders();
  }

  loadChampomis(): void {
    this.httpService.getChampomi().subscribe((data: any) => {
      this.champomis = data;
    });
  }

  loadUsers(): void {
    this.httpService.getUser().subscribe((data: any) => {
      this.users = data;
    });
  }

  loadOrders(): void {
    this.httpService.getOrder().subscribe((data: any) => {
      this.orders = data;
    });
  }

  loadChampomiDetails(id: number): void {
    this.httpService.getOneChampomi(id).subscribe((data: any) => {
      this.selectedChampomi = data;
    });
  }

  loadUserDetails(id: number): void {
    this.httpService.getOneUser(id).subscribe((data: any) => {
      this.selectedUser = data;
    });
  }

  loadOrderDetails(id: number): void {
    this.httpService.getOneOrder(id).subscribe((data: any) => {
      this.selectedOrder = data;
    });
  }

  deleteChampomi(id: number): void {
    this.httpService.deleteOneChampomi(id).subscribe(() => {
      this.loadChampomis();
    });
  }

  deleteUser(id: number): void {
    this.httpService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
  deleteOrder(id: number): void { 
    this.httpService.deleteOneOrder(id).subscribe(() => {
      this.loadOrders();
    });
  }

  createChampomi(ajouterChampomi: any): void {
    this.httpService.postChampomi(ajouterChampomi).subscribe(() => {
      this.loadChampomis();
    });
  }

  createUser(ajouterUser: any): void {
    this.httpService.postUser(ajouterUser).subscribe(() => {
      this.loadUsers();
    });
  }

  createOrder(ajouterOrder: any): void {
    this.httpService.postOrder(ajouterOrder).subscribe(() => {
      this.loadOrders();
    });
  }

  goToCheckout(champomi: any): void {
    // Préparer l'item pour le checkout
    const checkoutItem = {
      id: champomi.id,
      name: champomi.name || `Champomi ${champomi.id}`,
      price: champomi.price || 1000, // Prix par défaut en centimes (10€)
      amount: champomi.price || champomi.amount || 1000,
      quantity: 1,
      description: champomi.description || ''
    };

    // Sauvegarder dans localStorage
    localStorage.setItem('checkoutItems', JSON.stringify([checkoutItem]));
    
    // Rediriger vers le checkout
    this.router.navigate(['/checkout']);
  }
}