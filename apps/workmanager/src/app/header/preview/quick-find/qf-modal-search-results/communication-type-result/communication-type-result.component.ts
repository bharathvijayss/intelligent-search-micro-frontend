import { Component, computed, input } from '@angular/core';
import { communicationItemResult, QuickFindResult } from '../../store/dummy-data.constant';
import { FilterType } from '../../store/quick-find.service';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { LocaleDatePipe } from './../../../../../shared/locale-date.pipe';

@Component({
  selector: 'en8-communication-type-result',
  standalone: true,
  templateUrl: './communication-type-result.component.html',
  styleUrls: ['./communication-type-result.component.scss'],
  imports: [
    MatTooltip,
    TranslateModule,
    LocaleDatePipe
  ]
})
export class CommunicationTypeResultComponent {

  item = input.required({
    transform: (val: QuickFindResult) => (val as communicationItemResult)
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

  icon = computed(() => {
    let result = '';
    switch (this.item().type) {
      case FilterType.inboundEmail: {
        result = 'mail';
        break;
      }
      case FilterType.outboundEmail: {
        result = 'outgoing_mail';
        break;
      }
      case FilterType.selfServiceComments: {
        result = 'chat_bubble';
        break;
      }
      case FilterType.notes: {
        result = 'sticky_note_2';
        break;
      }
    }
    return result;
  })

  action_icon = 'visibility';

  isEmailItem = computed(() => {
    return [FilterType.inboundEmail, FilterType.outboundEmail].includes(this.item().type);
  })

  title = computed(() => {
    let result = `${this.item().Reference} ${this.item().Title || this.locale().no_title}`;

    if (this.isEmailItem()) {
      result = `${(this.item().Subject || this.locale().no_email_subject)}, ${result}`;
    }

    return result
  })

  subtitle = computed(() => {
    return `${this.item().FullName} (${(this.item().EmailAddress || this.locale().no_email_id)})`;
  })

  content = computed(() => {
    // it is not possible to add an empty note but it is possible to send an empty email.
    let body: string = this.item().Body || this.locale().no_email_content;
    body = body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
    body = body.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    const tag = document.createElement("div");
    tag.innerHTML = body;
    return tag.innerText;
  })

  openCommunicationItem() {
    console.log('comm item opened');
    // this.tabSrv.OpenWorkItem(
    //   this.item().PacketGUID,
    //   this.item().ProcessType
    // );
  }

  // not completed yet.
  viewContent($event: Event) {
    if ($event) {
      $event.stopImmediatePropagation();
      $event.stopPropagation();
    }
    console.log('view email content clicked');
  }


}
