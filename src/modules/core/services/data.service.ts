import { Injectable } from '@angular/core';

export interface SpecialistResponse {
  id: number;
  fullName: string;
  logo?: string;
}

export interface ShopResponse {
  id: number;
  name: string;
  fullAddress: string;
}

const MOCK_MODE = true;

const MOCK_SPECIALISTS: SpecialistResponse[] = [
  {
    id: 1,
    fullName: 'Аношкин Станислав Касьянович',
  },
  {
    id: 2,
    fullName: 'Бажанов Вячеслав Ираклиевич',
  },
  {
    id: 3,
    fullName: 'Игумнов Демьян Эмилевич',
  },
  {
    id: 4,
    fullName: 'Качусов Вячеслав Евстафиевич',
  },
  {
    id: 5,
    fullName: 'Ананьев Дмитрий Евстафиевич',
  },
  {
    id: 6,
    fullName: 'Соколова Полина Ильевна',
  },
  {
    id: 7,
    fullName: 'Малыхин Клавдий Святославович',
  }
];

const MOCK_SHOPS: ShopResponse[] = [
  {
    id: 1,
    name: 'Магазин SBS Москва',
    fullAddress: 'Россия, г. Москва, Бутырская 77',
  },
  {
    id: 2,
    name: 'Магазин SBS Санкт-Петербург',
    fullAddress: 'Россия, г. Санкт-Петербург, Бутырская 77',
  },
  {
    id: 3,
    name: 'Магазин SBS Томск',
    fullAddress: 'Россия, г. Томск, Бутырская 77',
  },
  {
    id: 4,
    name: 'Магазин SBS Коломна',
    fullAddress: 'Россия, г. Коломна, Бутырская 77',
  },
  {
    id: 5,
    name: 'Магазин SBS Тверь',
    fullAddress: 'Россия, г. Тверь, Бутырская 77',
  },
  {
    id: 6,
    name: 'Магазин SBS Калуга',
    fullAddress: 'Россия, г. Калуга, Бутырская 77',
  },
  {
    id: 7,
    name: 'Магазин SBS Сыктывкар',
    fullAddress: 'Россия, г. Сыктывкар, Бутырская 77',
  },
  {
    id: 8,
    name: 'Магазин SBS Сочи',
    fullAddress: 'Россия, г. Сочи, Бутырская 77',
  },
  {
    id: 9,
    name: 'Магазин SBS Астана',
    fullAddress: 'Казахстан, г. Астана, Бутырская 77',
  },
  {
    id: 10,
    name: 'Магазин SBS Минск',
    fullAddress: 'Беларусь, г. Минск, Бутырская 77',
  },
];

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public getSpecialists(): SpecialistResponse[] {
    return MOCK_MODE
      ? MOCK_SPECIALISTS
      : []; // Some real data
  }

  public getShops(): ShopResponse[] {
    return MOCK_MODE
      ? MOCK_SHOPS
      : []; // Some real data
  }
}
