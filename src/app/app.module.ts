import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { AccordionComponent } from './accordion/accordion.component';
import { ComponentLoaderDirective } from './accordion/component-loader.directive';
import { ComponentLoaderService } from './accordion/component-loader.service';
import { OrderSpecsComponent } from './order-specs/order-specs.component';
import { SupplyingComponent } from './supplying/supplying.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionRef } from './accordion/accordion-ref';

@NgModule({
  imports:      [ BrowserModule, FormsModule, MatExpansionModule, BrowserAnimationsModule ],
  declarations: [ AppComponent, HelloComponent, AccordionComponent, ComponentLoaderDirective, OrderSpecsComponent, SupplyingComponent ],
  bootstrap:    [ AppComponent ],
  entryComponents: [ OrderSpecsComponent, SupplyingComponent, AccordionComponent],
  providers: [ComponentLoaderService, AccordionRef]
})
export class AppModule { }
