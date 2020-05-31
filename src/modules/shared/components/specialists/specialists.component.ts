import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as lodash from 'lodash';

import { Shop, Specialist, SpecialistsService } from './specialists.service';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialistsComponent implements OnInit {

  public specialists: Specialist[] = [];
  public allSpecialists: Specialist[] = [];
  public selectedSpecialist: Specialist = null;
  public shops: Shop[] = [];

  public get unallocatedShops(): Shop[] {
    return this.shops.filter((s) => !s.specialistId);
  };

  public get allowedSpecialists(): Specialist[] {
    return this.allSpecialists.filter((s) => !this.specialists
      .some((spec) => spec.id === s.id));
  };

  constructor(
    private specialistsService: SpecialistsService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.allSpecialists = this.specialistsService.getSpecialists();
    this.shops = this.specialistsService.getShops();
  }

  public createSpecialist(specialist: Specialist): void {
    const spec = {...specialist};
    this.specialists = [...this.specialists, spec];
    this.selectedSpecialist = spec;
  }

  // Todo: Необходимо реализовать хранилище данных и перенести всю логику добавления/удаления туда.
  public addShopToSpecialist(shopId: number): void {
    const shops = lodash.cloneDeep(this.shops);
    const shop = shops.find((s) => s.id === shopId);
    shop.specialistId = this.selectedSpecialist.id;

    const specialists = lodash.cloneDeep(this.specialists);
    const specialist = specialists.find((s) => s.id === this.selectedSpecialist.id);
    specialist.shopIds = [...specialist.shopIds, shopId];

    this.shops = shops;
    this.specialists = specialists;
  }

  public removeSpecialist(specialistId: number): void {
    const specialists = lodash.cloneDeep(this.specialists);
    const shops = lodash.cloneDeep(this.shops);
    const specialist = specialists.find((s) => s.id === specialistId);

    specialist.shopIds.forEach((shopId) => {
      const shop = shops.find((s) => s.id === shopId);
      shop.specialistId = null;
    });
    this.specialists = specialists.filter((s) => s.id !== specialistId);
    this.shops = shops;
    this.selectedSpecialist = this.specialists[0] || null;
  }

  public removeShopFromSpecialist(shopId: number, specialistId: number) {
    const specialists = lodash.cloneDeep(this.specialists);
    const shops = lodash.cloneDeep(this.shops);
    const specialist = specialists.find((s) => s.id === specialistId);

    specialist.shopIds = specialist.shopIds.filter((_shopId) => _shopId !== shopId);
    const shop = shops.find((s) => s.id === shopId);
    shop.specialistId = null;

    this.shops = shops;
    this.specialists = specialists;
  }

  public trackByFn(index, item): number {
    return item.id;
  }
}
