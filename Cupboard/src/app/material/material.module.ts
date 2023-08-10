import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    // MatInputModule,
    MatCardModule,
  ],
})
export class MaterialModule {}
