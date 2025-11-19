import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  show = false;
  mode: 'sign-in' | 'sign-up' = 'sign-in';

  // simple form models
  email = '';
  password = '';
  name = '';

  constructor(private auth: AuthService) {
    this.auth.show$.subscribe(v => this.show = v);
  }

  close() { this.auth.close(); }
  openSignUp() { this.mode = 'sign-up'; this.auth.open(); }
  openSignIn() { this.mode = 'sign-in'; this.auth.open(); }

  submit() {
    // placeholder: implement auth integration
    console.log('submit', this.mode, this.email);
    this.auth.close();
  }

  social(provider: string) {
    // placeholder for social login
    window.open(`#social-${provider}`, '_blank');
  }
}
