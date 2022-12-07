import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-sair',
  templateUrl: './sair.page.html',
  styleUrls: ['./sair.page.scss'],
})
export class SairPage implements OnInit {

  logado: boolean = false;
  debug: string = "";

  constructor(
    private alertController: AlertController,
    private route: Router,
    private nativeStorage: NativeStorage,
    private setarMenu: AppComponent
  ) { }

  ngOnInit() { }


  ionViewWillEnter() {
    this.nativeStorage.getItem('conta').then((data) => {
      console.log(data)
      this.logado = true;
    })
    if(this.logado == false)
      this.sairGeral;
  };

  sairGeral() {
    navigator['app'].exitApp();
  }
  
  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }


  async fazerLogout() {
    const alert = await this.alertController.create({
      //        header: 'Confirm!',
      message: 'Tem certeza que deseja sair ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sair',
          handler: () => {
            this.nativeStorage.clear();
            this.setarMenu.opcaoSair();
            this.route.navigate(['/inicio']);
          }
        }
      ]
    });

    await alert.present();
  }

}
