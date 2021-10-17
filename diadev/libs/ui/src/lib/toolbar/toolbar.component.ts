import { Component, Input } from '@angular/core';

@Component({
  selector: 'diadev-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() enableBackNavigation = false;
  @Input() title = '';
}
