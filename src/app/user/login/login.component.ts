import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email: String;
  private password: String;
  
  constructor(private user: UserService, private _route: Router, private toastr: ToastrService,
    private dialog: MatDialog) { }

    openDialog(event) {
      
      const dialogRef = this.dialog.open(TermsDialog, {
        width: '250px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

  ngOnInit() {
  }

  /**
   * @author Bhaskar Pawar
   */
  public logIn = () => {
    let data = {
      email: this.email,
      password: this.password
    }

    this.user.logInFunction(data).subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        //setting cookies and localstorage so that can be accessed whenever required
        Cookie.set('authToken', apiResponse.data.authToken);
        Cookie.set('userId', apiResponse.data.userDetails.userId);
        Cookie.set('roleId', apiResponse.data.userDetails.roleId);
        Cookie.set('userName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
        this.user.setToLocalStorage(apiResponse.data.userDetails);
        this.toastr.success(`${apiResponse.message}`, 'Success');

        setTimeout(() => {
          this._route.navigate(['/api/v1/issues/all']);
        }, 1000)
      }
      else if (apiResponse.status === 201) {
        this.toastr.info(`${apiResponse.message}`, 'Information');
      }
      else {
        this.toastr.error(`${apiResponse.message}`, 'Error');
      }
    })
  }

}

@Component({
  selector: 'terms-dialog',
  templateUrl: 'terms-dialog.html',
})
export class TermsDialog { }
