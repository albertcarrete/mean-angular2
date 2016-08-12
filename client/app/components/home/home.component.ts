import { Component, OnInit } from '@angular/core';

// import {OnActivate, OnDeactivate, ComponentInstruction} from '@angular/router-deprecated';

@Component({
  selector: 'my-home',
  templateUrl: './app/components/home/home.template.html'
})

export class HomeComponent implements OnInit{

  constructor(){

  }

  ngOnInit(){
    console.log("Home component has been initialized");
  }


}
