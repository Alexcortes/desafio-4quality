import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Observable } from "rxjs/Observable";
import { AlertController } from "ionic-angular";

@Injectable()
export class CameraProvider {
  constructor(private camera: Camera, private _alertCtrl: AlertController) {}

  cameraOptions: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL
  };

  takePicture(): Observable<any> {
    return Observable.create(observer => {
      this.camera.getPicture(this.cameraOptions).then(
        imageData => {
          let base64Image = "data:image/jpeg;base64," + imageData;
          observer.next({ base64Image: base64Image });
          observer.complete();
        },
        err => {
          observer.error("Ocorreu um erro ao capturar a imagem.", err);
          this.displayErrorMessage();
          observer.complete();
        }
      );
    });
  }

  displayErrorMessage() {
    var errorMessage = {
      subTitle:
        "Ocorreu um erro ao capturar a imagem. Por favor, tente novamente.",
      buttons: ["Ok"]
    };

    this._alertCtrl.create(errorMessage).present();
  }
}
