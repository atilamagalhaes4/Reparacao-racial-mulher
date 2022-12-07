import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { PostProvider } from 'src/app/providers/post-provider';

@Component({
  selector: 'app-registro-alerta',
  templateUrl: './registro-alerta.page.html',
  styleUrls: ['./registro-alerta.page.scss'],
})
export class RegistroAlertaPage implements OnInit {

  id: string = "";
  nome: string = "";
  email: string = "";
  cpf: string = "";
  telefone: string = "";
  senha: string = "";
  categoria: string = "";
  rua: string = "";
  numero: string = "";
  referencia: string = "";
  observacaoPolicial: string = "";
  registro: any = [];

  verificareEmAndamento: boolean = false;
  verificarConcluido: boolean = false;
  verificarPendente: boolean = false;

  constructor(
    private nativeStorage: NativeStorage,
    private provider: PostProvider,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.registro = [];
    this.verificarPendente = false;
    this.verificarConcluido = false;

        this.nativeStorage.getItem('conta').then((data) => {
          console.log(data)
          this.verificarPendente = false;
          this.verificarConcluido = false;
          this.id = data.property.id;
          this.nome = data.property.nome;
          this.email = data.property.email;
          this.cpf = data.property.cpf;
          this.telefone = data.property.telefone;
          this.senha = data.property.senha;
          this.rua = data.property.rua;
          this.numero = data.property.numero;
          this.referencia = data.property.referencia;
          this.categoria = data.property.categoria;
    
          let dados;
          this.registro = [];
          if (data.property.categoria == "usuario") dados = { requisicao: "registroUsuario", idSolicitado: data.property.id };
    
          else if (data.property.categoria == "administrador" || data.property.categoria == "policial") dados = { requisicao: "registroGeral" };
    
          this.provider.requisicaoPost(dados, "/registros.php").subscribe((data2) => {
            if (data2['status'] == 503) {
              console.log(data2['mensagem']);
            }
            else if (data2['status'] == 404) {
              console.log(data2['mensagem']);
            }
            else if (data2['status'] == 200) {
              console.log(data2['mensagem']);
              if (data.property.categoria == "usuario") {
                for (let c of data2['data']) {
                  c.dataSolicitacao = this.AlterarData(c.dataSolicitacao);
                  this.registro.push(c);
                }
              } else if (data.property.categoria == "administrador" || data.property.categoria == "policial") {
                for (let c of data2['data']) {
                  if (c.situacaoStatus == "pendente")
                    this.verificarPendente = true;
                  if (c.situacaoStatus == "concluido")
                    this.verificarConcluido = true;
                    if (c.situacaoStatus == "em andamento")
                      this.verificareEmAndamento = true;
                  c.dataSolicitacao = this.AlterarData(c.dataSolicitacao);
                  this.registro.push(c);
                }
              }
            }
          }, (err) => {
            console.log(err);
          })
    
        }, (error) => {
          console.error(error)
        });
  }

  irMaps(url) {
    window.open(url, "_blank");
  }
  concluirCaso(id){
    return new Promise(resolve => {
      let dados = {
        requisicao: "atualizarConcluido",
        id: id,
        observacaoPolicial: this.observacaoPolicial,
        situacaoStatus: "concluido",

      }
      this.provider.requisicaoPost(dados, "/registros.php").subscribe((data) => {
        if (data['status'] == 200) {
          this.ionViewWillEnter();
/*          this.presentAlert(nome, `<strong>rua:</strong> ${rua}<br><strong>Numero:</strong> ${numero}<br><strong>Referência:</strong> ${referencia}<br>`);*/
          console.log(data['mensagem']);
        }
        else if (data['status'] == 503) {
          this.presentAlert("Mensagem", data['mensagem']);
          console.log(data['mensagem']);
        }
      }, (err) => {
        console.log(err);
      })
    });

  }


  confirmarIda(id, url, nome, rua, numero, referencia, idNotificacao) {
    return new Promise(resolve => {
      let dados = {
        requisicao: "atualizarRegistro",
        id: id,
        responsavel: this.nome,
        situacaoStatus: "em andamento",
        idNotificacao: idNotificacao
      }
      this.provider.requisicaoPost(dados, "/registros.php").subscribe((data) => { 
        if (data['status'] == 200) {
          this.ionViewWillEnter();
          window.open(url, "_blank");
/*          this.presentAlert(nome, `<strong>rua:</strong> ${rua}<br><strong>Numero:</strong> ${numero}<br><strong>Referência:</strong> ${referencia}<br>`);*/
          console.log(data['mensagem']);
        }
        else if (data['status'] == 503) {
          this.presentAlert("Mensagem", data['mensagem']);
          console.log(data['mensagem']);
        }
      }, (err) => {
        console.log(err);
      })
    });
  }


  async presentAlert(titulo, mensagem) {
    const alert = await this.alertController.create({
      cssClass: 'secondary',
      // header: 'Alerta',
      header: titulo,
      message: mensagem,
      buttons: [{
        cssClass: 'primary',
        text: 'OK'
      }]
    });
    await alert.present();
  }


  doRefresh(event) { // dar refresh puxando pra cima
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 1000);
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
