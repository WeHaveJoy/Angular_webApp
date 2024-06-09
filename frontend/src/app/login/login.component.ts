import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    this.http.post('http://localhost:3000/api/login', { email: this.email, password: this.password })
      .subscribe(response => {
        this.router.navigate(['/dashboard']);
      }, error => {
        console.error('Login error', error);
      });
  }
}
