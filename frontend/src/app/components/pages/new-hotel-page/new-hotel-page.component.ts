import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { HotelService } from "../../../services/hotel.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-new-hotel-page',
  templateUrl: './new-hotel-page.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  styleUrls: ['./new-hotel-page.component.scss']
})
export class NewHotelPageComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  hotelForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private hotelService: HotelService) {
    this.hotelForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      pricePerAdult: ['', [Validators.required]],
      pricePerKid: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(5)]],
      images: ['', [Validators.required]]
    });
  }
  submit(): void {
    const form = this.hotelForm.value;
    if (this.hotelForm.invalid) {
      console.log('Форму правильно заполни, еблан');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('pricePerAdult', form.pricePerAdult.toString());
    formData.append('pricePerKid', form.pricePerKid.toString());
    formData.append('location', form.location);

    const files = this.fileInput.nativeElement.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]); // Передаем File в качестве второго аргумента
      }
    }

    this.hotelService.newHotel(formData).subscribe({
      next: (response) => {
        console.log('Успешно, вроде  ', response.name);
      },
      error: (error) => {
        console.error('Ошибка при создании отеля:', error);
      }
    });
  }

  ngOnInit(): void {}
}
