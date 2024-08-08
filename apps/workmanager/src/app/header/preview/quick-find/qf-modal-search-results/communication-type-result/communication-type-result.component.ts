import { Component, input } from '@angular/core';
import { QuickFindResult } from '../../store/dummy-data.constant';

@Component({
  selector: 'en8-communication-type-result',
  standalone: true,
  templateUrl: './communication-type-result.component.html',
  styleUrls: ['./communication-type-result.component.scss']
})
export class CommunicationTypeResultComponent {

  item = input.required<QuickFindResult>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

  // openCommunicationItem(workItem: any) {
  //   if (this.myDrop && this.myDrop.isOpen) {
  //     this.myDrop.close();
  //   }

  //   this.tabSrv.OpenWorkItem(
  //     workItem.PacketGUID,
  //     workItem.ProcessType
  //   );
  // }

  // // not completed yet.
  // viewEmailContent($event: Event) {
  //   if ($event) {
  //     $event.stopImmediatePropagation();
  //     $event.stopPropagation();
  //   }
  // }


}
