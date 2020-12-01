import { Component, OnInit } from '@angular/core';
import { CreditCardService } from '../../services/credit-card.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  highest: number = 2000000000;
  lowest: number = 500000000;

  constructor(private credCardService: CreditCardService) { }

  ngOnInit() {
  }

  getLimit(){
    this.credCardService.getNewLimit(Math.floor(Math.random()*(this.highest-this.lowest+1)+this.lowest))
  }

}
