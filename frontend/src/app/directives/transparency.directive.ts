import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTransparency]',
  standalone: true
})
export class TransparencyDirective {

  private isTop = true;

  @HostBinding('class.transparent')
  get isTransparent() {
    return this.isTop;
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset;
    this.isTop = scrollPosition === 0;
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.isTop ? 'rgba(33, 37, 41, 0)' : 'rgba(33, 37, 41, 1)');
  }
}
