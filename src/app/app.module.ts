import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PostProvider } from 'src/app/providers/post-provider';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: LocationStrategy, 
      useClass: HashLocationStrategy
    },
    PostProvider,
    SplashScreen,
    StatusBar,
    NativeStorage,
    Camera,
    NativeAudio,
    Keyboard,
    Geolocation,
    Network,
    BackgroundMode,
    ScreenOrientation,
    CallNumber
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
