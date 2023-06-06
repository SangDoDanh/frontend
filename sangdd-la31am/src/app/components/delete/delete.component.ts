import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  eDelte: Employee = {};
  rfDelete!: FormGroup;

  id: any;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.rfDelete = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      image: ['', Validators.required],
    });
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    });
    this.appService.getById(this.id).subscribe((data) => {
      this.eDelte = data;
      this.rfDelete.setValue(data);
    });
  }

  onSubmit() {
    this.eDelte = this.rfDelete.value;
    this.appService.deleteById(this.eDelte.id).subscribe((data) => {
      this.router.navigateByUrl('/list');
      console.log('removed', data);
    });
  }
}
