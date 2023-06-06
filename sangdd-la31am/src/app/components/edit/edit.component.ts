import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  eEdit: Employee = {};
  rfEdit!: FormGroup;
  url_image!:string;

  id: any;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.rfEdit = this.fb.group({
      id: [null],
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
      this.rfEdit.setValue(data);
      if(data.image) {
        this.url_image = data.image;
      }
        
    });
  }

  onSubmit() {
    this.eEdit = this.rfEdit.value;
    this.setImageMo();
    this.appService.update(this.eEdit).subscribe((data) => {
      console.log('update thanh cong', data);
      this.router.navigateByUrl('/list');
    });
  }

  setImageMo() {
    this.eEdit.image = this.url_image;
  }

  setImage(e : any) {
    this.url_image = '../../../assets/images/' + e.target.files[0].name;        
  }
}
