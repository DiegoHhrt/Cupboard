import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth/auth.component.css'],
})
export class LoginComponent {
  constructor(private fb: FormBuilder) {}

  LoginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    pw: ['', [Validators.required]],
  });

  public login = () => {
    console.log('Ligin');
  };

  public validInput = (campo: string) => {
    return (
      this.LoginForm.controls[campo].errors &&
      this.LoginForm.controls[campo].touched
    );
  };
}
