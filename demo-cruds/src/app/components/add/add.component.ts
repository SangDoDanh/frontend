import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  rfAdd!: FormGroup;
  msg!: string;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.rfAdd = this.fb.group({
      id: [null],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      class_id: ['', Validators.required],
    });
  }

  onSubmit() {
    const s: Student = this.rfAdd.value;
    this.studentService.addStudent(s).subscribe((data) => {
      console.log(data);
      // this.router.navigateByUrl('/list');

      this.msg = `Add ${data.first_name + ' ' + data.last_name}  new OK!`;
    });
  }
}
