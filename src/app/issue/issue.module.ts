import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FileUploadModule } from 'ng2-file-upload';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CustomMaterialCompModule } from '../materialComp';
import { IssuesDashboardComponent, NotificationDlg } from './issues-dashboard/issues-dashboard.component';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { SearchComponent } from './search/search.component';
import { IssuesrouteguardService } from './issuesrouteguard.service';
import { EditIssueComponent } from './edit-issue/edit-issue.component';
import { IssueDescriptionComponent } from './issue-description/issue-description.component';
import { AddCharPipe } from '../shared/pipe/add-char.pipe';

@NgModule({
  declarations: [IssuesDashboardComponent, CreateIssueComponent, SearchComponent, EditIssueComponent, IssueDescriptionComponent, NotificationDlg, AddCharPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialCompModule,
    SharedModule,
    CKEditorModule,
    FileUploadModule,
    RouterModule.forChild([
      { path: 'api/v1/issues/all', component: IssuesDashboardComponent, canActivate: [IssuesrouteguardService] },
      { path: 'api/v1/issues/create', component: CreateIssueComponent, canActivate: [IssuesrouteguardService] },
      { path: 'api/v1/issues/:issueId/description', component: IssueDescriptionComponent, canActivate: [IssuesrouteguardService] },
      { path: 'api/v1/issues/:issueId/edit', component: EditIssueComponent, canActivate: [IssuesrouteguardService] },
      { path: 'api/v1/issues/:searchString/search', component: SearchComponent, canActivate: [IssuesrouteguardService] },

    ])
  ],
  entryComponents: [NotificationDlg],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class IssueModule { }
