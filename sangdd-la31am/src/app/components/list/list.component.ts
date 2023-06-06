import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  employees: Employee[] = [];
  p: number = 1;
  selecteds :any[] = [];

  

  constructor(
    private appService: AppService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.appService.getAll().subscribe((data) => {
      this.employees = data;
    });
  }

  addSelectd(id: any) {

    if(this.selecteds.find(selectd => selectd === id)) {
      const index = this.selecteds.indexOf(id);
      this.selecteds.splice(index, 1);
    } else {
      this.selecteds.push(id);
    }
    console.log(this.selecteds);

  }

  deleteMore()  {
    this.selecteds.forEach(id => {
      this.appService.deleteById(id).subscribe(data => {
        this.appService.getAll().subscribe(data => {
          this.employees = data;
        });
      });
    })

    
  }

}
