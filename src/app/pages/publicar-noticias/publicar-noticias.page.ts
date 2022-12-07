import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { PostProvider } from 'src/app/providers/post-provider';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-publicar-noticias',
  templateUrl: './publicar-noticias.page.html',
  styleUrls: ['./publicar-noticias.page.scss'],
})
export class PublicarNoticiasPage implements OnInit {

  id: string = "";
  nome: string = "";
  categoria: string = "";
  titulo: string = "";
  assunto: string = "";
  mensagem: string = "";
  mensagem2: string = "";
  pdf: string = "";
  imagem: string = "../../../assets/adicionais/seu-texto-aqui.png";
  link1: string = "";
  link2: string = "";
  link3: string = "";


  constructor(
    private nativeStorage: NativeStorage,
    private camera: Camera,
    private provider: PostProvider,
    private route: Router,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.nativeStorage.getItem('conta').then((data) => {
      this.id = data.property.id;
      this.nome = data.property.nome;
      this.categoria = data.property.categoria;
    }, (error) => {
      console.error(error)
    });
  }
  pegarFoto() {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }
    const options: CameraOptions = {
      quality: 100,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.imagem = 'data:image/jpeg;base64,' + imageData;
      //publicarNoticias
    });
  }


  ngOnInit() {
  }
  limparCampos() {
    this.titulo = "";
    this.assunto = "";
    this.nome = "";
    this.mensagem = "";
    this.mensagem2 = "";
    this.pdf = "";
    this.imagem = "../../../assets/adicionais/seu-texto-aqui.png";
    this.link1 = "";
    this.link2 = "";
    this.link3 = "";
  }
  publicarNoticia() {
    let dados = {
      requisicao: "publicarNoticias",
      titulo: this.titulo,
      assunto: this.assunto,
      nome: this.nome,
      mensagem: this.mensagem,
      mensagem2: this.mensagem2,
      pdf: this.pdf,
      imagem: this.imagem,
      link1: this.link1,
      link2: this.link2,
      link3: this.link3,
    }
    this.provider.requisicaoPost(dados, "/noticias.php").subscribe((data) => {
      if (data['status'] == 503) {
        this.presentAlert(data['mensagem']);
      }
      else if (data['status'] == 201) {
        this.presentAlert(data['mensagem']);
        this.route.navigate(["/inicio"]);
      }
    }, (err) => {
      console.log(err);
    })
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
