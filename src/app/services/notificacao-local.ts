import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Channel, LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class notificacaoLocal {

/*
    constructor(
        private alertController: AlertController,
        private route: Router
    ) { }

    async ngOnInit() {
        await LocalNotifications.requestPermissions();
        const result = await LocalNotifications.listChannels();
        if (result.channels.find(ch => ch.id === 'AlertaNotificacao') === undefined) {
            const channel1: Channel = {
                id: 'AlertaNotificacao',
                name: 'Nossa voz',
                lightColor: '#f49c21',
                importance: 5,
                visibility: 1,
                vibration: true,
                lights: true
            }
            await LocalNotifications.createChannel(channel1);
        }
    }


    async enviarNotificacao(id, nome, endereco, i) {
        await LocalNotifications.schedule({
            notifications: [
                {
                    id: id,
                    title: nome,
                    body: endereco,
                    channelId: 'AlertaNotificacao',
                    schedule: { at: new Date(Date.now() + 100 * i) }
                }
            ]
        }).then((data) => {
//            this.route.navigate(['/registro-alerta']);
            console.log(data)
        }, (error) => {
            this.presentAlert(error)
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
    */
}