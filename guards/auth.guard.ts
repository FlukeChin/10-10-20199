import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
// tslint:disable-next-line: import-blacklist
import 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {
constructor(private afAuth: AngularFireAuth, private router: Router) { }
canActivate(
 next: ActivatedRouteSnapshot,
 state: RouterStateSnapshot): Observable<boolean> | boolean {
return this.afAuth.authState
 .take(1)
 .map(user => !!user)
 .do(loggedIn => {
 if (!loggedIn) {
 this.router.navigate(['/login']);
 }
 });
}
}

