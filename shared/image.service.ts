import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageDetailList: AngularFirestoreCollection;

  constructor(private firebase: AngularFireDatabase, private db: AngularFirestore) { }

  getImageDetailList() {
    this.imageDetailList = this.db.collection('Events');
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.add(imageDetails);
  }
}

