import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ListDashboardComponent } from './list-dashboard/list-dashboard.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { ItemCreationComponent } from './item-creation/item-creation.component';
import { EditInfoCardComponent } from './components/edit-info-card/edit-info-card.component';
import { LoadingContentComponent } from './components/loading-content/loading-content.component';

@NgModule({
  declarations: [
    NavMenuComponent,
    SearchComponent,
    ListDashboardComponent,
    CardComponent,
    ItemCreationComponent,
    EditInfoCardComponent,
    LoadingContentComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    NavMenuComponent,
    SearchComponent,
    ListDashboardComponent,
    CardComponent,
    LoadingContentComponent,
  ],
})
export class SharedModule {}
