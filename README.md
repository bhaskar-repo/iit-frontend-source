# Issue Tracking Tool

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## running locally
 
 1. create new folder in your system
 2. open that folder in cmd or linux terminal and execute following commands in sequence.
 
 ```
 > git init
 > git remote add origin https://github.com/bhaskar-repo/iit-frontend-source.git
 > git pull origin master
 > npm install
 ```
 above commands will pull project to your newly created folder. and npm install will add project dependencies.
```
 > ng serve --open
```

### More About Application
Project Description: 

- This Project includes bunch of functinalities that i could think of.
- 1 -> LogIn
	1.1 -> Here I have followed the same approach that have been taught
	1.2 -> Field Validations, password, user existence,token generation and saving it to the cookie.

  2 -> Signup 
 	2.1 -> again field validations like password,user existence, encryption of password etc
	2.2 -> Upon Sign up user will be redirected to dashboard view.

  3  -> Dashboard
	3.1 -> Here all the issues are listed in table with filter,search and pagination
	3.2 -> on clik of row or issue title link user will be forwarded to the description of that issue.
	3.3 -> table shows the fields like status,title,date etc
  
  4  -> Description 
	4.1 -> Individual issue description is shown with all the details including title,assignee,reporter,start date etc
	4.2 -> here i have added some extra fields like priority and module.

  5  -> create
	5.1 -> only reporter can create the issue assignee can only edit
	5.2 -> here file upload is not mandatory 
	
  6  -> Edit 
	6.1 -> anybody including assignee and reporter can edit the issue
	6.2 -> assignee can assign same issue to any othe assignee

 Extra Points Added: 

	- In description view i have added slide toggle on toggling user will join that room or leave the room
	- i have done some experiment its not working perfect but as expected please try toggling multiple times
	- some extra fields added throughout the application.
	- reset password functinality is added kindly check that also.
	- there more many points added like file upload and download.
	- added jsdoc for almost all the methods.

 Technologies Used:
	
	- Angular + Angular Material design for front end
	- Express, Node for backend
	- multer library for uploading files
	- ckeditor library for formatting options
	
 Project structure - 
	- i have followed all the standard structure in Angular,Node JS and for models.

 important points:
	- I am using database for storing a secret key you need to add a one entry for {secretKey: value} in globalconfigs.
	- I have used material design so that i could not add that much responsiveness due to deadline rather focused on functinalities.
	- I am not using local storage to upload the files i am using amazon s3 .so that can be downloaded easily
	- In order to aassign or create issue you must add some assignee and reporters.

points to be noticed
	- reset password functionality 
	- joining and leaving the room on description view
	- on edit of issue all users who are part of that issue will be notified what has changed again this
	  try editing from all the ends to reflect this.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Authors

* **Bhaskar Pawar** - *Initial work* - [bhaskarpawar](https://github.com/bhaskar-repo)
* **Edwisor** - *Problem Statement* - [Edwisor](https://www.edwisor.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for detailsg

## Acknowledgments

* Thanks for Edwisor to review this application.
* I would like to thank whoever supported for implenting this front end for Issue Tracking Tool application.
