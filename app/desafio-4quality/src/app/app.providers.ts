import { ErrorHandler } from "@angular/core";
import { IonicErrorHandler } from "ionic-angular";
import { Camera } from "@ionic-native/camera";
import { CameraMock } from "../mocks/CameraMock";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { Geolocation } from "@ionic-native/geolocation";
import { GeolocationProvider } from "../providers/geolocation/geolocation";
import { CameraProvider } from "../providers/camera/camera";
import { RegisterProvider } from "../providers/register/register";

export class AppProviders {
  public static getProviders() {
    let providers;

    if (document.URL.includes("https://") || document.URL.includes("http://")) {
      // Use browser providers
      providers = [
        StatusBar,
        SplashScreen,
        OpenNativeSettings,
        Geolocation,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        GeolocationProvider,
        CameraProvider,
        RegisterProvider,
        { provide: Camera, useClass: CameraMock }
      ];
    } else {
      // Use device providers
      providers = [
        StatusBar,
        SplashScreen,
        OpenNativeSettings,
        Geolocation,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        GeolocationProvider,
        CameraProvider,
        RegisterProvider,
        Camera
      ];
    }

    return providers;
  }
}
