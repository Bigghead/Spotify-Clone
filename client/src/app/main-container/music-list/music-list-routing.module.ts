import { NewReleasesComponent } from './new-releases/new-releases.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [
  {path: 'new-releases', component: NewReleasesComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ]
})

export class MusicListRoutingModule{

}