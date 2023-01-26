import { Component } from '@angular/core';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import OneSignal from 'onesignal-cordova-plugin';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  estaLogado: boolean = false;
  categoria: string = "";
  alertaTotal: any = [];
  primeiraVez: boolean = true;

  constructor(
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private platform: Platform,
    private alertController: AlertController,
    private screenOrientation: ScreenOrientation,
    private backgroundMode: BackgroundMode,
  ) {
    this.initializeApp();
  }
  
  ngOnInit() {

  }


  OneSignalInit() {
    OneSignal.setAppId("4a1cba7c-4da2-4fb8-812e-723a8144af57"); //Your APP ID
    OneSignal.setNotificationOpenedHandler(function (jsonData) {
      console.log('notificação Retorno de chamada aberto: ' + JSON.stringify(jsonData));
    });

    OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      console.log("User accepted notifications: " + accepted);
    });

    OneSignal.getDeviceState((data)=>{
//      alert(JSON.stringify(data.userId));
    })
  }



  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }




  opcaoNormal(categoria) {
    this.estaLogado = true;
    this.categoria = categoria;
    if (this.categoria == "policial"){

    }
  }

  opcaoAdministrador() {
    this.estaLogado = true;
    this.categoria = "administrador";
  }


  opcaoSair() {
    this.estaLogado = false;
    this.categoria = "";
    this.alertaTotal = [];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#34c27d');
      this.splashScreen.hide();
      this.OneSignalInit();
      this.backgroundMode.enable();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

}
