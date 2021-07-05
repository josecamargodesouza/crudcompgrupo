import { Cliente, ClienteService } from './../../servico/cliente.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modalcliente',
  templateUrl: './modalcliente.page.html',
  styleUrls: ['./modalcliente.page.scss'],
})
export class ModalclientePage implements OnInit {
@Input() c: Cliente;
atualizar = false;
dados = {
  nome: '',
  cpf: '',
  endereco: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: '',
  email: '',
  telefone: '',
  profissao: ''
};
  constructor(
    private modalCtrl: ModalController,
    private service: ClienteService
  ) { }

  ngOnInit() {
    if(this.c){
      this.atualizar = true;
      this.dados = this.c;
    }
  }

  fecharModal(){
    this.modalCtrl.dismiss();
  }

  enviando(form: NgForm){
    const cliente = form.value;
    if(this.atualizar){
      this.service.update(cliente, this.c.id).subscribe(response =>{
      this.modalCtrl.dismiss(response);
      });
    } else {
        this.service.create(cliente).subscribe(response => {
        this.modalCtrl.dismiss(response);
      });
    }
  }
}
