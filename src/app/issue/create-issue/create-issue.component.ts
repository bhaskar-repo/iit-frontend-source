import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IssuesService } from '../issueservice.service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { GlobalConfig } from 'src/app/globalConfig';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {

  private userId: any;

  private moduleName: any
  private issueStatus: any;
  private title: any;
  private description: any = ' ';
  private allStatus = ['backlog', 'in-progress', 'in-test', 'done'];
  private priorities = ['Critical', 'Important', 'Incidental', 'Moderate']
  private priority: any;
  private assignees = [];
  private comments: any;
  private fileName: any;
  private fileLocation: any;
  public editor = DecoupledEditor;
  public assigneeName: String;
  public data = new FormData();
  private userName = Cookie.get('userName');
  private breadcrumb = [
    {
      link: "/api/v1/issues/all",
      value: "home"
    },
    {
      link: `/api/v1/issues/create`,
      value: "create"
    }
  ]
  attchMentList: any = [];
  uploader: FileUploader = new FileUploader({ url: `${GlobalConfig.url}/api/v1/issues/upload?authToken=${Cookie.get('authToken')}` });

  private modules = ['MODULE 1','MODULE 2'];

  constructor(private _issueService: IssuesService, private _toastr: ToastrService, private _route: Router, private _detector: ChangeDetectorRef) {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any): any => {
      let fileData = JSON.parse(response);
      this.fileLocation = fileData.data.fileLocation;
      this.fileName = fileData.data.fileName;
    }
  }

  ngOnInit() {
    this.loadCreationData();
  }

  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item => {
      item.withCredentials = false;
    });
  }

  onChange = (assignee) => {
    this.assigneeName = assignee.userName;
  }

  //ckeditor initialization
  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    )
  }

  /**
   * @author Bhaskar Pawar
   * @description loads initial data
   */
  public loadCreationData = () => {
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
   * @author Bhaskar Pawar
   * @description This is to create a new issue and save to the database
   */
  public saveIssuesData = (fileName, fileLocation) => {
    let data = {
      title: this.title,
      description: this.description,
      comments: this.comments,
      reporter: Cookie.get('userName'),
      reporterUserId: Cookie.get('userId'),
      assignee: this.userId,
      assigneeName: this.assigneeName,
      status: this.issueStatus,
      priority: this.priority,
      createdBy: Cookie.get('userId'),
      createdOn: Date.now(),
      lastUpdateBy: Cookie.get('userId'),
      lastUpdatedOn: Date.now(),
      fileName: fileName,
      fileLocation: fileLocation,
      moduleName: this.moduleName
    }
    this._issueService.createIssue(data).subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this._toastr.success(`${apiResponse.message}`, "Success");
        setTimeout(() => {
          this._route.navigate(['/api/v1/issues/all']);
        }, 1000);
      }
      else if (apiResponse.status === 201) {
        this._toastr.info(`${apiResponse.message}`, "Info");
      }
      else {
        this._toastr.error(`${apiResponse.messsage}`, "Error");
      }
    })
  }//end of save issues data

  public createNewIssue = () => {
    this.saveIssuesData(this.fileName, this.fileLocation);

  }

}
