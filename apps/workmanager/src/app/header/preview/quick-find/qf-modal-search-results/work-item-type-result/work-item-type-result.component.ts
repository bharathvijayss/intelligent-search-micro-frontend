import { Component, inject } from '@angular/core';
import { ProfileStore } from 'apps/workmanager/src/app/store/app-settings.store';

@Component({
  selector: 'en8-work-item-type-result',
  templateUrl: './work-item-type-result.component.html',
  styleUrls: ['./work-item-type-result.component.scss'],
  standalone: true
})
export class WorkItemTypeResultComponent {

  profileStore = inject(ProfileStore);

  // openWorkItem(workItem: any) {
  //   if (this.myDrop && this.myDrop.isOpen) {
  //     this.myDrop.close();
  //   }

  //   this.tabSrv.OpenWorkItem(
  //     workItem.GUID,
  //     workItem.PacketType
  //   );
  // }

  // assignAndOpen($event: Event, workItem: any) {
  //   if (this.myDrop) {
  //     this.myDrop.close();
  //   }

  //   if ($event) {
  //     $event.stopImmediatePropagation();
  //     $event.stopPropagation();

  //     this.masterSrv
  //       .SetAssignee(workItem.GUID, null, null, true, true)
  //       .pipe(
  //         tap(() => {
  //           this.openWorkItem(workItem);
  //         })
  //       )
  //       .subscribe();
  //   }
  // }

}
