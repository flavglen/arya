import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router,public auth: AngularFireAuth) {
	}

	canActivate():Promise<boolean>|boolean {
		return new Promise((resolve) => {
			this.auth.onAuthStateChanged(user => {
				if (user) {
					resolve(true)
				} else {
					this.router.navigate(['login']);
				}
		})
	});
	}
}