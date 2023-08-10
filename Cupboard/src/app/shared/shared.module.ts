import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ListDashboardComponent } from './list-dashboard/list-dashboard.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    NavMenuComponent,
    SearchComponent,
    ListDashboardComponent,
    CardComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    NavMenuComponent,
    SearchComponent,
    ListDashboardComponent,
    CardComponent,
  ],
})
export class SharedModule {}
