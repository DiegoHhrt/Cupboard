import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth/auth.component.css'],
})
export class SignUpComponent {
  constructor(private fb: FormBuilder) {}

  SignUpForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    pw: ['', [Validators.required]],
  });

  public signUp = () => {
    console.log('sign');
  };

  public validInput = (campo: string) => {
    return (
      this.SignUpForm.controls[campo].errors &&
      this.SignUpForm.controls[campo].touched
    );
  };
}
