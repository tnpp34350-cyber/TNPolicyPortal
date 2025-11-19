import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  show = false;
  // sign-up removed — always sign-in

  // simple form models
  email = '';
  password = '';
  name = '';

  constructor(private auth: AuthService, private router: Router) {
    this.auth.show$.subscribe(v => this.show = v);
  }

  close() { this.auth.close(); }

  submit() {
    // For now allow sign-in without credentials and go to admin console
    this.auth.close();
    // navigate to admin console
    this.router.navigateByUrl('/admin');
  }

  social(provider: string) {
    // placeholder for social login
    window.open(`#social-${provider}`, '_blank');
  }
}
