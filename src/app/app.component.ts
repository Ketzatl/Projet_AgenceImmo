import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'immo-Angular8';

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDYdY2qYONGWpHbtfd_6_jCFJs-ztmBAn8',
      authDomain: 'immo-angular8.firebaseapp.com',
      databaseURL: 'https://immo-angular8.firebaseio.com',
      projectId: 'immo-angular8',
      storageBucket: 'immo-angular8.appspot.com',
      messagingSenderId: '511852127769',
      appId: '1:511852127769:web:ef4007d3d505fa631c2c88'
    };
    firebase.initializeApp(firebaseConfig);
  }

}

