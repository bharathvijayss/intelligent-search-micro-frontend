import { Component, computed, inject, input } from '@angular/core';
import { ProfileStore } from './../../../../../store/app-settings.store';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActionSubType, PacketStatus, RAGStatus } from './../../../../../shared/dto';
import { NgClass } from '@angular/common';
import { StatusPipe } from './../../../../../shared/status.pipe';
import { LocaleDatePipe } from './../../../../../shared/locale-date.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { TimespanToTextPipe } from './../../../../../shared/timespan-to-text.pipe';
import { IWorkItemResult } from '../../model/work-item-result';
import { FilterType, IQuickFindResult } from '../../store/quick-find.constant';

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
    LocaleDatePipe,
    TimespanToTextPipe
  ]
})
export class WorkItemTypeResultComponent {

  profileStore = inject(ProfileStore);

  item = input.required({
    transform: (val: IQuickFindResult) => (val as IWorkItemResult)
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
    return !!(this.item().endDate);
  })

  title = computed(() => {
    return `${this.item().reference} ${this.item().title || this.locale().no_title}`
  })

  ragStatusClass = computed(() => {

    const ragStatus = this.item().ragStatus;

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
    return !this.item().dueDate &&
      this.item().status === PacketStatus.Waiting;
  })

  showPeerReviewInfo = computed(() => {
    return this.item().actionSubType === ActionSubType.ManualwithPeerReviewAction &&
      !([PacketStatus.Resolved, PacketStatus.Closed].includes(this.item().status))
  })

  actionIcon = 'back_hand';

  openWorkItem() {
    // this.tabSrv.OpenWorkItem(
    //   this.item().guid,
    //   this.item().packetType
    // );
    console.log('Tab Opened: ', this.item().guid, this.item().packetType);
  }

  assignAndOpen($event: Event) {
    // if ($event) {
    //   $event.stopImmediatePropagation();
    //   $event.stopPropagation();

    //   this.masterSrv
    //     .SetAssignee(this.item().guid, null, null, true, true)
    //     .pipe(
    //       tap(() => {
    //         this.openWorkItem();
    //       })
    //     )
    //     .subscribe();
    // }
    console.log('Assign and Open: ', $event, this.item().guid);
  }

}
