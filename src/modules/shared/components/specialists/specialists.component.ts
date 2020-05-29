import { Component, OnInit } from '@angular/core';
import { Shop, Specialist, SpecialistsService } from './specialists.service';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.scss']
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
    const shop = this.shops.find((s) => s.id === shopId);
    shop.specialistId = this.selectedSpecialist.id;

    const specialist = this.specialists.find((s) => s.id === this.selectedSpecialist.id);
    specialist.shopIds = [...specialist.shopIds, shopId];

    this.shops = [ ...this.shops ];
    this.specialists = [ ...this.specialists ];
  }

  public removeSpecialist(specialistId: number): void {
    const specialist = this.specialists.find((s) => s.id === specialistId);
    specialist.shopIds.forEach((shopId) => {
      const shop = this.shops.find((s) => s.id === shopId);
      shop.specialistId = null;
    });
    this.specialists = this.specialists.filter((s) => s.id !== specialistId);
    this.shops = [ ...this.shops ];
    this.selectedSpecialist = this.specialists[0] || null;
  }

  public removeShopFromSpecialist(shopId: number, specialistId: number) {
    const specialist = this.specialists.find((s) => s.id === specialistId);
    specialist.shopIds = specialist.shopIds.filter((_shopId) => _shopId !== shopId);
    const shop = this.shops.find((s) => s.id === shopId);
    shop.specialistId = null;

    this.shops = [ ...this.shops ];
    this.specialists = [ ...this.specialists ];
  }

  public trackByFn(index, item): number {
    return item.id;
  }
}
