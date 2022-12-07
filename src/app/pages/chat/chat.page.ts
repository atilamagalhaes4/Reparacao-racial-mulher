import { Component, OnInit, ViewChild } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { PostProvider } from 'src/app/providers/post-provider';
import { Observable, Observer } from 'rxjs';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  
  constructor(
    
  ) { }
  
  ngOnInit() {
  }
  /*
  @ViewChild('content') content: any;

  textoDigitado: string = "";
  id: string = "";
  categoria: string = ""; 
  nome: string = "";

  exibirInput: boolean = false;
  pegarMais: boolean = false;

  chat: any = [];
  usuarios: any = [];

  constructor(
    private provider: PostProvider,
    private alertController: AlertController,
    private nativeStorage: NativeStorage,
    private nativeAudio: NativeAudio
  ) {
    this.nativeAudio.preloadSimple('chegouMensagem', 'assets/notification_ring/notification.mp3').then((data)=>{
//      this.presentAlert(data);
    },(erro)=>{
      this.presentAlert(erro);
    })
  }




  mensagemEnviada() {
    this.nativeAudio.play('chegouMensagem').then((data) => {
      console.log(data);
    }).catch((err) => {
      this.presentAlert(err);
      console.log('error', err);
    });
  }
  
  ionViewWillEnter() {
    this.chat = [];
    this.nativeStorage.getItem('conta').then((data) => {
      this.id = data.property.id;
      this.nome = data.property.nome;
      this.categoria = data.property.categoria;
      if (data.property.categoria == "usuario" || data.property.categoria == "policial") {
        this.chatInicial();
      }
      else if (data.property.categoria == "administrador") {
        this.exibirInput = false;
        this.todosUsuarios();
      }
      else {
        this.presentAlert("Nenhuma categoria encontrada.");
      }
    }, (error) => {
      this.presentAlert("Falha na autenticação.<br>Faça login novamente.");
      console.error(error)
    });
  }



  voltarOpcoes() {
    this.exibirInput = false;
    this.chat = [];
    this.pegarMais = false;
  }

  ngOnDestroy(){

  }
  
  pegarNovoChat() {
    Observable.timer(0, 1000)  // Seta o timer para cada 1 segundo
      .subscribe(() => {
        console.log("conectando ...");
        if (this.pegarMais == true) {
          return new Promise(resolve => {
            let dados = {
              requisicao: "primeiroChat",
              idSolicitante: this.id
            }
            this.provider.requisicaoPost(dados, "/chat.php").subscribe((data) => {
              if (data['status'] == 404) {
                console.log(data['mensagem']);
              }
              else if (data['status'] == 200) {
                var temCoisas = false;
                for (let c of data['data']) {
                  c.dataMensagem = this.AlterarData(c.dataMensagem);
                  for (var i = 0; i < this.chat.length; i++) {
                    if (c.id == this.chat[i].id) {
                      temCoisas = true;
                    }
                  }
                  if (temCoisas == false) {
                    this.mensagemEnviada();
                    this.chat.push(c);
                    this.content.scrollTo(0, document.body.scrollHeight);
                  }
                  temCoisas = false;
                }
              }
            }, (err) => {
              console.log(err);
            })
          })
        }else{
          this.chat = [];
        }
      });
  }


  enviarMensagem(mensagem) {
    return new Promise(resolve => {
      let dados = {
        requisicao: "enviarMensagem",
        mensagem: this.textoDigitado,
        idSolicitante: this.id,
        tipo: mensagem
      }
      this.textoDigitado = "";
      this.provider.requisicaoPost(dados, "/chat.php").subscribe((data) => {
        console.log(data);
        if (data['status'] == 404) {
          console.log(data['mensagem']);
        }
        else if (data['status'] == 200) {
          for (let c of data['data']) {
            c.dataMensagem = this.AlterarData(c.dataMensagem);
            this.chat.push(c);
            this.content.scrollTo(0, document.body.scrollHeight);
          }
          console.log(data['mensagem']);
        }
      }, (err) => {
        console.log(err);
      })
    })
  }




  chatInicial() {
    return new Promise(resolve => {
      this.chat = [];
      let dados = {
        requisicao: "primeiroChat",
        idSolicitante: this.id
      }
      this.provider.requisicaoPost(dados, "/chat.php").subscribe((data) => {
        console.log(data);
        if (data['status'] == 404) {
          console.log(data['mensagem']);
        }
        else if (data['status'] == 200) {
          for (let c of data['data']) {
            c.dataMensagem = this.AlterarData(c.dataMensagem);
            this.chat.push(c);
            this.content.scrollTo(0, document.body.scrollHeight);
          }
          this.pegarMais = true;
          this.pegarNovoChat();
          console.log(data['mensagem']);
        }
      }, (err) => {
        console.log(err);
      })
    })
  }


  todosUsuarios() {
    return new Promise(resolve => {
      let dados = {
        requisicao: "todosUsuarios"
      }
      this.provider.requisicaoPost(dados, "/contas.php").subscribe((data) => {
        console.log(data);
        if (data['status'] == 404) {
          console.log(data['mensagem']);
        }
        else if (data['status'] == 200) {
          for (let c of data['data']) {
            this.usuarios.push(c);
          }
          console.log(data['mensagem']);
        }
      }, (err) => {
        console.log(err);
      })
    })
  }

  pegarChatAdministrador() {
    this.exibirInput = true;
    this.chatInicial();
    console.log(this.id);
  }

  AlterarData(data: string) {
    var aux = "";
    var aux2 = "";
    aux = aux + data[8];
    aux = aux + data[9];
    aux = aux + data[7];
    aux = aux + data[5];
    aux = aux + data[6];
    aux = aux + data[4];
    aux = aux + data[0];
    aux = aux + data[1];
    aux = aux + data[2];
    aux = aux + data[3];

    aux2 = aux2 + data[10];
    aux2 = aux2 + data[11];
    aux2 = aux2 + data[12];
    aux2 = aux2 + data[13];
    aux2 = aux2 + data[14];
    aux2 = aux2 + data[15];
    aux2 = aux2 + data[16];
    aux2 = aux2 + data[17];
    aux2 = aux2 + data[18];
    return aux2;
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
  }*/
}
