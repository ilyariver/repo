import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuthenticated = false;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
  ) {
    this.auth.currentAuthValue.subscribe(
      () => {
        this.isAuthenticated = this.auth.isAuthenticated();
      }
    )
  }

  ngOnInit() {
    this.setAuthStatus();
  }

  public onAuthenticationPage() {
    this.router.navigate(['authentication']);
  }

  public setAuthStatus() {
    this.isAuthenticated = this.auth.isAuthenticated();
  }

  public logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
