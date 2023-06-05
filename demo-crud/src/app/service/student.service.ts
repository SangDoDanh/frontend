import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { Class } from '../model/class';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}

  search(name: any): Observable<Student[]> {
    return this.httpClient.get<Student[]>(
      'http://localhost:3000/students?first_name_like=' + name
    );
  }

  getAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>('http://localhost:3000/students');
  }

  getAllClass(): Observable<Class[]> {
    return this.httpClient.get<Class[]>('http://localhost:3000/classs');
  }

  add(s: Student): Observable<Student> {
    return this.httpClient.post('http://localhost:3000/students', s);
  }

  getStudentByID(id: any): Observable<Student> {
    return this.httpClient.get<Student>('http://localhost:3000/students/' + id);
  }

  delete(id: any): Observable<Student> {
    return this.httpClient.delete<Student>(
      'http://localhost:3000/students/' + id
    );
  }

  update(s: Student): Observable<Student> {
    return this.httpClient.patch<Student>(
      'http://localhost:3000/students/' + s.id,
      s
    );
  }
}
