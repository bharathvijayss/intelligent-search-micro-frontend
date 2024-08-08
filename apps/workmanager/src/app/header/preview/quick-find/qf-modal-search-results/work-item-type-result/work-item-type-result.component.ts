import { Component, computed, inject, input } from '@angular/core';
import { ProfileStore } from './../../../../../store/app-settings.store';
import { QuickFindResult, workItemResult } from '../../store/dummy-data.constant';
import { FilterType } from '../../store/quick-find.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActionSubType, PacketStatus, RAGStatus } from './../../../../../shared/dto';
import { tap } from 'rxjs';
import { NgClass } from '@angular/common';
import { StatusPipe } from './../../../../../shared/status.pipe';
import { LocaleDatePipe } from './../../../../../shared/locale-date.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'en8-work-item-type-result',
  templateUrl: './work-item-type-result.component.html',
  styleUrls: ['./work-item-type-result.component.scss'],
  standalone: true,
  imports: [
    MatTooltipModule,
    NgClass,
    StatusPipe,
    TranslateModule,
    LocaleDatePipe
  ]
})
export class WorkItemTypeResultComponent {

  profileStore = inject(ProfileStore);

  item = input.required({
    transform: (val: QuickFindResult) => (val as workItemResult)
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

  icon = computed(() => {
    let result = '';
    switch (this.item().type) {
      case FilterType.case: {
        result = 'folder_open';
        break;
      }
      case FilterType.ticket: {
        result = 'confirmation_number';
        break;
      }
      case FilterType.action: {
        result = 'bolt';
        break;
      }
    }
    return result;
  })

  isClosedWork = computed(() => {
    return !!(this.item().EndDate);
  })

  title = computed(() => {
    return `${this.item().Reference} ${this.item().Title || this.locale().no_title}`
  })

  ragStatusClass = computed(() => {

    const ragStatus = this.item().RAGStatus;

    if (this.isClosedWork()) {
      return '';
    } else if (ragStatus === RAGStatus.Overdue) {
      return 'overdue';
    } else if (ragStatus === RAGStatus.DueToday) {
      return 'dueToday';
    } else if (ragStatus === RAGStatus.DueInFuture) {
      return 'dueInFuture';
    } else {
      // RAGStatus.ToBeDetermined
      return 'dueInFuture';
    }

  })

  isPaused = computed(() => {
    return !this.item().DueDate &&
      this.item().Status === PacketStatus.Waiting;
  })

  showPeerReviewInfo = computed(() => {
    return this.item().ActionSubType === ActionSubType.ManualwithPeerReviewAction &&
      !([PacketStatus.Resolved, PacketStatus.Closed].includes(this.item().Status))
  })

  actionIcon = 'back_hand';

  openWorkItem() {
    // this.tabSrv.OpenWorkItem(
    //   this.item().GUID,
    //   this.item().PacketType
    // );
    console.log('Tab Opened: ', this.item().GUID, this.item().PacketType);
  }

  assignAndOpen($event: Event) {
    // if ($event) {
    //   $event.stopImmediatePropagation();
    //   $event.stopPropagation();

    //   this.masterSrv
    //     .SetAssignee(this.item().GUID, null, null, true, true)
    //     .pipe(
    //       tap(() => {
    //         this.openWorkItem();
    //       })
    //     )
    //     .subscribe();
    // }
    console.log('Assign and Open: ', $event, this.item().GUID);
  }

}
