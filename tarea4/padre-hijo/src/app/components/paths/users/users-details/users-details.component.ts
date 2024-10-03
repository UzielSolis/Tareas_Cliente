import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Users } from '../../../../types/users';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [ NgClass, NgIf],
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.scss'
})
export class UsersDetailsComponent {

  @Input() users?: Users;
  @Output() clearUsers = new EventEmitter<void>();

  onClear(): void {
    this.clearUsers.emit();
  }

}
