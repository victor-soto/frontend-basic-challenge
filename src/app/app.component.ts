import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend Basic Challenge';
  
  currentBearerToken: string;

  constructor(private userService: UserService, private router: Router) {
    this.userService.currentBearerToken.subscribe(x => this.currentBearerToken = x);
   }  

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
