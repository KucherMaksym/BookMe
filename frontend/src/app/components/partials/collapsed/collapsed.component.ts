import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-collapsed',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './collapsed.component.html',
  styleUrl: './collapsed.component.scss'
})
export class CollapsedComponent implements AfterViewInit {
  @Input() content!: string;
  isCollapsed = true;
  @ViewChild('myDiv', { static: false }) myDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('btn', { static: false }) btn!: ElementRef<HTMLDivElement>;
  @ViewChild('contentDiv', { static: false }) contentDiv!: ElementRef<HTMLDivElement>;
  elementHeight!: number;

  constructor(private elementRef: ElementRef<HTMLElement>) {

  }



  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }



  ngAfterViewInit() {
    this.elementHeight = this.contentDiv.nativeElement.offsetHeight;
    this.elementHeight += 35; // + padding
    this.elementRef.nativeElement.style.setProperty('--max-height', this.elementHeight.toString() + "px");
    if (this.elementHeight < 250) {
      this.myDiv.nativeElement.classList.add("expanded");
      this.btn.nativeElement.classList.add("d-none");
      this.myDiv.nativeElement.classList.add("p-1");
    }
  }
}
