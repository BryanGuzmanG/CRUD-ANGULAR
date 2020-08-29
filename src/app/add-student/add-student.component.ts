import { Component, OnInit } from '@angular/core';

import { CrudService } from '../services/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  public studentForm: FormGroup;  // Define FormGroup to student's form
  constructor(
    public crudApi: CrudService,   //CRUD API SERVICES
    public fb: FormBuilder,        //FORM BUILDER SERVICE FOR REACTIVE FORMS
    public toastr: ToastrService   // TOASTR SERVICE FOR ALERT MESSAGE
  ) { }

  ngOnInit(): void {
    this.crudApi.GetStudentsList(); // Call GetStudentsList() before main form is being called
    this.studenForm();               // Call student form when component is ready
  }

  // Reactive student form
  studenForm() {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })  
  }

  // Accessing form control using getters
  get firstName() {
    return this.studentForm.get('firstName');
  }

  get lastName() {
    return this.studentForm.get('lastName');
  }  

  get email() {
    return this.studentForm.get('email');
  }

  get phoneNumber() {
    return this.studentForm.get('phoneNumber');
  }

  // Reset student form's values
  ResetForm() {
    this.studentForm.reset();
  }  

  submitStudentData() {
    this.crudApi.AddStudent(this.studentForm.value); // Submit student data using CRUD API
    this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };

}