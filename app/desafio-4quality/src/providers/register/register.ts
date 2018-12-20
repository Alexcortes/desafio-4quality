import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, LoadingController } from "ionic-angular";

/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterProvider {
  baseUrl = "";
  options = {};
  constructor(
    public http: HttpClient,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController
  ) {
    //Configurar conforme o endereço ip:
    this.baseUrl = "http://192.168.0.64:3030/api";
    this.options = { "Content-Type": "application/json" };
  }

  saveRegister(register: any) {
    const loader = this._loadingCtrl.create();
    loader.present();

    this.http
      .post(this.baseUrl + "/register", register, this.options)
      .subscribe(
        response => {
          loader.dismiss();
          this.displaySuccessDialog();
        },
        err => {
          loader.dismiss();
          this.displayErrorDialog(err);
        }
      );
  }

  displaySuccessDialog() {
    var successMessage = {
      message: "A imagem foi salva com sucesso.",
      buttons: ["Ok"]
    };

    this._alertCtrl.create(successMessage).present();
  }

  displayErrorDialog(err) {
    console.log(err);
    var errMessage = {
      subTitle: "Erro ao salvar registro",
      message: err.error.message,
      buttons: ["Ok"]
    };

    this._alertCtrl.create(errMessage).present();
  }
}
