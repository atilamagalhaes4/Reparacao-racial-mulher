import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { PostProvider } from 'src/app/providers/post-provider';
import { AppComponent } from '../../app.component';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import OneSignal from 'onesignal-cordova-plugin';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
// npm i cordova-builder --legacy-peer-deps 
export class InicioPage implements OnInit {

  id: string = "";
  nome: string = "";
  rua: string = "";
  numero: string = "";
  referencia: string = "";
  noticias: any = [];
  pesquisa: string = "";
  categoria: string = "";
  localizacao: string = "";
  idNotificacao: string = "";
  constructor(
    private provider: PostProvider,
    private alertController: AlertController,
    private nativeStorage: NativeStorage,
    private route: Router,
    private setarMenu: AppComponent,
    private geolocation: Geolocation,
    private network: Network
  ) { }

  ngOnInit() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.presentAlert("Sem acesso à internet.<br>Algumas funções podem não funcionar corretamente.");
    });
    // stop connect watch
    disconnectSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.nativeStorage.getItem('conta').then((data) => {
      this.id = data.property.id;
      this.nome = data.property.nome;
      this.rua = data.property.rua;
      this.numero = data.property.numero;
      this.referencia = data.property.referencia;
      this.categoria = data.property.categoria;
      if (data.property.categoria == "usuario" || data.property.categoria == "policial") {
        this.setarMenu.opcaoNormal(data.property.categoria);
        this.route.navigate(["/inicio"]);
      }
      else if (data.property.categoria == "administrador") {
        this.setarMenu.opcaoAdministrador();
        this.route.navigate(["/inicio"]);
      }
    }, (error) => {
      console.error(error);
    });
    this.pegarIdNotificacao()
    this.minhaPosicao();
    this.todasNoticias();
  }

  todasNoticias() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.presentAlert("Verifique sua conexão e tente novamente.");
      return false;
    });
    // stop connect watch
    disconnectSubscription.unsubscribe();
    return new Promise(resolve => {
      this.noticias = [];
      let dados = {
        requisicao: "todasAsNoticias"
      }
      this.provider.requisicaoPost(dados, "/noticias.php").subscribe((data) => {
        if (data['status'] == 200) {
          console.log(data['mensagem']);
          for (let c of data['data']) {
            c.titulo = c.titulo.toUpperCase();
//            c.dataPublicacao = this.AlterarData(c.dataPublicacao);
            c.assunto = c.assunto.replaceAll("\r\n", "<br>");
            this.noticias.push(c);
          }
        }
        else if (data['status'] == 404) {
          console.log(data['mensagem']);
        }
        else if (data['status'] == 503) {
          console.log(data['mensagem']);
        }
      }, (err) => {
        console.log(err);
      })
    });
  }

  async botaoPanico() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Aviso',
      message: 'Deseja chamar alguem para lhe ajudar agora ?',
      buttons: [
        {
          text: 'Chamar ajuda',
          id: 'confirm-button',
          handler: () => {
            let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
              console.log('network was disconnected :-(');
              this.presentAlert("Não foi possível entrar em contato conosco.<br>Verifique sua conexão e tente novamente.");
              return false;
            });
            // stop connect watch
            disconnectSubscription.unsubscribe();
            if (this.categoria == "usuario" || this.categoria == "administrador") {
              
              return new Promise(resolve => {
                this.noticias = [];
                let dados = {
                  requisicao: "salvarRegistro",
                  idSolicitado: this.id,
                  nome: this.nome,
                  rua: this.rua,
                  numero: this.numero,
                  referencia: this.referencia,
                  situacaoStatus: "pendente",
                  localAtual: this.localizacao,
                  idNotificacao: this.idNotificacao,
                  observacaoPolicial: "",
                  responsavel: ""
                }
                this.provider.requisicaoPost(dados, "/registros.php").subscribe((data) => {
                  if (data['status'] == 201) {
                    this.presentAlert(data['mensagem']);
                  }
                  else if (data['status'] == 503) {
                    this.presentAlert(data['mensagem']);
                  }
                }, (err) => {
                  console.log(err);
                })
              });
            }
            else {
              this.presentAlert("Efetue login ou crie sua conta para usar essa opção.");
            }
          }
        },
        {
          text: 'Entendi',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  pegarIdNotificacao(){
    OneSignal.getDeviceState((data)=>{
      var str  =  JSON.stringify(data.userId);
      this.idNotificacao= str.split('"').join("");
    })
  }


  minhaPosicao(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.localizacao = "https://www.google.com/maps/place/" + resp.coords.latitude + "," + resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
      return 'Error getting location'+ error;
    });
  }


  pesquisaRapida() {
    if (this.pesquisa.length > 2) { //Só pesquisa se digitar pelo menos 3 caracteres
      console.log(this.pesquisa)
      return new Promise(resolve => {
        this.noticias = [];
        let dados = {
          requisicao: "pesquisaRapida",
          pesquisa: this.pesquisa
        }
        this.provider.requisicaoPost(dados, "/noticias.php").subscribe((data) => {
          if (data['status'] == 200) {
            console.log(data['mensagem']);
            for (let c of data['data']) {
              c.titulo = c.titulo.toUpperCase();
//              c.dataPublicacao = this.AlterarData(c.dataPublicacao);
              c.assunto = c.assunto.replaceAll("\r\n", "<br>");
              this.noticias.push(c);

            }
          }
          else if (data['status'] == 404) {
            console.log(data['mensagem']);
          }
          else if (data['status'] == 503) {
            console.log(data['mensagem']);
          }
        }, (err) => {
          console.log(err);
        })
      });
    }
    if (this.pesquisa.length == 0) {
      this.todasNoticias();
    }
  }


  doRefresh(event) { // dar refresh puxando pra cima
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 1000);
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



  AlterarData(data: string) {
    var aux = "";
    aux = aux + data[8];
    aux = aux + data[9];
    aux = aux + "/";
    aux = aux + data[5];
    aux = aux + data[6];
    aux = aux + "/";
    aux = aux + data[0];
    aux = aux + data[1];
    aux = aux + data[2];
    aux = aux + data[3];
    aux = aux + " ás ";
    aux = aux + data[10];
    aux = aux + data[11];
    aux = aux + data[12];
    aux = aux + data[13];
    aux = aux + data[14];
    aux = aux + data[15];
    aux = aux + data[16];
    aux = aux + data[17];
    aux = aux + data[18];
    return aux;
  }
}
