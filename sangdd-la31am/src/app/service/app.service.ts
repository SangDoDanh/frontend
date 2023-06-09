import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

const URL_API = 'http://localhost:3000/employee';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(URL_API + '?_sort=id&_order=desc');
  }

  getById(id: any): Observable<Employee> {
    return this.httpClient.get<Employee>(URL_API + `/${id}`);
  }

  add(e: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(URL_API, e);
  }

  deleteById(id: any): Observable<Employee> {
    return this.httpClient.delete<Employee>(URL_API + `/${id}`);
  }

  update(s: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(URL_API + `/${s.id}`, s);
  }
}
