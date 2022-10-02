import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMergeindicator]'
})
export class MergeindicatorDirective implements OnInit{


  @Input("appMergeindicator") indicatorLabel : any;

  constructor(private elRef : ElementRef, private renderer : Renderer2) { 
    
  }

  ngOnInit(){

    console.log("indicatorLabel ",this.indicatorLabel)
    this.renderer.setStyle(this.elRef.nativeElement,"background-color","red");
  }

  @HostListener("mouseenter") mouseover(eventData : any){
    console.log("mouseover eventData ",eventData)
  }

  @HostListener("mouseleave") mouseleave(eventData : any){
    console.log("mouseleave eventData ",eventData)
  }

}