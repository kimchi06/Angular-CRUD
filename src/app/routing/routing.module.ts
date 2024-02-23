import { NgModule } from '@angular/core';
import { PigAddComponent } from '../pig-add/pig-add.component';
import { RouterModule, Routes } from '@angular/router';
import { PigComponent } from '../pig/pig.component';
import { PigModifyComponent } from '../pig-modify/pig-modify.component';
import { PigResolver } from '../pig.resolver';

const appRoutes: Routes = [
  { path: '', component: PigComponent, resolve: { resolverData: PigResolver } },
  { path: 'add', component: PigAddComponent, resolve: { resolverData: PigResolver } },
  { path: 'modify/:key', component: PigModifyComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class RoutingModule { }
