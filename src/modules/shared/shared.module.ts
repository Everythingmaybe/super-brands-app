import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopCardComponent } from './components/shop-card/shop-card.component';
import { SpecialistsComponent } from './components/specialists/specialists.component';
import { SpecialistsService } from './components/specialists/specialists.service';
import { SpecialistsTabsComponent } from './components/specialists-tabs/specialists-tabs.component';

const components = [
  ShopCardComponent,
  SpecialistsComponent,
  SpecialistsTabsComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule
  ],
  providers: [
    SpecialistsService,
  ],
})
export class SharedModule { }
