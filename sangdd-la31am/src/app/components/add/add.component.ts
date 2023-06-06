import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  rfAdd!: FormGroup;
  msg!: string;
  eAdd: Employee ={};

  url ='';


  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.rfAdd = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      sex: ['Male', Validators.required],
      address: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onSubmit() {
    const e: Employee = this.rfAdd.value;
    this.eAdd = e;

    this.setImageMo()
    console.log(this.eAdd);
    this.appService.add(this.eAdd).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('/list');
    });
  }


    setImageMo() {
      this.eAdd.image = this.url;
    }
  setImage(e : any) {
    this.url = '../../../assets/images/' + e.target.files[0].name;        
  }

}
