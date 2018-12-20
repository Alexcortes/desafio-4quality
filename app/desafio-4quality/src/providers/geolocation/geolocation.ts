import { Injectable } from "@angular/core";
import { Geolocation, GeolocationOptions } from "@ionic-native/geolocation";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";

import { Observable } from "rxjs/Observable";
import { LoadingController, AlertController } from "ionic-angular";

@Injectable()
export class GeolocationProvider {
  constructor(
    private geolocation: Geolocation,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _nativeSettings: OpenNativeSettings
  ) {}

  getLocation(): Observable<any> {
    const loader = this._loadingCtrl.create();
    loader.present();

    const geolocationOptions: GeolocationOptions = {
      enableHighAccuracy: true
    };

    return Observable.create(observer => {
      this.geolocation
        .getCurrentPosition(geolocationOptions)
        .then(resp => {
          loader.dismiss();
          observer.next({
            latitude: resp.coords.latitude,
            longitude: resp.coords.longitude
          });
          observer.complete();
        })
        .catch(error => {
          loader.dismiss();
          this.displayErrorMessage(error);
          observer.error("Erro ao buscar a localização", error);
          observer.complete();
        });
    });
  }

  displayErrorMessage(error: PositionError) {
    var errorMessage = {
      subTitle: "Ocorreu um erro ao buscar a localização.",
      message: null,
      buttons: []
    };

    if (error.TIMEOUT || error.POSITION_UNAVAILABLE) {
      errorMessage.message =
        "Por favor verifique as configurações de localização e tente novamente.";
      errorMessage.buttons = [
        "Cancelar",
        {
          text: "Configurações",
          handler: () => {
            this._nativeSettings.open("location");
          }
        }
      ];
    } else if (error.PERMISSION_DENIED) {
      errorMessage.message =
        "Por favor verifique as permissões do aplicativo e tente novamente.";
      errorMessage.buttons = [
        "Cancelar",
        {
          text: "Configurações",
          handler: () => {
            this._nativeSettings.open("application_details");
          }
        }
      ];
    } else {
      errorMessage.buttons = ["Ok"];
    }

    this._alertCtrl.create(errorMessage).present();
  }
}
