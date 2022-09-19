import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Injectable()
export class FileUploadService {
  constructor(private storage: AngularFireStorage) {}

  uploadFile(filePath, file) {
    const fileRef = this.storage.ref(filePath);
    return this.storage
      .upload(filePath, file)
      .snapshotChanges()
      .pipe()
      .toPromise()
      .then((storage) => {
        return storage.ref.getDownloadURL();
      });
  }
}
