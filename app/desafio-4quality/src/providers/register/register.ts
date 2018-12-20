import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterProvider {
  baseUrl = "";
  options = {};
  constructor(public http: HttpClient) {
    this.baseUrl = "http://localhost:8080/api";
    this.options = { "Content-Type": "application/json" };
  }

  saveRegister(register: any): Observable<any> {
    return this.http.post(this.baseUrl + "/register", register, this.options);
  }
}
