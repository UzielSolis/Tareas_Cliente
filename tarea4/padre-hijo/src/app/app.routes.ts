import { Routes } from '@angular/router';
import { UsersComponent } from './components/paths/users/users.component';
import { UsersListComponent } from './components/paths/users/users-list/users-list.component';
import { UsersDetailsComponent } from './components/paths/users/users-details/users-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: UsersComponent, children: [
        { path: '', component: UsersListComponent },
        { path: ':id', component: UsersDetailsComponent}
    ]}
];
