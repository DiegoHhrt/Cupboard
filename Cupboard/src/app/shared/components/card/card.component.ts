import { Component, Input } from '@angular/core';
import { Item } from 'src/app/interfaces';

@Component({
  selector: 'shared-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() item!: Item;
  constructor() {}

  public toggleEdit = () => {}; //TODO: Implement
  public deleteItem = () => {}; //TODO: Implement
}
