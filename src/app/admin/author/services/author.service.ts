import { Injectable, OnDestroy, ViewChild } from '@angular/core';
import { Author } from '../models/author';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, onSnapshot } from '@angular/fire/firestore';
import { log } from 'console';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { FormAuthorComponent } from '../share/form-author/form-author.component';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorRef = collection(this.firestore, 'author')
  // private operaciones$ = new Subject<string>();
  private operaciones: string[] = [];
  private operaciones$ = new BehaviorSubject<string[]>(this.operaciones);
  constructor(
    private firestore: Firestore
  ) {
    this.logOperaciones()
  }

  registrar(author: Author) {

    const authorObject = { ...author, createdAt: new Date() };
    return addDoc(this.authorRef, authorObject);
    // return addDoc(authorRef, {
    //   name: author.name || null,
    //   nationality: author.nationality || null,
    // });
  }

  getAll(): Observable<Author[]> {
    return collectionData(this.authorRef, { idField: 'id' }) as Observable<Author[]>
  }
  delete(author: Author) {
    const authorDoc = doc(this.firestore, `author/${author.id}`)
    return deleteDoc(authorDoc)
  }

  actualizar(author: Author) {
    const authorDoc = doc(this.firestore, `author/${author.id}`);
    const authorData = { ...author };
    delete authorData.id; // Eliminamos la propiedad "id" para evitar actualizarla
    return updateDoc(authorDoc, authorData);
  }

  // logOperaciones() {
  //   const authorCollection = collection(this.firestore, 'author');
  //   onSnapshot(authorCollection, (querySnapshot) => {
  //     querySnapshot.docChanges().forEach((change) => {
  //       if (change.type === 'added') {
  //         this.operaciones$.next(`Se insertó el documento ${change.doc.id}`);
  //       } else if (change.type === 'modified') {
  //         this.operaciones$.next(`Se actualizó el documento ${change.doc.id}`);
  //       } else if (change.type === 'removed') {
  //         this.operaciones$.next(`Se eliminó el documento ${change.doc.id}`);
  //       }
  //     });
  //   });
  // }
  // getOperaciones(): Observable<string> {
  //   return this.operaciones$.asObservable();
  // }
  logOperaciones() {
    const authorCollection = collection(this.firestore, 'author');
    onSnapshot(authorCollection, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {

        let data = change.doc.data()
        delete data["createdAt"];
        const dataString = JSON.stringify(data);
        if (change.type === 'added') {
          const createdAt = change.doc.get('createdAt');
          const fechaCreacion = new Date(createdAt.seconds * 1000).toLocaleDateString('es-ES') + ' ' + new Date(createdAt.seconds * 1000).toLocaleTimeString('es-ES');
          this.operaciones.unshift(`${fechaCreacion} - Se insertó el documento "${change.doc.id}" - Object: ${dataString}`);
        } else if (change.type === 'modified') {
          let fechaActual=new Date()
          const fechaHora = fechaActual.toLocaleDateString('es-ES') + ' ' + fechaActual.toLocaleTimeString('es-ES');
          
          this.operaciones.unshift(`${fechaHora} - Se actualizó el documento "${change.doc.id}" - Object: ${dataString}`);
        } else if (change.type === 'removed') {
          let fechaActual=new Date()
          const fechaHora = fechaActual.toLocaleDateString('es-ES') + ' ' + fechaActual.toLocaleTimeString('es-ES');
          
          this.operaciones.unshift(`${fechaHora} - Se eliminó el documento "${change.doc.id}" - Object: ${dataString}`);
        }

      });
      this.operaciones$.next(this.operaciones);
    });
  }
  getOperaciones(): Observable<string[]> {
    return this.operaciones$.asObservable();
  }

}