import { Component, OnInit } from '@angular/core';
import {ConfessionService} from './services/confession.service';
import {Confessions} from './confession';

@Component({
  moduleId: module.id,
  selector: 'confession',
  templateUrl: 'app.component.html',
  providers: [ConfessionService]
})
export class AppComponent implements OnInit {
  confessions: Confessions[];

  constructor(private _confessionService: ConfessionService) {
 
  }

  ngOnInit() {
    this.confessions = [];
    this._confessionService.getConfessions().subscribe(con => {
      this.confessions = con;
    });
  }

  addConfession(event, conMessage) {
    var result;
    var newCon: any = {
      message: conMessage.value,
      name: "Anon"
    };

    result = this._confessionService.saveConfession(newCon);
    result.subscribe(result => {
      this.confessions.push(newCon);
      conMessage.value = '';
    });
    console.log(event, conMessage.value);
  }

  deleteCon(con) {
    var cons = this.confessions;
    this._confessionService.deleteCon(con._id)
      .subscribe(result => {
        if(result.n == 1) {
          for(var i = 0; i < cons.length; i++) {
            if(cons[i]._id == con._id) {
              cons.splice(i, 1);
            }
          }
        }
      });
  }
}