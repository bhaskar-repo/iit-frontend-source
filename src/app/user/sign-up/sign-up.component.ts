import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterFace } from '../userInterFace';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private firstName: any;
  private lastName: any;
  private email: any;
  private mobileNumber: any;
  private password: any;
  private confirmPassword: any;
  private roleId: any;

  private userRoles = [
    {
      roleId: 1,
      roleName: 'Reporter'
    },
    {
      roleId: 2,
      roleName: 'Assignee'
    }

  ]
  constructor(private user: UserService, private _route: Router, private toastr: ToastrService,
    private _location: Location) {

  }
  ngOnInit() {

  }

  /**
   * @author Bhaskar Pawar
   * @param data
   */
  public signUp = () => {

    let userInfo: UserInterFace = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: (this.mobileNumber == null || this.mobileNumber == undefined) ? 0 : this.mobileNumber,
      userName: this.firstName + ' ' + this.lastName,
      password: this.password,
      roleId: this.roleId
    }


    if (userInfo.password != this.confirmPassword) {
      this.toastr.error('passwords not matching', 'Error');
    }
    else if (userInfo.mobileNumber != 0 && userInfo.mobileNumber < 1000000000) {
      this.toastr.info('mobile number should contain 10 digits ','Info');
    }
    else {
      this.user.signUp(userInfo).subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.toastr.success(`${apiResponse.message}`, 'Success');
          setTimeout(() => {
            this._route.navigate(['/api/v1/users/login']);
          }, 1000);
        }
        else if (apiResponse.status === 403) {
          this.toastr.info(`${apiResponse.message}`, 'Information');
        }
        else {
          this.toastr.error(`${apiResponse.message}`, 'Error');
        }
      })
     
    }
  }//end of sign up

  public goBack = () => {
    this._location.back();
  }

}
