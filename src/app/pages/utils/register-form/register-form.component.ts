import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  form = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(6), Validators.required]],
    nickname: ['', [Validators.required]],
  }, {
  });
  status: string = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  doregister() {
    if (this.form.valid) {
      this.status = 'loading';
      const { username, email, password, nickname } = this.form.getRawValue();
      this.authService.register(username, email, password, nickname)
      .subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/login']);
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
