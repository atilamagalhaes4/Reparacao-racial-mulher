import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { AlertController } from '@ionic/angular';
import { PostProvider } from 'src/app/providers/post-provider';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  nome: string = "";
  email: string = "";
  cpf: string = "";
  telefone: string = "";
  senha: string = "";
  senha1: string = "";

  numero: string = "";
  rua: string = "";
  referencia: string = "";

  constructor(
    private provider: PostProvider,
    private alertController: AlertController,
    private route: Router,
    private network: Network
  ) { }

  ngOnInit() {
  }

  verificarCriacaoDeConta() {
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
    } else {
      return new Promise(resolve => {
        let dados = {
          requisicao: "verificarConta",
          email: this.email,
          cpf: this.cpf,
          telefone: this.telefone,
        }
        this.provider.requisicaoPost(dados, "/contas.php").subscribe((data) => {
          if (data['status'] == 404) {
//            this.presentAlert(data['mensagem']);
            this.criarConta();
          }
          else if (data['status'] == 200) {
            for (let c of data['data']) {
              if (c.email == this.email) {
                this.presentAlert("Já existe uma conta com este email.<br>Faça login ou entre em contato.");
                break;
              }
              else if (c.cpf == this.cpf) {
                this.presentAlert("Já existe uma conta com este CPF.<br>Faça login ou entre em contato.");
                break;
              }
              else if (c.telefone == this.telefone) {
                this.presentAlert("Já existe uma conta com este telefone.<br>Faça login ou entre em contato.");
                break;
              }
            }
            console.log(data['mensagem']);
          }
        }, (err) => {
          console.log(err);
        })
      })
    }
  }

  criarConta() {
    return new Promise(resolve => {
      let dados = {
        requisicao: "criarContas",
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        telefone: this.telefone,
        senha: this.senha,
        rua: this.rua,
        numero: this.numero,
        referencia: this.referencia,
        categoria: "usuario"
      }
      this.provider.requisicaoPost(dados, "/contas.php").subscribe((data) => {
        if (data['status'] == 201) {
          this.presentAlert(data['mensagem']);
          this.route.navigate(["/login"]);
//          this.notificacao.enviarNotificacao(0, "Bem vindo, "+this.nome, "Sua conta foi criada com sucesso.", 1)
        }
        else if (data['status'] == 503) {
          this.presentAlert(data['mensagem']);
          console.log(data['mensagem']);
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
