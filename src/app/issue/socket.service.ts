import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { GlobalConfig } from '../globalConfig';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpErrorResponse } from "@angular/common/http";
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = `${GlobalConfig.url}`;

  private socket;
  private descSocket;
  private dashBoardSocket;
  constructor() {
    this.socket = io(this.url);
  }

  // events to be listened 

  public verifyUser = () => {

    return Observable.create((observer) => {

      this.socket.on('verify-user', (data) => {

        observer.next(data);

      }); // end Socket

    }); // end Observable

  } // end verifyUser

  public addToWatchersList = (data) => {
    this.socket.emit('add-to-watchers', data);
  }

  public removeFromWatchersList = (data) => {
    this.socket.emit('remove-from-watchers', data);
  }

  public emitUserIssues = (data) => {
    this.socket.emit('users-issues', data);
  }

  public leaveThisRoom = (issueId) => {
    this.socket.emit('leave-this-room' , issueId);
  }
  // events to be emitted

  public setUser = (authToken) => {

    this.socket.emit("set-user", authToken);

  } // end setUser

  public update = (data) => {
    this.socket.emit('update-issue', data);
  }

  //on updation server will emit the event
  public onUpdated = () => {
    return Observable.create((observer) => {
      this.socket.on('updated', (data) => {
        observer.next(data);
      })
    })
  }

  public onAddWatchersList = (issueId) => {
    this.descSocket = io(`${GlobalConfig.url}/api/v1/issues/${issueId}/description`);
    return Observable.create((observer) => {
      this.descSocket.on('watchers-list', (data) => {
        observer.next(data);
      })
    })
  }

  public onRemoveWatchersList = (issueId) => {
    this.descSocket = io(`${GlobalConfig.url}/api/v1/issues/${issueId}/description`);
    return Observable.create((observer) => {
      this.descSocket.on('removed-watcher', (data) => {
        observer.next(data);
      })
    })
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
