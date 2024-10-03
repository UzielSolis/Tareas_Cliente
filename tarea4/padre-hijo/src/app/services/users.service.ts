import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Users } from '../types/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Users[]> {
    const url = environment.apiUrl;
    return this.httpClient.get<Users[]>(url);
  }
}
