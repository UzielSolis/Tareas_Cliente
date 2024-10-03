import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Users } from '../../../types/users';
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet, UsersListComponent, UsersDetailsComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  users: Users[] = [];
  selectedUser?: Users;

  constructor(private usersService: UsersService) { }


  ngOnInit(): void {
    this.usersService.getAll().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: () => {}
    });
  }

  selectUser(user: Users): void {
    this.selectedUser = user;
  }

  clearSelectedUser(): void {
    this.selectedUser = undefined;
  }

}
