import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { GlobalConfig } from '../globalConfig';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private baseUrl = `${GlobalConfig.url}/api/v1/issues`;

  constructor(private _http: HttpClient) { }

  /**
   * @description requesting to single issue
   * @author Bhaskar Pawar
   */
  public getSingleIssue = (issueId): Observable<any> => {
    return this._http.get(`${this.baseUrl}/${issueId}/${Cookie.get('userId')}/edit?authToken=${Cookie.get('authToken')}`);
  }


  /**
   * @description requesting to all the issues
   * @author Bhaskar Pawar
   */
  public getAllIssues = (): Observable<any> => {
    return this._http.get(`${this.baseUrl}/all?authToken=${Cookie.get('authToken')}`);
  }

  /**
   * @description to get all the issues user is subscribed or part of
   * @author Bhaskar Pawar
   */
  public getAllIssuesByUser = ():Observable<any> => {
    return this._http.get(`${this.baseUrl}/${Cookie.get('userId')}/all?authToken=${Cookie.get('authToken')}`)
  }//end of get all issues by user

  /**
   * uploads the file
   */
  public uploadFile = (data): Observable<any> => {
    return this._http.post(`${this.baseUrl}/upload?authToken=${Cookie.get('authToken')}`, data);
  }//end of upload file

  /**
   * @description loads the initial data to display
   */
  public loadData = (): Observable<any> => {
    return this._http.get(`${this.baseUrl}/load?authToken=${Cookie.get('authToken')}`);
  }//end load creation data

  /**
   * @author Bhaskar Pawar
   * @description creates a new issue
   */
  public createIssue = (data): Observable<any> => {
    let params = new HttpParams()
      .set('title', data.title)
      .set('description', data.description)
      .set('comments', data.comments)
      .set('reporter', data.reporter)
      .set('reporterUserId', data.reporterUserId)
      .set('assignee', data.assignee)
      .set('assigneeName', data.assigneeName)
      .set('status', data.status)
      .set('watchers', data.watchers)
      .set('createdBy', data.createdBy)
      .set('lastUpdateBy', data.lastUpdateBy)
      .set('fileName', data.fileName)
      .set('moduleName', data.moduleName)
      .set('priority', data.priority)
      .set('fileLocation', data.fileLocation)

    return this._http.post(`${this.baseUrl}/create?authToken=${Cookie.get('authToken')}`, params);
  }//end create issue

  /**
   * @author Bhaskar Pawar
   * @description 
   */
  public editIssue = (data, issueId): Observable<any> => {
    let params = new HttpParams()
      .set('title', data.title)
      .set('description', data.description)
      .set('comments', data.comments)
      .set('assignee', data.assignee)
      .set('assigneeName', data.assigneeName)
      .set('isWatch', data.isWatch)
      .set('status', data.status)
      .set('lastUpdateBy', data.lastUpdateBy)
      .set('fileName', data.fileName)
      .set('fileLocation', data.fileLocation)
      .set('moduleName', data.moduleName)
      .set('priority', data.priority)
      .set('oldAssignee', data.oldAssignee)

    return this._http.put(`${this.baseUrl}/${issueId}/edit?authToken=${Cookie.get('authToken')}`, params);
  }//end of edit issue

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
