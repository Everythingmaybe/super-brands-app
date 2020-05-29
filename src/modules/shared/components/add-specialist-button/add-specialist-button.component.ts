import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Specialist } from '../specialists/specialists.service';

@Component({
  selector: 'app-add-specialist-button',
  templateUrl: './add-specialist-button.component.html',
  styleUrls: ['./add-specialist-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSpecialistButtonComponent implements OnInit {

  @Input() items: Specialist[];
  @Output() onSelectMethod: EventEmitter<Specialist> = new EventEmitter<Specialist>();

  public showingItems: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public showItems(): void {
    if (this.items.length) {
      this.toggleShowingItems(true);
    }
  }

  public toggleShowingItems(showing?: boolean): void {
    if (showing === undefined) {
      this.showingItems = !this.showingItems
    } else {
      this.showingItems = showing;
    }
  }

  public onSelect(item: Specialist): void {
    this.toggleShowingItems(false);
    this.onSelectMethod.emit(item);
  }

}
