import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PostProvider } from 'src/app/providers/post-provider';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AppComponent } from '../../app.component';
import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  senha: string = "";


  constructor(
    private provider: PostProvider,
    private alertController: AlertController,
    private route: Router,
    private nativeStorage: NativeStorage,
    private setarMenu: AppComponent,
    private network: Network
  ) { }

  ngOnInit() {
  }

  fazerLogin() {
    if (this.email == "") {
      this.presentAlert("Preencha o campo Email.");
    }
    else if (this.senha == "") {
      this.presentAlert("Informe sua senha.");
    }
    else {
      return new Promise(resolve => {
        let dados = {
          requisicao: "fazerLogin",
          email: this.email,
          senha: this.senha,
        }
        this.provider.requisicaoPost(dados, "/contas.php").subscribe((data) => {
          if (data['status'] == 200) {
            var dados = {};
            var dados = data['data'][0];
            this.nativeStorage.setItem('conta', {
              property: dados, anotherProperty: 'Terá todos os dados da conta do individuo'
            }).then((data2) => {
              this.presentAlert(data['mensagem']);
              if (data['data'][0].categoria == "usuario" || data['data'][0].categoria == "policial") {
                this.setarMenu.opcaoNormal(data['data'][0].categoria);
                this.route.navigate(["/inicio"]);
              }
              else if (data['data'][0].categoria == "administrador") {
                this.setarMenu.opcaoAdministrador();
                this.route.navigate(["/inicio"]);
              }
            }, (error) => {
              console.error('Error storing item', error)
            });
          }
          else if (data['status'] == 404) {
            this.presentAlert(data['mensagem']);
          }
          else if (data['status'] == 503) {
            this.presentAlert(data['mensagem']);
          }
        }, (err) => {
          let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            console.log('network was disconnected :-(');
            this.presentAlert("Verifique sua conexão e tente novamente.");
          });
          // stop connect watch
          disconnectSubscription.unsubscribe();
          console.log(err);
        })
      });
    }
  }

  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      cssClass: 'secondary',
      // header: 'Alerta',
      message: mensagem,
      buttons: [{
        cssClass: 'primary',
        text: 'OK'
      }]
    });
    await alert.present();
  }
}
