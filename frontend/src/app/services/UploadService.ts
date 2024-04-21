import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) { }

  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);

    return this.http.post('/api/upload', formData)
      .pipe(map((res: any) => res.imageId));
  } 

  getImage(imageId: string) {
    return this.http.get(`/api/image/${imageId}`, { responseType: 'blob' });
  }
}