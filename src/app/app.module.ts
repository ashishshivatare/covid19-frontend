import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppComponent, CityComponent],
  imports: [BrowserModule, FormsModule,HttpClientModule,MatProgressSpinnerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
