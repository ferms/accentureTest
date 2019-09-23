import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/core/services/client.service';
import { AlertService } from 'ngx-alerts';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users:any;
  usersAll: any;
  passwordUser = '';
  hiddenShowForm = true;
  edit= true;
  pPersonaNatural =' Yo como persona natural \n   ';
  pComplemento ='deseo registrarme como cliente del banco e ingresar mi información personal para posteriormente solicitar un crédito con la entidad.';
  pDescribe = `${this.pPersonaNatural} \n  ${this.pComplemento}`;
  pDescribeArea:string;
  valueProgress= 0;
  namelast = true;
  dateDisabled = true;
  saveDisabled = true;
  checked = false;
  dataInfo: any;
  dataInfoAll: any;
  id:string;
  dateToday = new Date();
  birthUser:any;
  years:any;
  adult:boolean;
 arrayIdlist: any[] = [];
  constructor(
    private clinteService: ClientService,
    private alertService: AlertService,

  ) {

      this.clinteService.getUser().subscribe(data => {
        this.dataInfo = data;
        this.dataInfoAll = data;

      },
        (error) => {
          console.error(error);
        }
      );

   }

  ngOnInit() {

  }

  sending(){
    if (this.passwordUser) {
        this.users = this.dataInfo[this.passwordUser];
        console.log('%c⧭', 'color: #917399', this.users.birthdate);
        this.birthUser = moment(this.users.birthdate);

        console.log('%c⧭', 'color: #00a3cc', this.users);
        this.entering();
        this.getBirthdate();

    } else{
      this.alertService.info('Ingrese su contraseña');
    }

  }

  getIds(json){

    Object.keys(json).forEach(value => {
      let idUser = value;
      this.usersAll = this.dataInfoAll[idUser];
      this.arrayIdlist.push(this.usersAll.identification);
      this.compareId(this.arrayIdlist);
    });
  }

  compareId(ids){
   ids.forEach(value => {
    console.log('%c⧭', 'color: #bfffc8', value);
     if (this.users.identification === value){
       return true
     }
    });

  }

  getBirthdate(){
    let cumpleanos = new Date(this.users.birthdate);
    this.years  = this.dateToday.getFullYear() - cumpleanos.getFullYear();
    let m = this.dateToday.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && this.dateToday.getDate() < cumpleanos.getDate())) {
      this.years --;
    }
    console.log('%c⧭', 'color: #00b300', this.years);
    this.adultOrNot();
    return this.years;
  }

  adultOrNot(){
    if (this.years >= 18){

      console.log('%c⧭ Mayor de Edad', 'color: #1d5673', );
      this.adult = false;
    } else{

      console.log('%c⧭  No es MAyor', 'color: #f200e2',);

      this.adult = true;
    }
  }

  entering(){
    if (this.users){
      this.hiddenShowForm= false;
      this.alertService.success('Bienvenido a nuestro sitio web');
    } else{

      this.alertService.warning('Verifiqué la contraseña');
    }
  }

  aEditar(){
    this.edit = false;
    this.pDescribeArea = this.pDescribe;
  }

  saveEdit(){
    if (this.pDescribeArea){
      this.alertService.success('Se ha guardado la Descripción ');
      this.pDescribe = this.pDescribeArea;
      this.edit = true;
    } else{
      this.alertService.info('ingrese la Descripción');
    }
  }

  deleteD(){
    this.pDescribe = '';
    this.alertService.warning('Se ha Eimino la Descripción');

  }
  getId(event){
    console.log('%c⧭', 'color: #e50000', event);
    // this.getIds(this.dataInfo);
    if (event === true){
      this.valueProgress = 25;
      this.namelast = false;
    } else {
      this.valueProgress = 0;
      this.namelast = true;
    }

  }
  nameAndlast(event) {
    if (event === true) {
      this.valueProgress = 50;
      this.dateDisabled = false;
    } else {
      this.valueProgress =25;
      this.dateDisabled = true;
    }
  }

  dateBirth(event) {
    console.log('%c⧭', 'color: #00bf00', event);
    if (event === true) {
      this.valueProgress = 75;
      this.saveDisabled = false;
    } else {
      this.valueProgress = 50;
      this.saveDisabled = true;
    }
  }

  saveInfo(event) {
    console.log('%c⧭', 'color: #0088cc', event);
    if (event === true) {
      this.valueProgress = 100;
    } else {
      this.valueProgress = 75;
    }
  }

}
