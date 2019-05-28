import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() breadcrumb: any;
  @Input() userName: any;

  constructor(private toastr: ToastrService, private _route: Router, private user: UserService) { }

  ngOnInit() {
  }

  /**
   * @author Bhaskar Pawar
   * logs out the user from system and delete the cookies and localstorage
   */
  public logOut = () => {
    let userId = Cookie.get('userId');
    this.user.logOut(userId).subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.success(`${apiResponse.message}`, 'Success');
        Cookie.delete('userId');
        Cookie.delete('authToken');
        Cookie.delete('userName');
        localStorage.removeItem('userInfo');

        setTimeout(() => {
          this._route.navigate(['/api/v1/users/login']);
        }, 1000)
      }
      else {
        this.toastr.error(`${apiResponse.message}`, 'Error');
      }
    })
  }//end of log out

}
