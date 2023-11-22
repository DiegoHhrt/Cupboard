import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ObjectId } from 'mongodb';
import { Item } from 'src/app/interfaces';

@Component({
  selector: 'shared-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() item!: Item;
  @Output()
  public onToggleEditMode: EventEmitter<boolean> = new EventEmitter();

  public editing: boolean = false;

  constructor() {}

  public toggleEdit = () => (this.editing = !this.editing);
  public deleteItem = () => {}; //TODO: Implement
}
