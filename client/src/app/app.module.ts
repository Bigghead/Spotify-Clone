import { SearchKeywordComponent } from './main-container/music-list/search/search-keyword/search-keyword.component';
import { SearchService } from './Services/search.service';
import { SearchTrackComponent } from './main-container/music-list/search/search-track/search-track.component';
import { PlaylistComponent } from './main-container/music-list/playlist/playlist.component';
import { AuthGuard } from './Services/canActivate.service';
import { MusicPlayerService } from './Services/musicPlayer.service';
import { TimeDurationPipe } from './Custom-Pipes/timeDuration.pipe';
import { NewReleasesComponent } from './main-container/music-list/new-releases/new-releases.component';
import { SpotData } from './Services/spotifyData.service';
import { AuthService } from './Services/authentication.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MoodPlaylistComponent } from './main-container/music-list/moods/mood-playlist/mood-playlist.component';
import { SearchComponent } from './main-container/music-list/search/search.component';
import { ArtistInfoComponent } from './main-container/music-list/artist-info/artist-info.component';



const appRoutes: Routes = [

  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: MainContainerComponent, canActivateChild: [AuthGuard], children: [
      {
        path: 'browse', component: MusicListComponent, canActivate: [AuthGuard], children: [
          { path: 'new-releases', component: NewReleasesComponent },
          { path: 'featured', component: FeaturedComponent },
          { path: 'moods', component: MoodsComponent },
        ]
      },

      { path: 'view/:mood',canActivate: [AuthGuard],  component: MoodPlaylistComponent },
      { path: 'artist/:artistId', canActivate: [AuthGuard], component: ArtistInfoComponent },     
      { path: 'search', component: SearchComponent ,canActivate: [AuthGuard] , children: [
        { path: ':searchTerm/track' ,component: SearchTrackComponent },        
        { path: ':searchTerm/:searchType' ,component: SearchKeywordComponent }
      ]}, 
      { path: ':albumOrPlaylist/:albumId/:ownerId', canActivate: [AuthGuard], component: PlaylistComponent },  
      { path: ':albumOrPlaylist/:albumId', canActivate: [AuthGuard], component: PlaylistComponent }
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
    MoodPlaylistComponent,
    SearchComponent,
    SearchKeywordComponent,
    SearchTrackComponent,
    ArtistInfoComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, SpotData, MusicPlayerService, AuthGuard, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
