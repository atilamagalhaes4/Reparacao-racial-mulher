import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { PostProvider } from 'src/app/providers/post-provider';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.page.html',
  styleUrls: ['./minha-conta.page.scss'],
})
export class MinhaContaPage implements OnInit {

  id: string = "";
  nome: string = "";
  email: string = "";
  cpf: string = "";
  telefone: string = "";
  senha: string = "";
  senha1: string = "";
  senhaAtual: string = "";
  senhaOculta: string = "";

  rua: string = "";
  numero: string = "";
  referencia: string = "";

  ionViewWillEnter() {
    this.nativeStorage.getItem('conta').then((data) => {
      this.id = data.property.id;
      this.nome = data.property.nome;
      this.email = data.property.email;
      this.cpf = data.property.cpf;
      this.telefone = data.property.telefone;
      this.senhaOculta = data.property.senha;
      this.rua = data.property.rua;
      this.numero = data.property.numero;
      this.referencia = data.property.referencia;
    }, (error) => {
      console.error(error)
    });

  }

  constructor(
    private provider: PostProvider,
    private alertController: AlertController,
    private route: Router,
    private nativeStorage: NativeStorage
  ) { }

  ngOnInit() {
  }



  atualizarConta() {
    if (this.nome == "") {
      this.presentAlert("Digite seu nome.");
      return false;
    }
    else if (this.email == "") {
      this.presentAlert("Digite seu email.");
      return false;
    }
    else if (this.cpf == "") {
      this.presentAlert("Digite seu CPF.");
      return false;
    }
    else if (this.telefone == "") {
      this.presentAlert("Digite o seu telefone.");
      return false;
    }
    else if (this.numero == "") {
      this.presentAlert("Informe o numero de sua casa.");
      return false;
    }
    else if (this.rua == "") {
      this.presentAlert("Informe o seu endereço.");
      return false;
    }
    else if (this.referencia == "") {
      this.presentAlert("Informe o ponto de referencia.");
      return false;
    }
    else if (this.senha == "") {
      this.presentAlert("Preencha o campo 1 da senha.");
      return false;
    }
    else if (this.senha1 == "") {
      this.presentAlert("Preencha o campo 2 da senha.");
      return false;
    }
    else if (this.senha != this.senha1) {
      this.presentAlert("As senhas não coincidem.");
      return false;
    }
    else if (this.senhaAtual != this.senhaOculta) {
      this.presentAlert("A senha atual não está correta.");
      return false;
    } else {
      return new Promise(resolve => {
        let dados = {
          requisicao: "atualizarConta",
          id: this.id,
          nome: this.nome,
          email: this.email,
          cpf: this.cpf,
          telefone: this.telefone,
          senha: this.senha,
          rua: this.rua,
          numero: this.numero,
          referencia: this.referencia
        }
        this.provider.requisicaoPost(dados, "/contas.php").subscribe((data) => {
          if (data['status'] == 503) {
            this.presentAlert(data['mensagem']);
          }
          else if (data['status'] == 200) {
            this.presentAlert(data['mensagem']);
            this.route.navigate(["/inicio"]);
          }
        }, (err) => {
          console.log(err);
        })
      })
    }
  }
  async excluirConta() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Para excluir a conta informe sua senha',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Digite sua senha'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          id: 'confirm-button',
          handler: (req) => {
            console.log(req.name1);
            if (req.name1 == this.senhaOculta) {

              return new Promise(resolve => {
                let dados = {
                  requisicao: "excluirConta",
                  id: this.id,
                }
                this.provider.requisicaoPost(dados, "/contas.php").subscribe((data) => {
                  if (data['status'] == 503) {
                    this.presentAlert(data['mensagem']);
                  }
                  else if (data['status'] == 200) {
                    this.presentAlert(data['mensagem']);
                    this.nativeStorage.clear().then((data) => {
                      this.route.navigate(["/inicio"]);
                    }, (error) => {
                      this.presentAlert("Por favor, saia da conta.");
                    });
                  }
                }, (err) => {
                  console.log(err);
                })
              })
            }
            else {
              this.presentAlert("Senha incorreta.");
            }
          }
        }
      ]
    });
    await alert.present();
  }

  ajustarCPF() {
    console.log("entrou")
    if (this.cpf.length == 3)
      this.cpf = this.cpf + ".";
    if (this.cpf.length == 7)
      this.cpf = this.cpf + ".";
    if (this.cpf.length == 11)
      this.cpf = this.cpf + "-";
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
