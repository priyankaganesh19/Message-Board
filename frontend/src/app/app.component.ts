import { Component } from '@angular/core';
import { NavComponent } from './home/nav.component';

@Component({
  selector: 'app-root',
  template: `<nav></nav>
            <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})

export class AppComponent {

}
