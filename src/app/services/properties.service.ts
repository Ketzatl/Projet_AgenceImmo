import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties = [
    {
      title: 'Ma Super Maison',
      category: 'Maison',
      sold: true
    },
    {
      title: 'Mon Super Petit Appartement',
      category: 'Appartement',
      sold: false
    },
    {
      title: 'Ma Super Belle Villa',
      category: 'Maison',
      sold: true
    }
  ];

  propertiesSubject = new Subject<any[]>();

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  getProperties() {}

}
