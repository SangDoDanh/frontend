import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent {
  studentDelete: Student = {};

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.studentService.getStudentByID(id).subscribe((data) => {
        this.studentDelete = data;
        console.log(this.studentDelete);
      });
    });
  }

  deleteById(id: any) {
    this.studentService.delete(id).subscribe((data) => {
      console.log('delete', data.first_name);
      this.router.navigateByUrl('/list');
    });
  }

  clickme() {
    console.log('asadada');
  }
}
