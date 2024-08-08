import { Component, input } from '@angular/core';
import { QuickFindResult } from '../../store/dummy-data.constant';

@Component({
  selector: 'en8-user-type-result',
  standalone: true,
  templateUrl: './user-type-result.component.html',
  styleUrls: ['./user-type-result.component.scss']
})
export class UserTypeResultComponent {

  item = input.required<QuickFindResult>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

  // openContact(contact: any) {
  //   if (this.myDrop && this.myDrop.isOpen) {
  //     this.myDrop.close();
  //   }
  //   this.tabSrv.OpenContact(contact.UserGUID);
  // }

}
