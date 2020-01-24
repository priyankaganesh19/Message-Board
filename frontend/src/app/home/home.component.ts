import { Component } from '@angular/core';
import { MessageComponent } from '../messages/message.component';
import { NewMessageComponent } from '../messages/new-message.component';
import { NavComponent } from '../home/nav.component';

@Component({
  selector: 'home',
  template: `
            <new-message></new-message>
            <messages></messages>`,
  styleUrls: ['../app.component.css']
})

export class HomeComponent {

}
