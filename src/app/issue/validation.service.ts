import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public checkForNullorEmpty = (data):any => {
    if (data === undefined || data === null || data.length === 0 || data === "undefined" || data === '') {
      return false; 
    }
    return true;
  }

  public checkForChanges = (oldObj, newObj, assigneeName, fileLocation) => {
    let auditString = '';

    if (oldObj.title !== newObj.title) {
      auditString = auditString + 'title,';
    }
    if (oldObj.status !== newObj.status) {
      auditString = auditString + 'status,';
    }
    if (assigneeName !== newObj.userName) {
      auditString = auditString + 'assignee,';
    }
    if (oldObj.moduleName !== newObj.moduleName) {
      auditString = auditString + 'moduleName,';
    }
    if(oldObj.priority !== newObj.priority) {
      auditString = auditString + 'Priority,';
    }
    if(oldObj.comments !== newObj.comments) {
      auditString = auditString + 'Comments,';
    }
    if (oldObj.description !== newObj.description) {
      auditString = auditString + 'Description,';
    }
    if((fileLocation === undefined || oldObj.fileLocation === fileLocation)){
      auditString = auditString;
    }
    else {
      auditString = auditString + 'fileLocation,';
    }

    return auditString;
   
  }

}
