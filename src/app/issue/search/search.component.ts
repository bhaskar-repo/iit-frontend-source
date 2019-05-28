import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { IssuesService } from '../issueservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  ISSUES: IssuesInterface[] = [
  ]

  displayedColumns: string[] = ['status', 'title', 'reporter', 'date'];
  issues = new MatTableDataSource<IssuesInterface>(this.ISSUES);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _issueService: IssuesService, private _toastr: ToastrService, private _router: ActivatedRoute,
    private _route: Router) { }

  ngOnInit() {
    let searchString = this._router.snapshot.paramMap.get('searchString');
    this.getAllIssues(searchString);
  }

  /**
   * fetches issues list from database
   * @author Bhaskar Pawar
   */
  public getAllIssues = (searchString) => {
    this._issueService.getAllIssues().subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        let issues = new MatTableDataSource<IssuesInterface>(apiResponse.data);
        this.issues = issues;
        this.issues.sort = this.sort;
        this.issues.paginator = this.paginator;
        this.issues.filter = searchString.trim().toLowerCase();
      }
      else if (apiResponse.status === 201) {
        this._toastr.info(`${apiResponse.message}`, "Info");
      }
      else {
        this._toastr.info(`${apiResponse.message}`, "Error");
      }
    })
  }//end of get all issues

  public navigateToDescView = (issue) => {
    this._route.navigate([`/api/v1/issues/`, issue.issueId, 'description']);
  }


}

export interface IssuesInterface {
  issueId: String,
  status: string;
  title: string;
  reporter: string;
  createdOn: String;
}
