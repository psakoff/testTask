import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {BsDropdownModule, TabsModule} from "ngx-bootstrap";
import { ModalModule } from 'ngx-bootstrap/modal';
import {HttpService} from "./services/http.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({

  declarations: [
    AppComponent,
    PageComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
