import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})

export class EditStudentComponent implements OnInit {
  public editForm: FormGroup; //Define FormGroup to student's edit form

  constructor(
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message
  ) { }

  ngOnInit(): void {
    this.updateStudentData();   // Call updateStudentData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    
    this.crudApi.GetStudent(id).subscribe(data => {
      
      const student = {
        ...data
      };
      console.log(student);
      this.editForm.reset({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phoneNumber: student.mobileNumber

      })
    })
  }

  // Accessing form control using getters
  get firstName() {
    return this.editForm.get('firstName');
  }

  get lastName() {
    return this.editForm.get('lastName');
  }

  get email() {
    return this.editForm.get('email');
  }

  get phoneNumber() {
    return this.editForm.get('phoneNumber');
  } 
  
   // Contains Reactive Form logic
   updateStudentData() {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

   // Go back to previous component
   goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm(){
    this.crudApi.UpdateStudent(this.editForm.value);       // Update student data using CRUD API
    this.toastr.success(this.editForm.controls['firstName'].value + ' updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['view-students']);               // Navigate to student's list page when student data is updated
  }

}
