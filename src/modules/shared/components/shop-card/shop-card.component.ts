import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

import { Shop } from '../specialists/specialists.service';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopCardComponent implements OnInit {

  private disabledStatus: boolean = false;

  @Input() shopInfo: Shop;
  @Input() set disabled(status) {
    this.disabledClass = status;
    this.disabledStatus = status;
  };
  @Output() onAddMethod: EventEmitter<number> = new EventEmitter<number>();

  @HostBinding('class.disabled') disabledClass: boolean = this.disabledStatus;

  constructor() { }

  ngOnInit() {}

  public onAdd(): void {
    if (!this.disabledStatus) this.onAddMethod.emit(this.shopInfo.id);
  }

}
