import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-main',
  template: ` <router-outlet></router-outlet>`,
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.validateToken().subscribe((ok) => {
      if (ok) this.router.navigate(['/home']);
    });
  }
}
