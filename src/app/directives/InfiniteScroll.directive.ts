import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[infiniteScroll]',
  standalone: true
})
export class InfiniteScrollDirective {
  @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();
  
  @Input() threshold: number = 120;
  
  constructor(private el: ElementRef) {}
  
  @HostListener('window:scroll', ['$event.target'])
  windowScroll(event: KeyboardEvent): void {
    const windowHeight: number = window.document.documentElement.scrollHeight;
    const elementHeight: number = this.el.nativeElement.scrollHeight;
    const currentScrollY: number = window.scrollY;
    const innerHeight: number = window.innerHeight;
    
    const windowAndElementSpace: number = windowHeight - elementHeight;
    const scrollToBottom: number = elementHeight - innerHeight - currentScrollY + windowAndElementSpace;
    
    if(scrollToBottom < this.threshold) {
      this.nearEnd.emit();
    }
  }
  
}