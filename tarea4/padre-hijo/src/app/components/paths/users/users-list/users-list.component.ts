import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Users } from '../../../../types/users';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [ NgClass],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {

  @Input() users!: Users[];
  @Input() selectedUserId?: number;
  @Output() selectUser = new EventEmitter<Users>();

  onSelect(users: Users): void {
    this.selectUser.emit(users);
  }

  isSelected(user: Users): boolean {
    return this.selectedUserId === user.id;
  }

}
