import { Component, computed, input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { IAttachmentItemResult } from '../../model/attachment-item-result';
import { PacketCommunicationType } from './../../../../../shared/dto';
import { IQuickFindResult } from '../../store/quick-find.constant';

@Component({
  selector: 'en8-attachment-type-result',
  standalone: true,
  templateUrl: './attachment-type-result.component.html',
  styleUrls: ['./attachment-type-result.component.scss'],
  imports: [MatTooltip]
})
export class AttachmentTypeResultComponent {

  item = input.required({
    transform: (val: IQuickFindResult) => (val as IAttachmentItemResult)
  });

  icon = 'attach_file';

  email_incoming_icon = 'arrow_downward_alt';

  email_outgoing_icon = 'arrow_upward_alt';

  title = computed(() => {
    return this.item().fileName ?? "";
  })

  subtitle = computed(() => {
    return `${this.item().packetReference} ${this.item().packetTitle || this.locale().no_title}`;
  })

  isIncomingEmail = computed(() => {
    return this.item().packetCommunicationType === PacketCommunicationType.EmailIncoming;
  })

  isOutgoingEmail = computed(() => {
    return this.item().packetCommunicationType === PacketCommunicationType.EmailOutgoing;
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

  openFile() {
    // window.open(this.getFileURL(), "_blank");
  }

  private getFileURL() {
    // if (this.item().source === 0) {
    //   return [
    //     AService.getURI("/Packet/GetPacketFile"),
    //     "?source=0&forceDownload=false&packetGUID=",
    //     this.item().packetGUID,
    //     "&fileGUID=",
    //     this.item().guid,
    //   ].join("");
    // } else {
    //   return [
    //     AService.getURI(
    //       "/PacketCommunication/GetPacketCommunicationAttachment"
    //     ),
    //     "?forceDownload=false&packetCommunicationAttachmentGUID=",
    //     this.item().guid,
    //   ].join("");
    // }
  }

}
