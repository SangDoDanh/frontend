import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent {
  sDelte: Student = {};
  rfDelete!: FormGroup;

  id: any;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.rfDelete = this.fb.group({
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
      this.rfDelete.setValue(data);
    });
  }

  onSubmit() {
    this.sDelte = this.rfDelete.value;
    this.studentService.deleteStudentById(this.sDelte.id).subscribe((data) => {
      this.router.navigateByUrl('/list');
    });
  }
}
