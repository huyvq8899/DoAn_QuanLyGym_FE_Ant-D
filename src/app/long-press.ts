import {
    Directive,
    Output,
    EventEmitter,
    HostBinding,
    HostListener
  } from '@angular/core';
  
  @Directive({
    selector: '[long-press]'
  })
  export class LongPress {
    pressing: boolean;
    longPressing: boolean;
    timeout: any;
  
    @Output()
    onLongPress = new EventEmitter();
  
    @HostBinding('class.press')
    get press() { return this.pressing; }
  
    @HostBinding('class.longpress')
    get longPress() { return this.longPressing; }
  
    @HostListener('touchstart', ['$event'])
    @HostListener('mousedown', ['$event'])
    onMouseDown(event) {
      this.pressing = true;
      this.longPressing = false;
      this.timeout = setTimeout(() => {
        this.longPressing = true;
        this.onLongPress.emit(event);
      }, 1500);
    }
  
    @HostListener('touchend')
    @HostListener('mouseup')
    @HostListener('mouseleave')
    endPress() {
      clearTimeout(this.timeout);
      this.longPressing = false;
      this.pressing = false;
    }
  }
  