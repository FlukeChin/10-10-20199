import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Component
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { AccountComponent } from './components/account/account.component';
import { CrexpertComponent } from './components/crexpert/crexpert.component';
import { UserComponent } from './components/user/user.component';
import { ExpertComponent } from './components/expert/expert.component';
import { EditComponent } from './components/edit/edit.component';
import { EditexpertComponent } from './components/editexpert/editexpert.component';
import { PlaceComponent } from './components/place/place.component';
import { AnlysisComponent } from './components/anlysis/anlysis.component';
import { UploadimgComponent } from './components/uploadimg/uploadimg.component';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { ReportuserComponent } from './components/reportuser/reportuser.component';
import { ReportexpertComponent } from './components/reportexpert/reportexpert.component';
import { ImagesComponent } from './images/images.component';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AnalyComponent } from './components/analy/analy.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';

// Service
import { FirebaseService } from './service/firebase-service.service';
import { AuthService } from './services/auth.service';

// Guard
import { AuthGuard } from './guards/auth.guard';
import { from } from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Routes
export const router: Routes = [
 {path: '', component: HomeComponent },
 {path: 'login', component: LoginComponent },
 {path: 'signup', component: SignupComponent },
 {path: 'account', component: AccountComponent },
 {path: 'crexpert', component: CrexpertComponent },
 {path: 'user', component: UserComponent },
 {path: 'expert', component: ExpertComponent },
 {path: 'edit', component: EditComponent },
 {path: 'place', component: PlaceComponent },
 {path: 'reportuser', component: ReportuserComponent },
 {path: 'editexpert', component: EditexpertComponent },
 {path: 'analysis', component: AnlysisComponent },
 {path: 'reportexpert', component: ReportexpertComponent },
 {path: 'registration', component: RegistrationComponent },
 {path: 'signin', component: SigninComponent },
 {path: 'uploadimg', component: UploadimgComponent },
 {path: 'polocylist', component: PolicyListComponent },
 {path: 'edituser/:id', component: EditComponent},
 {path: 'editexpert/:id', component: EditexpertComponent},
 {path: 'image', component: ImagesComponent },
 {path: 'list', component: ImageListComponent },
 {path: 'analy', component: AnalyComponent },
 {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],
},

];

// Config Firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyDKMFdjBNElVxowUg5SSNF40TKEKBL-FCk',
  authDomain: 'what-64706.firebaseapp.com',
  databaseURL: 'https://what-64706.firebaseio.com',
  projectId: 'what-64706',
  storageBucket: 'what-64706.appspot.com',
  messagingSenderId: '997207757226',
  appId: '1:997207757226:web:926fbb45c50b20fc495bd3',
  measurementId: 'G-RDKGX60WN6'
};

@NgModule({
 declarations: [
 AppComponent,
 HomeComponent,
 LoginComponent,
 NavbarComponent,
 ProfileComponent,
 SignupComponent,
 AccountComponent,
 CrexpertComponent,
 UserComponent,
 ExpertComponent,
 EditComponent,
 EditexpertComponent,
 PlaceComponent,
 AnlysisComponent,
 UploadimgComponent,
 PolicyListComponent,
 ReportuserComponent,
 ReportexpertComponent,
 ImagesComponent,
 ImageComponent,
 ImageListComponent,
 RegistrationComponent,
 SigninComponent,
 AnalyComponent,
 ],
 imports: [
 BrowserModule,
 FormsModule,
 ReactiveFormsModule,
 RouterModule.forRoot(router),
 AngularFireAuthModule,
 AngularFireModule.initializeApp(firebaseConfig),
 AngularFirestoreModule,
 AngularFireDatabaseModule,
 AngularFireStorageModule,
 AppRoutingModule,
 BrowserAnimationsModule,
 HttpClientModule,
 ],
 providers: [AuthService, AngularFireDatabase, AuthGuard, FirebaseService, AngularFireStorage],
 bootstrap: [AppComponent]
})
export class AppModule { }
