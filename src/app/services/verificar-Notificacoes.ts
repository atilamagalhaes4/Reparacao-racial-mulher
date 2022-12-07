import { Injectable } from '@angular/core';
import { PostProvider } from 'src/app/providers/post-provider';
import { Observable, Observer } from 'rxjs';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class verificarNotificacoes {

    /*
    constructor(
        private provider: PostProvider,
        private alertController: AlertController
    ) { }


    pegarAlertasDoDia() {
        Observable.timer(0, 10000) // 10 segundos
            .subscribe(() => {
                let dados = {
                    requisicao: "pegarAlertas",
                    situacaoStatus: "pendente"
                }
                this.provider.requisicaoPost(dados, "/registros.php").subscribe((data) => {
                    console.log(data);
                    for (let c of data["data"]) {
                        if (this.AlterarData(c.dataSolicitacao) == this.AlterarData(data['dataAtual'])) {
                        }
                    }
                }, (err) => {
                    console.log(err);
                })
            });
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
        return aux;
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