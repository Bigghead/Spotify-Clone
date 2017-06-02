import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { SidebarComponent } from './main-container/sidebar/sidebar.component';
import { MusicListComponent } from './main-container/music-list/music-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContainerComponent,
    SidebarComponent,
    MusicListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
