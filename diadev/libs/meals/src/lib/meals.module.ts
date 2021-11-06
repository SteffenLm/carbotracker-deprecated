import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsStateModule } from './meals-state.module';

@NgModule({
  imports: [CommonModule, MealsStateModule],
})
export class MealsModule {}
