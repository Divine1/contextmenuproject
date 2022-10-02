import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comparisonwindow',
  templateUrl: './comparisonwindow.component.html',
  styleUrls: ['./comparisonwindow.component.scss']
})
export class ComparisonwindowComponent implements OnInit,OnDestroy {


  @Input() position:string;

  @Input() data :any;
  @Input() metadata:any;

  @Output() mergeToOther:any = new EventEmitter();
  
  constructor( ) { }

  ngOnInit(): void {
    
    
  }

  onmouseenter(event:Event,position,item){
    event.stopPropagation();
    
  }
  

  onmouseleave(event:any,position,item){
    console.log("in onmouseleave event ",event.target," position ",position," item ",item);

    
  }

  mergeToOtherFun(item,position){
    console.log("in ComparisonwindowComponent mergeToOtherFun item ",item," position ",position);

    if(item.match){

    }
    else{
      // updating data to the format that has to be merged.
      this.mergeToOther.emit({
        item : {
          key : item.key,
          marked : true,
          match : true,
          order : item.order,
          value : item.value
        },
        position : position
      });
    }
  }

  ngOnDestroy(){
    console.log("in ComparisonwindowComponent ngOnDestroy")
  }
}
