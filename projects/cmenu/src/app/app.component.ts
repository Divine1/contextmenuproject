import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cmenu';
  togglecompare:boolean=false;
  toggleCompare(event:any = null){
    console.log("toggleCompare event ",event)
    //if(event)
    this.togglecompare=!this.togglecompare;
  }
  
}
