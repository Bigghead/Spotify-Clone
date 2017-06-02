
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { SidebarComponent } from './main-container/sidebar/sidebar.component';
import { MusicListComponent } from './main-container/music-list/music-list.component';
import { CallbackComponent } from './callback/callback.component';



const appRoutes: Routes = [
 
    { path : '', redirectTo: '/home', pathMatch: 'full'},
    { path : 'home', component: MainContainerComponent},
    { path : 'callback', component: CallbackComponent},
    
    
    
]



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContainerComponent,
    SidebarComponent,
    MusicListComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
