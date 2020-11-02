import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ObjectFieldComponent } from './components/object-field/object-field.component';
import { ComponentsComponent } from './objectContainer/components/components.component';
import { ObjectContainerComponent } from './components/object-container/object-container.component';
import { GroceryListComponent } from './components/grocery-list/grocery-list.component';
import { BasketComponent } from './components/basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ObjectFieldComponent,
    ComponentsComponent,
    ObjectContainerComponent,
    GroceryListComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
