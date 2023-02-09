import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { FormPage } from '../form/form.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path:'form/:data',
    component:FormPage
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
