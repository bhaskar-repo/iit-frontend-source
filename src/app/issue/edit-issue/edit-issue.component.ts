import { Component, OnInit } from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { IssuesService } from '../issueservice.service';
import { SocketService } from '../socket.service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { GlobalConfig } from 'src/app/globalConfig';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css']
})
export class EditIssueComponent implements OnInit {

  private currentIssue: any;
  private fileName: any;
  private allStatus = ['backlog', 'in-progress', 'in-test', 'done'];
  private priorities = ['Critical', 'Important', 'Incidental', 'Moderate']
  private assignees = [];
  private attchMentList = [];
  public editor = DecoupledEditor;
  public data = new FormData();
  private fileLocation: any;
  private userName = Cookie.get('userName');
  private breadcrumb = [];
  private oldAssignee: any;
  private assigneeName: String;
  private userIssues = [];
  private oldValues: any;
  private auditString: any;

  uploader: FileUploader = new FileUploader({ url: `${GlobalConfig.url}/api/v1/issues/upload?authToken=${Cookie.get('authToken')}` });


  private modules = ['MODULE 1', 'MODULE 2'];

  constructor(private _issueService: IssuesService, private _toastr: ToastrService, private _route: Router,
    private _param: ActivatedRoute, private _socketService: SocketService, private _validationService: ValidationService) {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any): any => {
      let fileData = JSON.parse(response);
      this.fileLocation = fileData.data.fileLocation;
      this.fileName = fileData.data.fileName;
    }
  }

  ngOnInit() {
    this.loadUpdationData();
    this.getSingleIssue();
  }

  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item => {
      item.withCredentials = false;
    });
  }

  //ck editor initialization
  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    )
  }

  public onChange = (event) => {
    let file = <File>event.target.files[0];
    this.data.append('file', file, file.name);
  }

  onChangeAssignee = (assignee) => {
    this.assigneeName = assignee.userName;
  }
  /**
   * @author Bhaskar Pawar
   * @description loads initial data
   */
  public loadUpdationData = () => {
    this._issueService.loadData().subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.assignees = apiResponse.data;
      }
      else if (apiResponse.status === 201) {
        this._toastr.info(`${apiResponse.message}`, "Info");
      }
      else {
        this._toastr.error(`${apiResponse.message}`, "Error");
      }
    })
  }// end of loadCreationData

  /**
   * @description This will fetch the selected issue information
   * @author Bhaskar Pawar
   */
  public getSingleIssue = () => {
    let issueId = this._param.snapshot.paramMap.get('issueId');
    this.breadcrumb = [
      {
        link: "/api/v1/issues/all",
        value: "home"
      },
      {
        link: `/api/v1/issues/${issueId}/edit`,
        value: "edit"
      }
    ]

    this._issueService.getSingleIssue(issueId).subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.oldValues = {
          title: apiResponse.data.title,
          userName: apiResponse.data.userName,
          status: apiResponse.data.status,
          moduleName: apiResponse.data.moduleName,
          priority: apiResponse.data.priority,
          comments: apiResponse.data.comments,
          description: apiResponse.data.description,
          fileLocation: apiResponse.data.fileLocation
        }
        this.oldAssignee = apiResponse.data.assignee;
        this.currentIssue = apiResponse.data;

      }
      else {
        this._toastr.error(`${apiResponse.message}`, "Error");
      }
    })

  }//end of single issue

  /**'
   * @description This is to edit a issue and save to the database
   * @author Bhaskar Pawar
   */
  public editIssuesData = (fileName, fileLocation) => {
    let issueId = this._param.snapshot.paramMap.get('issueId');
    let isWatch = true;
    if (this.assigneeName === undefined) {
      this.assigneeName = this.currentIssue.userName;
      isWatch = this.currentIssue.isWatch;
    }
    else {
      isWatch = false;
      setTimeout(() => {
        this._socketService.leaveThisRoom(issueId);
      })
    }
    let data = {
      title: this.currentIssue.title,
      description: this.currentIssue.description,
      comments: this.currentIssue.comments,
      assignee: this.currentIssue.assignee,
      assigneeName: this.assigneeName,
      status: this.currentIssue.status,
      lastUpdateBy: Cookie.get('userId'),
      fileName: fileName,
      fileLocation: fileLocation,
      moduleName: this.currentIssue.moduleName,
      priority: this.currentIssue.priority,
      oldAssignee: this.oldAssignee,
      isWatch: isWatch
    }
    this.auditString = this._validationService.checkForChanges(this.oldValues, this.currentIssue, this.assigneeName, fileLocation);
    if (this.auditString === '') {
      this._toastr.info('you have nothing to save !', 'Info');
    }
    else {
      this._issueService.editIssue(data, issueId).subscribe((apiResponse) => {
        if (apiResponse.status === 200) {

          this._toastr.success(`${apiResponse.message}`, "Success");
          setTimeout(() => {
            this._route.navigate(['/api/v1/issues/all']);
          }, 1000);
          let issueData = {
            userId: Cookie.get('userId'),
            issueId: issueId,
            title: data.title,
            userName: Cookie.get('userName'),
            auditString: this.auditString
          }
          setTimeout(() => {
            this._socketService.update(issueData);
          }, 1000)

        }
        else if (apiResponse.status === 201) {
          this._toastr.info(`${apiResponse.message}`, "Info");
        }
        else {
          this._toastr.error(`${apiResponse.messsage}`, "Error");
        }
      })

    }

  }//end of save edited issues data

  /**
   * @author Bhaskar Pawar
   * @description to update the issue information
   */
  public editIssue = () => {

    this.editIssuesData(this.fileName, this.fileLocation);

  }


}
