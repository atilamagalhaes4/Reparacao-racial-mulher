import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PostProvider } from 'src/app/providers/post-provider';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {

  cpf: string = "";
  email: string = "";
  nome: string = "";
  senha: string = "";

  constructor(
    private alertController: AlertController,
    private provider: PostProvider
  ) { }

  ngOnInit() {
  }
  
  enviar() {

    if (this.email == "") {
      this.presentAlert("Preencha o campo Email.");
    }
    else if (this.cpf == "") {
      this.presentAlert("Informe seu CPF.");
    }
    else {
      return new Promise(resolve => {
        let dados = {
          requisicao: "recuperarSenha",
          email: this.email,
          cpf: this.cpf,
        }
        this.provider.requisicaoPost(dados, "/contas.php").subscribe((data) => {
          if (data['status'] == 200) {
            for(let c of data['data']){
              this.nome = c.nome;
              this.senha = c.senha;
            }
            console.log(data['mensagem']);
          }
          if (data['status'] == 404) {
            this.presentAlert(data['mensagem']);
            console.log(data['mensagem']);
          }
          else if (data['status'] == 503) {
            this.presentAlert(data['mensagem']);
            console.log(data['mensagem']);
          }
        }, (err) => {
          console.log(err);
        })
      });
    }
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
