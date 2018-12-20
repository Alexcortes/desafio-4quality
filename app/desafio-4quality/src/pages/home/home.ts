import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/zip";

import { CameraProvider } from "../../providers/camera/camera";
import { GeolocationProvider } from "../../providers/geolocation/geolocation";
import { RegisterProvider } from "../../providers/register/register";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private _cameraProvider: CameraProvider,
    private _geolocationProvider: GeolocationProvider,
    private _registerProvider: RegisterProvider
  ) {}

  openCamera() {
    Observable.zip(
      this._geolocationProvider.getLocation(),
      this._cameraProvider.takePicture()
    ).subscribe(
      ([location, image]) => {
        this._registerProvider.saveRegister({
          latitude: location.latitude,
          longitude: location.longitude,
          image: image.base64Image
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}
