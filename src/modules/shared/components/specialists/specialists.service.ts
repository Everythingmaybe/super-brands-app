import { Injectable } from '@angular/core';

import { DataService, ShopResponse, SpecialistResponse } from '../../../core/services/data.service';

export interface Specialist extends SpecialistResponse {
  shopIds: number[];
}

export interface Shop extends ShopResponse {
  specialistId: number | null;
}

@Injectable()
export class SpecialistsService {
  private shops: Shop[] = [];

  constructor(
    private dataService: DataService,
  ) { }

  public getSpecialists(): Specialist[] {
    return this.prepareSpecialists(this.dataService.getSpecialists());
  }

  public getShops(): Shop[] {
    this.shops = this.prepareShops(this.dataService.getShops());
    return this.shops;
  }

  public getShopById(shopId: number): Shop | null {
    return this.shops.find((s) => s.id === shopId);
  }

  public prepareSpecialists(specialists: SpecialistResponse[]): Specialist[] {
    return specialists.map((s) => ({
      ...s,
      shopIds: [],
    }));
  }

  public prepareShops(shops: ShopResponse[]): Shop[] {
    return shops.map((s) => ({
      ...s,
      specialistId: null,
    }));
  }
}
