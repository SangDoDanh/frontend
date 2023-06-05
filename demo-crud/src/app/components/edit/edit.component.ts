import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  studentEdit: Student = {};

  rfEdit!: FormGroup;

  onSubmit() {
    this.studentEdit = this.rfEdit.value;
    this.studentService.update(this.studentEdit).subscribe((data) => {
      console.log('edit ok');
      this.router.navigateByUrl('/list');
    });
  }

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.rfEdit = this.fb.group({
        id: [''],
        first_name: [''],
        last_name: [''],
        email: [''],
        gender: [''],
        class_id: [''],
      });

      const id = params['id'];
      this.studentService.getStudentByID(id).subscribe((data) => {
        this.studentEdit = data;
        console.log(data);
        this.rfEdit.setValue(data);
        console.log(this.rfEdit.value);
      });
    });
  }
}
