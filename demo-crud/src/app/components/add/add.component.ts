import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  rfAdd: FormGroup | undefined;

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.rfAdd = this.fb.group({
      id: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
      class_id: [''],
      gender: [[]],
    });
  }

  onSubmit() {
    this.studentService.add(this.rfAdd?.value).subscribe((data) => {
      console.log(data);
    });
  }
}
