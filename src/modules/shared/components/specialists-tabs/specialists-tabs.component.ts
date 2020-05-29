import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shop, Specialist, SpecialistsService } from '../specialists/specialists.service';

@Component({
  selector: 'app-specialists-tabs',
  templateUrl: './specialists-tabs.component.html',
  styleUrls: ['./specialists-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialistsTabsComponent implements OnInit {

  @Input() allowedSpecialists: Specialist[];
  @Input() specialists: Specialist[];
  @Input() get selected(): Specialist | null {
    return this.selectedSpecialist;
  }

  @Output() selectedChange: EventEmitter<Specialist | null> = new EventEmitter<Specialist | null>();
  @Output() onAddMethod: EventEmitter<Specialist> = new EventEmitter<Specialist>();
  @Output() onRemoveMethod: EventEmitter<number> = new EventEmitter<number>();
  @Output() onRemoveShopMethod: EventEmitter<[number, number]> = new EventEmitter<[number, number]>();

  set selected(selected: Specialist | null) {
    this.selectedSpecialist = selected;
    this.selectedChange.emit(this.selectedSpecialist);
  }

  private selectedIndex: number | null = null;
  private selectedSpecialist: Specialist | null;

  constructor(
    private specialistsService: SpecialistsService,
  ) { }

  ngOnInit(): void {
  }

  public trackByFn(index, item): number {
    return Number.isInteger(item) ? item : item.id;
  }

  public getShopById(shopId: number): Shop {
    return this.specialistsService.getShopById(shopId);
  }

  public onAdd(specialist: Specialist): void {
    this.onAddMethod.emit(specialist);
  }

  public onRemove(specialistId: number): void {
    this.onRemoveMethod.emit(specialistId);
  }

  public onRemoveShop(shopId: number, specialistId: number): void {
    this.onRemoveShopMethod.emit([shopId, specialistId]);
  }
}
