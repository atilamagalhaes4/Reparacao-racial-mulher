import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/app/providers/post-provider';

@Component({
  selector: 'app-visualizar-noticias',
  templateUrl: './visualizar-noticias.page.html',
  styleUrls: ['./visualizar-noticias.page.scss'],
})
export class VisualizarNoticiasPage implements OnInit {


  id: string = "";
  titulo: string = "";
  nome: string = "";
  dataPublicacao: string = "";
  mensagem: string = "";
  mensagem2: string = "";
  assunto: string = "";
  imagem: string = "";
  pdf: string = "";
  link1: string = "";
  link2: string = "";
  link3: string = "";

  constructor(
    private actRoute: ActivatedRoute,
    private provider: PostProvider
  ) { }


  ngOnInit() {

  }

  ionViewWillEnter() {
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      console.log('em resultados id = ' + this.id);
      this.carregarOpcao(data.id);
    });

  }

  carregarOpcao(id: any) {
    console.log('id dentro de pegar =' + id);


    return new Promise(resolve => {
      let dados = {
        requisicao: 'pegarSelecionado',
        id: id
      };
      this.provider.requisicaoPost(dados, '/noticias.php').subscribe(data => {
        if (data['status'] == 200) {
          console.log(data['mensagem']);
          for (let c of data['data']) {
            this.id = c.id;
            this.titulo = c.titulo;
            this.nome = c.nome;
            this.dataPublicacao = c.dataPublicacao;
            this.mensagem = c.mensagem.replaceAll("\r\n", "<br>");
            this.mensagem2 = c.mensagem2.replaceAll("\r\n", "<br>");
            this.assunto = c.assunto.replaceAll("\r\n", "<br>");
            this.imagem = c.imagem;
            this.pdf = c.pdf;
            this.link1 = c.link1;
            this.link2 = c.link2;
            this.link3 = c.link3;
            break;
          }
          this.dataPublicacao = this.AlterarData(this.dataPublicacao);
        }
        else if (data['status'] == 404) {
          console.log(data['mensagem']);
        }
        else if (data['status'] == 503) {
          console.log(data['mensagem']);
        }
      });
    });
  }

  openBrowser(url) {
    window.open(url, "_blank");
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
