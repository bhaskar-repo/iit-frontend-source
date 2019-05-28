import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { GlobalConfig } from '../globalConfig';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${GlobalConfig.url}/api/v1/users`;

  constructor(private http: HttpClient) { }

  /**
   * This is to save user information to server DB
   * @author Bhaskar Pawar
   * @param data 
   */
  public signUp = (data): Observable<any> => {

    let params = new HttpParams()
    .set('firstName', data.firstName)
    .set('lastName', data.lastName)
    .set('email', data.email)
    .set('mobileNumber', data.mobileNumber)
    .set('roleId', data.roleId)
    .set('password', data.password)
    .set('userName', data.userName)

    return this.http.post(`${this.baseUrl}/signup`, params);
  }//end of sign up function

  /**
   * user log in function
   * @author Bhaskar Pawar
   * @param datas
   */
  public logInFunction = (data): Observable<any> => {

    let params = new HttpParams()
    .set('email', data.email)
    .set('password', data.password)

    return this.http.post(`${this.baseUrl}/login`, params);
  }//end of login function

  /**
   * @author Bhaskar Pawar
   * Temporary user information storage
   */
  public setToLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }// end of setLocalStorage 

  /**
   * @author Bhaskar Pawar
   */
  public getFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }//end of getFromLocalStorage

  /** 
   * This will delete the temporary data also remove authToken from server
   * @author Bhaskar Pawar
   * @param userId
  */
  public logOut = (userId): Observable<any> => {

    let params = new HttpParams()
    .set('userId',userId)

    return this.http.post(`${this.baseUrl}/logout`, params);
  }//end of log out

  /**
   * @author Bhaskar Pawar
   * @param email
   */
  public checkUserExist = (email):Observable<any> => {
    return this.http.get(`${this.baseUrl}/reset?email=${email}`);
  }// end of check user list

  public resetPassword = (data): Observable<any> => {
    const params = new HttpParams()
    .set('email', data.email)
    .set('password', data.password)

    return this.http.post(`${this.baseUrl}/reset`,params);
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError

  

}

