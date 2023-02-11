import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EmployeeService } from '../service/employee.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  employeeForm!: FormGroup;
  Submitted = false;
  employeeobj: any = {};
  paramid: any;


  constructor(private fb: FormBuilder,private service:EmployeeService, private route: ActivatedRoute,
    private router: Router,private modalctrl:ModalController) {
      this.paramid = this.route.snapshot.params['data'];
      console.log(this.paramid)
      if (this.paramid) {
        this.getidEmployee(this.paramid)
      }
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      mobile:['', Validators.required]
    });
  }


  onSubmit() {
    this.Submitted = true
    console.log(this.employeeForm.value);
    if (this.paramid) {
      this.employeeForm.value.id = this.paramid
      this.service.updateEmployee(this.employeeForm.value, this.paramid).subscribe(
        res => {
          console.log(res)
          this.modalctrl.dismiss();
          this.router.navigate(['/']);
        })
    }
    else {
      this.service.createEmployee(this.employeeobj).subscribe(res => {
        console.log(res)
        alert("success fully created")
        this.employeeForm.reset();
        this.modalctrl.dismiss();
      }, err => {
        alert("something worng")
      }
      )
      this.router.navigate(['/'])
    }
  }
  getidEmployee(id: any) {
    this.service.getidEmployee(id).subscribe(
      res => {
        console.log(res)
        this.employeeobj = res
      })
  }

}
