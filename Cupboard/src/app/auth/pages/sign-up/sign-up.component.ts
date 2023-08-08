import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSignUpData } from '../../interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth/auth.component.css'],
})
export class SignUpComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  SignUpForm: FormGroup = this.fb.group({
    name: ['Primer front owo', [Validators.required]],
    userName: ['1stFront', [Validators.required]],
    email: ['test11@gmail.com', [Validators.required]],
    password: ['1234567', [Validators.required]],
  });

  public signUp = () => {
    const signUpData: UserSignUpData = this.SignUpForm.value;
    this.authService.signUp(signUpData).subscribe((resp) => {
      if (resp.ok) this.router.navigateByUrl('/home');
      else {
        const { msg } = resp;
        //TODO: show error message
        console.log(msg);
      }
    });
  };

  public validInput = (campo: string) => {
    return (
      this.SignUpForm.controls[campo].errors &&
      this.SignUpForm.controls[campo].touched
    );
  };
}
