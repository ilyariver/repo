import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoListService } from '../../../to-do-list/services/to-do-list.service';
import { LoginMessage } from '../../../to-do-list/services/to-do-list-get.model';
import { ToastrService } from '../../../_helpers/toastr.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { Subscription } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.scss']
})
export class AuthenticationPageComponent implements OnInit, OnDestroy {
  public visible = true;
  public form: FormGroup;
  public submit = false;
  public isAuthenticated = false;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private toDoListService: ToDoListService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.setAuthStatus();
  }

  private initForm() {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  public showDialog() {
    this.submit = true;

    if (!this.form.valid) {
      return;
    }

    this.auth(this.form.value);
  }

  private setAuthStatus() {
    this.isAuthenticated = this.authenticationService.isAuthenticated()
  }

  private auth(body: LoginMessage) {
    this.subscription = this.authenticationService.login(body)
      .subscribe(res => {
        if (res.status === 'error') {
          this.toastr.set(res.message.password, 'error');
        } else {
          this.setAuthStatus();
          this.router.navigate(['/'])
        }
      })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
