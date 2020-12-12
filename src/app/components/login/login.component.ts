import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ILoginRequest } from 'src/app/interfaces/login-request.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    if (this.userService.currentBearerTokenValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.userService.login(this.form.value as ILoginRequest)
      .pipe(first())
      .subscribe(response => {
        return this.router.navigate([this.returnUrl]);
      }, _error => {
        alert('Nombre de usuario/contraseña inválido');
        this.form.reset();
      })
  }

}
