import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    this.http.post('/api/logout', {}).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
