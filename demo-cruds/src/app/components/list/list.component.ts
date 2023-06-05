import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  students: Student[] = [];
  p: number = 1;
  rfSearch!: FormGroup;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.rfSearch = this.fb.group({
      id: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
      gender: [''],
      class_id: [''],
    });

    this.studentService.getAll().subscribe((data) => {
      this.students = data;
    });
  }

  onSubmitSearch() {
    this.studentService
      .searchAllField(this.rfSearch.value)
      .subscribe((data) => {
        this.students = data;
      });
  }
}
