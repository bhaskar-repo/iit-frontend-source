import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomMaterialCompModule } from '../materialComp';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialCompModule
  ],
  exports: [HeaderComponent]
})
export class SharedModule { }
