import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ComparisonwindowComponent } from './workspace/comparisonwindow/comparisonwindow.component';
import { MergeindicatorDirective } from './workspace/comparisonwindow/mergeindicator.directive';

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    ComparisonwindowComponent,
    MergeindicatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
