import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('/api/login', { email: this.email, password: this.password })
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      }, error => {
        console.error('Login error', error);
      });
  }
}
