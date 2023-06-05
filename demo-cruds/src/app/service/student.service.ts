import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';

const URL_API = 'http://localhost:3000/students';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(URL_API + '?_sort=id&_order=desc');
  }

  getStudentById(id: any): Observable<Student> {
    return this.httpClient.get<Student>(URL_API + `/${id}`);
  }

  addStudent(s: Student): Observable<Student> {
    return this.httpClient.post<Student>(URL_API, s);
  }

  deleteStudentById(id: any): Observable<Student> {
    return this.httpClient.delete<Student>(URL_API + `/${id}`);
  }

  updateStudent(s: Student): Observable<Student> {
    return this.httpClient.put<Student>(URL_API + `/${s.id}`, s);
  }

  searchByFirstName(fname: string): Observable<Student[]> {
    return this.httpClient.get<Student[]>(
      URL_API + `?first_name_like=${fname}`
    );
  }

  searchAllField(s: Student): Observable<Student[]> {
    console.log(
      URL_API +
        `?id_like=${s.id}` +
        `&first_name_like=${s.first_name}` +
        `&email_like=${s.email}` +
        `&last_name_like=${s.last_name}` +
        `&class_id_like=${s.class_id}` +
        `&gender_like=${s.gender}`
    );
    return this.httpClient.get<Student[]>(
      URL_API +
        `?id_like=${s.id}` +
        `&first_name_like=${s.first_name}` +
        `&email_like=${s.email}` +
        `&last_name_like=${s.last_name}` +
        `&class_id_like=${s.class_id}` +
        `&gender_like=${s.gender}`
    );
  }
}
