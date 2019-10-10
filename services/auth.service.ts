import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';



@Injectable()
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;

  authState: any = null;
  userRef: AngularFireObject<any>;
  addUserData: any;

constructor(private afAuth: AngularFireAuth,
            private db: AngularFireDatabase,
            private afs: AngularFirestore,
            private router: Router) {
this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }
get authenticated(): boolean {
    return this.authState !== null;
  }
get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }
get currentUserObservable(): any {
    return this.afAuth.authState;
  }
get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }
get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest';
    } else if (this.currentUserAnonymous) {
      return 'Anonymous';
    } else {
      return this.authState['displayName'] || 'User without a Name';
    }
  }
githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialSignIn(provider);
  }
googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }
facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }
twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialSignIn(provider);
  }
private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        console.log(credential.user);
        this.authState = credential.user;
        this.updateUserData();
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }
anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.authState = user;
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }
emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.addUserData(); {
          this.db.list('/users').push({'email': this.authState.email});
          }
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }
emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData();
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }
resetPassword(email: string) {
    const fbAuth = firebase.auth();
    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }
getCurrentLoggedIn() {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigate(['/profile']);
      }
    });
  }
signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
private updateUserData(): void {
    const path = 'users/${this.currentUserId}'; // Endpoint on firebase
    const userRef: AngularFireObject<any> = this.db.object(path);
    const data = {
      email: this.authState.email,
      name: this.authState.displayName
    };
    userRef.update(data)
      .catch(error => console.log(error));
}







// new
getUserState() {
  return this.afAuth.authState;
}

login( email: string, password: string) {
  this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      this.eventAuthError.next(error);
    })
    .then(userCredential => {
      if (userCredential) {
        this.router.navigate(['/home']);
      }
    });
}

createUser(user) {
  console.log(user);
  this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password)
    .then( userCredential => {
      this.newUser = user;
      console.log(userCredential);
      userCredential.user.updateProfile( {
        displayName: user.firstName + ' ' + user.lastName + ' ' + user.phone + ' ' + user.limitfish
      });

      this.insertUserData(userCredential)
        .then(() => {
          this.router.navigate(['/expert']);
        });
    })
    .catch( error => {
      this.eventAuthError.next(error);
    });
}

insertUserData(userCredential: firebase.auth.UserCredential) {
  return this.db.object(`Experts/${userCredential.user.uid}`).set({
    email: this.newUser.email,
    firstname: this.newUser.firstName,
    lastname: this.newUser.lastName,
    phone: this.newUser.phone,
    limitfish: this.newUser.limitfish,

  });
}

logout() {
  return this.afAuth.auth.signOut();
}
}
