import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  sEdit: Student = {};
  rfEdit!: FormGroup;

  id: any;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.rfEdit = this.fb.group({
      id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      class_id: ['', Validators.required],
    });
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    });
    this.studentService.getStudentById(this.id).subscribe((data) => {
      this.rfEdit.setValue(data);
    });
  }

  onSubmit() {
    this.sEdit = this.rfEdit.value;
    this.studentService.updateStudent(this.sEdit).subscribe((data) => {
      console.log('update thanh cong', data);
    });
  }
}
