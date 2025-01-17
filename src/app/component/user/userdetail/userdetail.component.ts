import { Component, inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdetail',
  standalone: true,
  imports: [],
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.css'
})
export class UserdetailComponent {
  private HttpService: HttpService = inject(HttpService);

  public userDetail: any = null;

  private userId: number = 2;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((data) => {       
      this.userId = + data['userid'];
      this.fetchUserData
    });
  }

  fetchUserData (){
    if(this.userId) {
      this.HttpService.getOneChampomi(this.userId).subscribe((data) => {
        this.userDetail = data;
        console.log('Détail de l’utilisateur : ', this.userDetail);
      });
    }
  }
}
