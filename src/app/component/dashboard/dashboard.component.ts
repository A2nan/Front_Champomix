import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NgForOf, CommonModule } from '@angular/common';
import { UniqueCompaniesPipe } from './unique-companies.pipe'; // Assurez-vous du chemin correct

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgForOf, CommonModule, UniqueCompaniesPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private httpService: HttpService = inject(HttpService);

  public users: any = [];

  ngOnInit(): void {
    this.httpService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
