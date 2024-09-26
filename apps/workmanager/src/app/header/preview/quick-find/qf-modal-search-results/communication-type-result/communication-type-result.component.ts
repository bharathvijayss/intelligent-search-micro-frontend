import { Component, computed, input, OnInit, SecurityContext } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { LocaleDatePipe } from './../../../../../shared/locale-date.pipe';
import { MatCardModule } from '@angular/material/card';
import { I18nPluralPipe } from '@angular/common';
import { ICommunicationItemResult } from '../../model/communication-item-result';
import { FilterType, IQuickFindResult } from '../../store/quick-find.constant';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'en8-communication-type-result',
  standalone: true,
  templateUrl: './communication-type-result.component.html',
  styleUrls: ['./communication-type-result.component.scss'],
  imports: [
    MatTooltip,
    TranslateModule,
    LocaleDatePipe,
    MatCardModule,
    I18nPluralPipe
  ]
})
export class CommunicationTypeResultComponent implements OnInit {

  item = input.required({
    transform: (val: IQuickFindResult) => (val as ICommunicationItemResult)
  });

  showContent = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

  attachmentMapping!: { [key: string]: string }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.attachmentMapping = {
      '=1': `${this.item().attachmentCount} ${this.locale().attachment}`,
      'other': `${this.item().attachmentCount} ${this.locale().attachments}`,
    }
  }

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

  isInboundEmail = computed(() => {
    return this.item().type === FilterType.inboundEmail;
  })

  action_icon = 'visibility';

  isEmailItem = computed(() => {
    return [FilterType.inboundEmail, FilterType.outboundEmail].includes(this.item().type);
  })

  title = computed(() => {
    let result = `${this.item().reference} ${this.item().title || this.locale().no_title}`;

    if (this.isEmailItem()) {
      result = `${(this.item().subject || this.locale().no_email_subject)}, ${result}`;
    }

    return result
  })

  subtitle = computed(() => {
    return `${this.item().fullName} (${(this.item().emailAddress || this.locale().no_email_id)})`;
  })

  content = computed(() => {
    // it is not possible to add an empty note but it is possible to send an empty email.

    // let body: string = this.item().body || this.locale().no_email_content;
    // body = body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
    // body = body.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    // const tag = document.createElement("div");
    // tag.innerHTML = body;
    // return tag.innerText;

    let body = this.item().body || this.locale().no_email_content;
    body = this.sanitizer.sanitize(SecurityContext.HTML, body);
    body = body.replace(/<\/?[^>]+(>|$)/gi, "");
    return body;
  })

  openCommunicationItem() {
    console.log('comm item opened');
    // this.tabSrv.OpenWorkItem(
    //   this.item().packetGuid,
    //   this.item().processType
    // );
  }

  viewContent($event: Event) {
    $event.stopImmediatePropagation();
    $event.stopPropagation();
    this.showContent = !this.showContent;
  }

}
