import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { JoinCreateComponent } from './pages/join-create/join-create.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'join-create',
    component: JoinCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseholdRoutingModule {}
