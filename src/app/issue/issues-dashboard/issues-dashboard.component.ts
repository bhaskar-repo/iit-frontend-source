import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { IssuesService } from '../issueservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SocketService } from '../socket.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-issues-dashboard',
  templateUrl: './issues-dashboard.component.html',
  styleUrls: ['./issues-dashboard.component.css']
})
export class IssuesDashboardComponent implements OnInit {

  ISSUES: IssuesInterface[] = [
  ]

  displayedColumns: string[] = ['status', 'title', 'reporter', 'date'];
  issues = new MatTableDataSource<IssuesInterface>(this.ISSUES);
  private data: any;
  private searchString: string;
  private userName = Cookie.get('userName');
  private roleId = Cookie.get('roleId');
  private breadcrumb = [{
    link: "/api/v1/issues/all",
    value: "home"
  }]
  private userIssues = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _issueService: IssuesService, private _toastr: ToastrService, private _route: Router
    , private _socketService: SocketService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllIssues();
    this.verifyUserConfirmation();
    this.getAllIssuesByUser();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NotificationDlg, {
      width: '400px',
      data: { issueId: this.data.issueId, title: this.data.title,userName: this.data.userName, auditString:this.data.auditString}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  applyFilter = (filterValue: string): any => {
    this.issues.filter = filterValue.trim().toLowerCase();
  }

  /**
   * fetches issues list from database
   * @author Bhaskar Pawar
   */
  public getAllIssues = () => {
    this._issueService.getAllIssues().subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        let issues = new MatTableDataSource<IssuesInterface>(apiResponse.data);
        this.issues = issues;
        this.issues.sort = this.sort;
        this.issues.paginator = this.paginator;
      }
      else if (apiResponse.status === 201) {
        this._toastr.info(`${apiResponse.message}`, "Info");
      }
      else {
        this._toastr.info(`${apiResponse.message}`, "Error");
      }
    })
  }//end of get all issues

  public getAllIssuesByUser = () => {
    this._issueService.getAllIssuesByUser().subscribe((apiResponse) => {
      this.userIssues = apiResponse.data;
      setTimeout(() => {
        this._socketService.emitUserIssues(this.userIssues);
      },1000)
    })
  }

  public navigateToDescView = (issueId) => {
    this._route.navigate([`/api/v1/issues/`, issueId, 'description']);
  }

  public navigateToSearch = (value) => {
    this._route.navigate(['/api/v1/issues', value, 'search'])
  }

  public verifyUserConfirmation: any = () => {

    this._socketService.verifyUser()
      .subscribe((data) => {
        this._socketService.setUser(Cookie.get('authToken'));
        setTimeout(() => {
          this.onUpdation();
        },1000)
      });
  }

  public onUpdation = (): any => {
    this._socketService.onUpdated().subscribe((data) => {
      this.data = data;
      console.log(this.data);
      this.openDialog();
    })
  }

}

export interface IssuesInterface {
  issueId: String,
  status: string;
  title: string;
  reporter: string;
  createdOn: String;
}

export interface DialogData {
  issueId: string;
  title: string;
  userName: String;
  auditString: String
}

// This class is to open the dialog

@Component({
  selector: 'notification-dialog',
  templateUrl: 'notificationDlg.html',
})
export class NotificationDlg {

  constructor(
    public dialogRef: MatDialogRef<NotificationDlg>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _route: Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public navigateToDescView = (issueId) => {
    this._route.navigate([`/api/v1/issues/`, issueId,'description']);
  }


}