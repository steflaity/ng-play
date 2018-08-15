import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'


import { AppComponent } from './components'
import { GoogleChartDirective } from './directives'


@NgModule({
  declarations: [
    AppComponent,
    GoogleChartDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
