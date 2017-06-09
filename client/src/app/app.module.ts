import { MusicPlayerService } from './Services/musicPlayer.service';
import { TimeDurationPipe } from './Custom-Pipes/timeDuration.pipe';
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
import { PlaylistComponent } from './main-container/music-list/new-releases/playlist/playlist.component';
import { UserPlaylistComponent } from './main-container/music-list/featured/user-playlist/user-playlist.component';
import { MoodPlaylistComponent } from './main-container/music-list/moods/mood-playlist/mood-playlist.component';



const appRoutes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: MainContainerComponent, children: [
      {
        path: 'browse', component: MusicListComponent, children: [
          { path: 'new-releases', component: NewReleasesComponent },
          { path: 'featured', component: FeaturedComponent },
          { path: 'moods', component: MoodsComponent },
        ]
      },

      { path: 'view/:mood', component: MoodPlaylistComponent },      
      { path: ':albumOrPlaylist/:albumId', component: PlaylistComponent }
      // { path: ':playlist/:albumId', component: PlaylistComponent },



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
    TimeDurationPipe,
    UserPlaylistComponent,
    MoodPlaylistComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, SpotData, MusicPlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
