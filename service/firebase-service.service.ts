import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userList: AngularFireList<any>; // User
  expertList: AngularFireList<any>; // Expert
  placeList: AngularFireList<any>; // Place
  analyfishList: AngularFireList<any>; // analyfish
  reportfromuserList: AngularFireList<any>; // reportuser

constructor(private db: AngularFireDatabase) {
this.expertList = db.list('Experts'); // Expert
this.userList = db.list('Users'); // User
this.placeList = db.list('Place'); // Place
this.reportfromuserList = db.list('ReportFromUser'); // report
this.analyfishList = db.list('SentToExpert'); // analyfish

}
getexpertList(): Observable<any[]> {
return this.expertList.snapshotChanges().map(actions => {
return actions.map(action => ({ key: action.key, value: action.payload.val() }));
});
}
getexpert(id): Observable<any> {
  return this.db.object('Experts/' + id).snapshotChanges().map(res => {
  return res.payload.val();
  });
  }
removeexpert(id): void {
this.expertList.remove(id);
}
addexpert(data) {
  return this.expertList.push(data);
  }
  editexpert(id, data) {
  return this.expertList.update(id, data);
  }

// User

getuserList(): Observable<any[]> {
return this.userList.snapshotChanges().map(actions => {
return actions.map(action => ({ key: action.key, value: action.payload.val() }));
});
}
getuser(id): Observable<any> {
  return this.db.object('Users/' + id).snapshotChanges().map(res => {
  return res.payload.val();
  });
  }
removeuser(id): void {
this.userList.remove(id);
}
adduser(data) {
  return this.userList.push(data);
  }
  edituser(id, data) {
  return this.userList.update(id, data);
  }

 // Place
 addplace(data) {
  return this.placeList.push(data);
  }
  editplace(id, data) {
  return this.placeList.update(id, data);
  }

// report

getreportfromuserList(): Observable<any[]> {
return this.reportfromuserList.snapshotChanges().map(actions => {
return actions.map(action => ({ key: action.key, value: action.payload.val() }));
});
}
getreportfromuser(id): Observable<any> {
  return this.db.object('ReportFromUser/' + id).snapshotChanges().map(res => {
  return res.payload.val();
  });
  }

  // analysis fish

  getanalyfishList(): Observable<any[]> {
    return this.analyfishList.snapshotChanges().map(actions => {
    return actions.map(action => ({ key: action.key, value: action.payload.val() }));
    });
    }
    getanalyfish(id): Observable<any> {
      return this.db.object('SentToExpert/' + id ).snapshotChanges().map(res => {
      return res.payload.val();
      });
      }
    removeanalyfish(id): void {
    this.analyfishList.remove(id);
    }
    addanalyfish(data) {
      return this.analyfishList.push(data);
      }


      // new level value
      onGetUserDocuments(SentToExpert: string) {
        return this.db.list(`SentToExpert/${SentToExpert}`).valueChanges();
      }

      onGetUsersDocuments() {
        return this.db.list('SentToExpert').snapshotChanges()
          .map((changes) => {
            return changes.map((data) => {
              return data.payload.key;
            });
          })
          .switchMap((usersId: string[]) => {
            return Observable.combineLatest( usersId.map((u) => {
              return this.onGetUserDocuments(u);
            }));
          });
      }
}

