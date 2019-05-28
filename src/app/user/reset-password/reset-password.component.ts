import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material';
import { UserService } from '../user.service';
import { Location } from '@angular/common/';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  private email: String;
  private password: String;
  private confirmPassword: String
  private btnFlg: Boolean;
  @ViewChild('stepper') stepper: MatStepper

  constructor(private _formBuilder: FormBuilder, private _toastr: ToastrService, private _user: UserService,
    private _location: Location) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: [this.email, [Validators.required, Validators.email]]
    });
    this.secondFormGroup = this._formBuilder.group({
      password: [this.password, Validators.required],
      confirmPass: [this.confirmPassword, Validators.required]
    });
  }

  /**
   * @author Bhaskar Pawar
   */
  public checkUserExist = () => {
    this._user.checkUserExist(this.firstFormGroup.get('email').value).subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.stepper.next();
      }
      else {
        this._toastr.error(`${apiResponse.message}`, "Error");
      }
    })
  }

  /**
   * @author Bhaskar Pawar
   */
  public saveNewPassword = () => {
    if (this.secondFormGroup.get('password').value != this.secondFormGroup.get('confirmPass').value) {
      this._toastr.info("Passwords not matching", 'Info');
    }
    else if(!(/^[A-Za-z0-9]\w{7,}$/.test(this.secondFormGroup.get('password').value))) {
      this._toastr.info("Minimum 8 characters which contain only characters,numeric digits, underscore and first character must be a letter", "Info");
    }
    else {
       let data = {
        email: this.firstFormGroup.get('email').value,
        password: this.secondFormGroup.get('password').value
      }
      this._user.resetPassword(data).subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this._toastr.success(`${apiResponse.message}`, "Success");
          this.stepper.next();
        }
        else if (apiResponse.status === 201) {
          this._toastr.info(`${apiResponse.message}`, "Info");
        }
        else {
          this._toastr.error(`${apiResponse.message}`, "Error");
        }
      })
    }
  }//end of save password

  goBack = () => {
    this._location.back();
  }
}
