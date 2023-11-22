import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserLoginData } from '../../interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth/auth.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  LoginForm: FormGroup = this.fb.group({
    email: ['test2@gmail.com', [Validators.required]],
    password: ['1234567', [Validators.required]],
  });

  public login = () => {
    const loginData: UserLoginData = this.LoginForm.value;
    this.authService.login(loginData).subscribe((resp) => {
      if (resp.ok) this.router.navigateByUrl('/home');
      else {
        const { msg } = resp;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msg || 'An unknown error has occurred',
        });
      }
    });
  };

  public validInput = (campo: string) => {
    return (
      this.LoginForm.controls[campo].errors &&
      this.LoginForm.controls[campo].touched
    );
  };
}
