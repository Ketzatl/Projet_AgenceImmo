import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from '../interfaces/property';
import * as firebase from 'firebase';
import {newArray} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [];

  propertiesSubject = new Subject<Property[]>();

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  saveProperties() {
    firebase.database().ref('/properties').set(this.properties);
  }

  getProperties() {
    firebase.database().ref('/properties').on('value', (data) => {
      this.properties = data.val() ? data.val() : [];
      this.emitProperties();
    });
  }

  getSingleProperties(id) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/properties/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createProperty(property: Property) {
    this.properties.push(property);
    this.saveProperties();
    this.emitProperties();
  }

  deleteProperty(index) {
    this.properties.splice(index, 1);
    this.saveProperties();
    this.emitProperties();
  }
s
  updateProperty(property: Property, index) {
    /*this.properties[index] = property;
    this.saveProperties();
    this.emitProperties();*/
    firebase.database().ref('/properties/' + index).update(property).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        const fileName = uniqueId + file.name;
        const upload = firebase.storage().ref().child('images/properties/' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
              console.log('Chargement...');
          },
          (error) => {
              console.error(error);
              reject(error);
          },
          () => {
              upload.snapshot.ref.getDownloadURL().then(
                (downLoadUrl) => {
                  resolve(downLoadUrl);
                }
              );
          }
        );
      }
    );
  }

  removeFile(fileLink: string) {
    if (fileLink) {
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef.delete().then(
        () => {
          console.log('File deleted');
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
