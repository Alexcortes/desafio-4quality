import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

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
    this._geolocationProvider.getLocation().subscribe(
      location => {
        this._cameraProvider.takePicture().subscribe(
          image => {
            this._registerProvider
              .saveRegister({
                latitude: location.latitude,
                longitude: location.longitude,
                image: image.base64Image
              })
              .subscribe(
                result => {
                  console.log(result);
                },
                error => {
                  console.log(error);
                }
              );
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log("error", error);
      }
    );
  }
}
