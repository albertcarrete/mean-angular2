import { Component, OnInit } from '@angular/core';

// import {OnActivate, OnDeactivate, ComponentInstruction} from '@angular/router-deprecated';

@Component({
  selector: 'my-players',
  templateUrl: './app/components/player/player.template.html'
})

export class PlayerComponent implements OnInit{

  constructor(){

  }

  ngOnInit(){
    console.log("Player componental has been initialized!!!!!@#!@#");
  }


}
