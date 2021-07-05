import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Cliente, ClienteService } from 'src/app/servico/cliente.service';
import { ModalclientePage } from '../modalcliente/modalcliente.page';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clientes: Cliente[];

  constructor(private service: ClienteService,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.clientes = response;
    });
  }

  remover(id: any){
    this.service.remove(id).subscribe(() => {
      //this.clientes = this.clientes.filter(idcliente => idcliente.id !== id);
      this.service.getAll().subscribe(response => {
        this.clientes = response;
      });
      this.toastCtrl.create({
        message: 'Cliente deletado com sucesso',
        duration: 2500
      }).then(toast => {
        toast.present();
      });
    });
  }

  //cadastra um novo cliente
  novoCliente(){
    this.modalCtrl.create({
      component: ModalclientePage
    }).then(modal =>
          {modal.present();
          return modal.onDidDismiss();
        }).then(({data}) => {
          this.service.getAll().subscribe(response => {
            this.clientes = response;
          });
          this.toastCtrl.create({
            message: 'Cliente cadastrado com sucesso',
            duration: 2500
          }).then(toast => {
            toast.present();
          });
        });
  }

  //atualiza os dados de um cadastro já existente
  atualizar(c: Cliente){
    this.modalCtrl.create({
      component: ModalclientePage,
      componentProps: {c}
    }).then(modal =>
      { modal.present();
        return modal.onDidDismiss();
      }).then(({data}) => {
        this.service.getAll().subscribe(response => {
          this.clientes = response;
        });
        this.toastCtrl.create({
          message: 'Dados atualizado com sucesso',
          duration: 2500
        }).then(toast => {
          toast.present();
        });
      });
  }

}
