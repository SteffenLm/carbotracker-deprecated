import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppStateModule } from './app-state.module';

import { RootComponent } from './components/root/root.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [RootComponent, NavigationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    AppStateModule,
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class AppModule {}
