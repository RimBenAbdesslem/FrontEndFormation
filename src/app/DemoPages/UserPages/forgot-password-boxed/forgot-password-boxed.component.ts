import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { AlertService } from '@ngx-alerts';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgForm, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-boxed',
  templateUrl: './forgot-password-boxed.component.html',
  styles: []
})
export class ForgotPasswordBoxedComponent implements OnInit {
  model: any = {};
  constructor(private route: ActivatedRoute,private http: HttpClient,private Fb: FormBuilder) { }
  authUrl = "https://localhost:44385/api/ApplicationUser/resetpassword/";
  ngOnInit() {
    this.model.token = this.route.snapshot.queryParamMap.get('token');
    this.model.userid = this.route.snapshot.queryParamMap.get('userid');
  }
  formModel = this.Fb.group({
    Email: ['', Validators.email],
    Password: ['', [Validators.required, Validators.minLength(4)]]
    

  });
  ChangePassword() {
    var modele={
      Email:this.formModel.value.Email,
      Password:this.formModel.value.Password,
    

    }
    return this.http.post("https://localhost:44385/api/ApplicationUser/changepassword", modele);
  }
  changePasswordUrl = "http://localhost:4200/change-password/";
  resetPassword(model: any) {
    let headers = new HttpHeaders({
      changePasswordUrl: this.changePasswordUrl
    });
    let options = { headers: headers };
    return this.http.post(this.authUrl+ model.email, options);
  }
  onSubmit(f: NgForm) {
   // this.alertService.info('Working on sending email');
  //  this.progressBar.startLoading();
    const resetPasswordObserver = {
      next: x => {
       // this.progressBar.setSuccess();
       // this.alertService.success('Check email to change password');
        console.log('Check email to change password');
       // this.progressBar.completeLoading();
      },
      error: err => {
      //  this.progressBar.setError();
        console.log(err);
     //   this.alertService.danger('Unable to send email');
      //  this.progressBar.completeLoading();
      }
    };
    this.resetPassword(f.value).subscribe(resetPasswordObserver);
  }
  changePassword() {
   // this.alertService.info('Working on changing password');
  //  this.progressBar.startLoading();
    this.ChangePassword().subscribe(() => {
   //   this.progressBar.setSuccess();
      console.log("success");
     // this.alertService.success('Password Changed');
    //  this.progressBar.completeLoading();
    }, error => {
    //  this.progressBar.setError();
      console.log(error);
    //  this.alertService.danger('Unable to change password');
    //  this.progressBar.completeLoading();
    })
  }
}
