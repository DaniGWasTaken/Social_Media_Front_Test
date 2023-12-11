import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  form = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: string = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { username, password } = this.form.getRawValue();
      this.authService.login(username, password)
        .subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error(error); // Log the error for debugging
            this.status = 'failed';
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
