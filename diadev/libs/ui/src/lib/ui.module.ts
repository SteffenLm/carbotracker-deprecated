import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiMaterialModule } from './ui.material.module';

import { FabIconButtonComponent } from './fab-icon-button/fab-icon-button.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [CommonModule, UiMaterialModule, RouterModule],
  declarations: [FabIconButtonComponent, ToolbarComponent],
  exports: [FabIconButtonComponent, ToolbarComponent],
})
export class UiModule {}
