import { Component, Input } from '@angular/core';

@Component({
  selector: 'diadev-fab-icon-button',
  templateUrl: './fab-icon-button.component.html',
  styleUrls: ['./fab-icon-button.component.scss'],
})
export class FabIconButtonComponent {
  @Input() public icon = 'add';
  @Input() public color = 'primary';
}
