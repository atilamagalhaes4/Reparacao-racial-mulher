import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { AlertController } from '@ionic/angular';
import { PostProvider } from 'src/app/providers/post-provider';

@Component({
  selector: 'app-disk-denuncia',
  templateUrl: './disk-denuncia.page.html',
  styleUrls: ['./disk-denuncia.page.scss'],
})
export class DiskDenunciaPage implements OnInit {

  anonimo: boolean = false;

  nome: string = "";
  email: string = "";
  categoriaMensagem: string = "";
  categoria: string = "";
  assunto: string = "";
  mensagem: string = "";
  
  denuncias: any = [];

  stilo1: string = "";
  stilo2: string = "";
  stilo3: string = "";
  stilo4: string = "";


  constructor(
    private alertController: AlertController,
    private nativeStorage: NativeStorage,
    private network: Network,
    private provider: PostProvider,
    private route: Router

  ) { }

  ngOnInit() {

  }


  selecionarCategoria(categoria){
    this.categoriaMensagem = categoria;
    if(categoria == "Racismo"){
      this.stilo1 = "background-color: rgb(230, 230, 230);border-style: dashed; border-radius: 10px; border-color: #999e92;";
      this.stilo2 = "";
      this.stilo3 = "";
      this.stilo4 = "";
    }
    else    if(categoria == "Violência contra a mulher"){
      this.stilo1 = "";
      this.stilo2 = "background-color: rgb(230, 230, 230);border-style: dashed; border-radius: 10px; border-color: #999e92;";
      this.stilo3 = "";
      this.stilo4 = "";
    }
    else    if(categoria == "Racismo religioso"){
      this.stilo1 = "";
      this.stilo2 = "";
      this.stilo3 = "background-color: rgb(230, 230, 230);border-style: dashed; border-radius: 10px; border-color: #999e92;";
      this.stilo4 = "";
    }
    else    if(categoria == "Lgbtfobia"){
      this.stilo1 = "";
      this.stilo2 = "";
      this.stilo3 = "";
      this.stilo4 = "background-color: rgb(230, 230, 230);border-style: dashed; border-radius: 10px; border-color: #999e92;";
    }
  }

  ionViewWillEnter() {
    this.nativeStorage.getItem('conta').then((data) => {
      this.categoria = data.property.categoria;
      this.nome = data.property.nome;
      this.email = data.property.email;
      if(data.property.categoria == "administrador"){
        this.pegarDenuncias();
      }
    }, (error) => {
      console.error(error)
    });

  }

  slideOpts = {
    slidesPerView: 4,
  };


  verificarAnonimo(){
    if(this.anonimo == true){
      this.presentAlert("Modo anônimo ativado.<br>O nome e email, se informado, não serão enviados.");
      this.nome = "anonimo";
      this.email = "anonimo";
    }
    else{
      this.nome = "";
      this.email = "";
    }
  }

  enviarMensagem(){
    if(this.categoriaMensagem == ""){
      this.presentAlert("Selecione uma categoria.");
    }
    else if(this.anonimo == false && this.nome == ""){
      this.presentAlert("Informe o seu nome.");
      this.nome = "";
    }
    else if(this.anonimo == false && this.email == ""){
      this.presentAlert("Inorme o email para contato");
      this.email = "";
    }
    else if(this.assunto == ""){
      this.presentAlert("Informe um assunto.");
    }
    else if(this.mensagem ==""){
        this.presentAlert("Digite sua sujestão/denúncia/critica.");
    }
    else{
      return new Promise(resolve => {
        let dados = {
          requisicao: "salvarDenuncia",
          nome: this.nome,
          email: this.email,
          categoriaMensagem: this.categoriaMensagem,
          assunto: this.assunto,
          mensagem: this.mensagem
        }
        console.log(dados);
        this.provider.requisicaoPost(dados, "/denuncia.php").subscribe((data) => {
          if(data['status'] == 201){
              this.presentAlert(data['mensagem']);
              this.route.navigate(["/inicio"]);
          }
          else{
            this.presentAlert("Não foi possível enviar denuncia.<br>Tente novamente.");
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


  doRefresh(event) { // dar refresh puxando pra cima
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 1000);
  }


  pegarDenuncias(){
    return new Promise(resolve => {
      let dados = {
        requisicao: "pegarDenuncias"
      }
      this.provider.requisicaoPost(dados, "/denuncia.php").subscribe((data) => {
        if(data['status'] == 200){
          for(let c of data["data"]){
            c.dataMensagem = this.AlterarData(c.dataMensagem);
            this.denuncias.push(c);
          }
        }
        else if(data["status"] == 404 ){
          this.presentAlert("Não foi possível enviar denuncia.<br>Tente novamente.");
        }
        else{
          this.presentAlert("Não foi possível pegar as denúncias.<br>Tente novamente mais tarde.");
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
