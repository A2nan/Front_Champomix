import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NgForOf, CommonModule } from '@angular/common';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgForOf, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  private httpService: HttpService = inject(HttpService)

  public Champomi: any = []

  ngOnInit(): void {
    this.httpService.getChampomi().subscribe(data =>{
      this.Champomi = data
    });
  }
}
