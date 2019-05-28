import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../issueservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ValidationService } from '../validation.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-issue-description',
  templateUrl: './issue-description.component.html',
  styleUrls: ['./issue-description.component.css']
})
export class IssueDescriptionComponent implements OnInit {

  private currentIssue: any;
  private userName = Cookie.get('userName');
  private breadcrumb:any;
  private isFilePresent: Boolean;
  private isComment: Boolean;
  private issueId: any;
  private watchers = [];

  constructor(private _issueService: IssuesService, private _router: ActivatedRoute
    , private _toastr: ToastrService, private _route: Router, private _validation: ValidationService,
    private _socketService: SocketService) { }

  ngOnInit() {
    this.getSingleIssue();
  }

  /**
   * @description This will fetch the issue details based on issueId
   * @author Bhaskar Pawar
   */
  public getSingleIssue = () => {
    let issueId = this._router.snapshot.paramMap.get('issueId');
    this.issueId = issueId;
    this.breadcrumb = [
      {
        link: "/api/v1/issues/all",
        value: "home"
      },
      {
        link: `/api/v1/issues/${issueId}/description`,
        value: "description"
      }
    ]
    this._issueService.getSingleIssue(issueId).subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.currentIssue = apiResponse.data;
        this.isFilePresent = this._validation.checkForNullorEmpty(this.currentIssue.fileLocation);
        this.isComment = this._validation.checkForNullorEmpty(this.currentIssue.comments);
      }
      else if (apiResponse.status === 201) {
        this._toastr.info(`${apiResponse.message}`, "Info");
      }
      else {
        this._toastr.error(`${apiResponse.message},`, "Error");
      }
    })
  }//end of get single issue

  addToWatchersList = (currentData) => {
    let data = {
      issueId: currentData.issueId,
      userId: Cookie.get('userId'),
      userName: Cookie.get('userName'),
      isWatch: true
    }
    this.issueId = currentData.issueId;
    if(currentData.isWatch){
      this._socketService.addToWatchersList(data);
      setTimeout(() => {
        this.onAddWatchersList(this.issueId);
      },500)
    }
    else {
      this._socketService.removeFromWatchersList(data);
      setTimeout(() => {
        this.onRemoveWatchersList(this.issueId);  
      },500)
       
    }
  
  }

  onAddWatchersList = (issueId) => {
    this._socketService.onAddWatchersList(issueId).subscribe((data) => {
      this.currentIssue.watchers = data.watchers;
    })
  }
  
  onRemoveWatchersList = (issueId) => {
    this._socketService.onRemoveWatchersList(issueId).subscribe((data) => {
      this.currentIssue.watchers = data.watchers;
    })
  }

  public navigateToEdit = (issueId) => {
    this._route.navigate(['/api/v1/issues', issueId, 'edit']);
  }

}
