import { Component } from '@angular/core';
import { sharedImports } from '../../_shared/shared-imports';
import { RouterModule } from '@angular/router';

import { addIcons } from 'ionicons';
import { search, barChartOutline } from 'ionicons/icons';

@Component({
  selector: 'home-page',
  imports: [...sharedImports, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  constructor() {
    addIcons({ search, barChartOutline });
  }
}
