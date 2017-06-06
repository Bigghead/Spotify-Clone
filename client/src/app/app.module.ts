import { NewReleasesComponent } from './main-container/music-list/new-releases/new-releases.component';
import { SpotData } from './Services/spotifyData.service';
import { AuthService } from './Services/authentication.service';

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
import { FeaturedComponent } from './main-container/music-list/featured/featured.component';
import { MoodsComponent } from './main-container/music-list/moods/moods.component';
import { FooterComponent } from './partials/footer/footer.component';
import { PlaylistComponent } from './main-container/playlist/playlist.component';
import { BrowseComponent } from './main-container/music-list/browse/browse.component';



const appRoutes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: MainContainerComponent, children: [
      
      { path: 'browse/new-releases', component: NewReleasesComponent },
      { path: 'browse/featured', component: FeaturedComponent },
      { path: 'browse/moods', component: MoodsComponent },
      { path: 'album/:albumId', component: PlaylistComponent }
      

    ]
  },
  { path: 'callback', component: CallbackComponent },



]



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContainerComponent,
    SidebarComponent,
    MusicListComponent,
    CallbackComponent,
    NewReleasesComponent,
    FeaturedComponent,
    MoodsComponent,
    FooterComponent,
    PlaylistComponent,
    BrowseComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, SpotData],
  bootstrap: [AppComponent]
})
export class AppModule { }
