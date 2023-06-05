import { Component } from '@angular/core';
import { Student } from '../model/student';
import { StudentService } from '../service/student.service';
import { Class } from '../model/class';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  studentList: Student[] = [];
  classList: Class[] = [];
  p: number = 1;
  searchName = '';

  constructor(private studentService: StudentService) {
    this.studentService.getAll().subscribe((data) => {
      this.studentList = data;
    });
    this.studentService.getAllClass().subscribe((data) => {
      this.classList = data;
    });
  }

  getClassName(id: any) {
    let calssname = 'no Class';
    this.classList.forEach((c) => {
      console.log('aaa');
      if (c.id == id && c.name) calssname = c.name;
    });
    return calssname;
  }

  search() {
    this.studentService.search(this.searchName).subscribe((data) => {
      this.studentList = data;
    });
  }
}
