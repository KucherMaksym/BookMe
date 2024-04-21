import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  selectedFiles: File[] = [];

  constructor(private http: HttpClient) { }

  onFilesSelected(event:any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  uploadImages() {
    if (this.selectedFiles.length === 0) {
      return;
    }

    const formData = new FormData();
    for (const file of this.selectedFiles) {
      formData.append('images', file);
    }

    this.http.post('http://localhost:3000/api/upload', formData)
      .subscribe(
        (response) => {
          console.log('Images uploaded successfully:', response);
          // Дополнительная логика после успешной загрузки
        },
        (error) => {
          console.error('Error uploading images:', error);
        }
      );
  }
}
