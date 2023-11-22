import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shared-edit-info-card',
  templateUrl: './edit-info-card.component.html',
  styleUrls: ['./edit-info-card.component.css'],
})
export class EditInfoCardComponent {
  @Output()
  public onToggleEditMode: EventEmitter<boolean> = new EventEmitter();

  public toggleEdit = () => this.onToggleEditMode.emit(false);

  public changeInfo = () => {}; //TODO: Implement
}
