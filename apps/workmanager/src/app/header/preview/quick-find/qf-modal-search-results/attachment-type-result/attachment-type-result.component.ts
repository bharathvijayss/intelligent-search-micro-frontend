import { Component, computed, input } from '@angular/core';
import { attachmentItemResult, PacketCommunicationType, QuickFindResult } from '../../store/dummy-data.constant';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'en8-attachment-type-result',
  standalone: true,
  templateUrl: './attachment-type-result.component.html',
  styleUrls: ['./attachment-type-result.component.scss'],
  imports: [MatTooltip]
})
export class AttachmentTypeResultComponent {

  item = input.required({
    transform: (val: QuickFindResult) => (val as attachmentItemResult)
  });

  icon = 'attach_file';

  email_incoming_icon = 'arrow_downward_alt';

  email_outgoing_icon = 'arrow_upward_alt';

  title = computed(() => {
    return this.item().FileName;
  })

  subtitle = computed(() => {
    return `${this.item().PacketReference} ${this.item().PacketTitle || this.locale().no_title}`;
  })

  isIncomingEmail = computed(() => {
    return this.item().PacketCommunicationType === PacketCommunicationType.EmailIncoming;
  })

  isOutgoingEmail = computed(() => {
    return this.item().PacketCommunicationType === PacketCommunicationType.EmailOutgoing;
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

  openFile() {
    // window.open(this.getFileURL(), "_blank");
  }

  private getFileURL() {
    // if (this.item().Source === 0) {
    //   return [
    //     AService.getURI("/Packet/GetPacketFile"),
    //     "?source=0&forceDownload=false&packetGUID=",
    //     this.item().PacketGUID,
    //     "&fileGUID=",
    //     this.item().GUID,
    //   ].join("");
    // } else {
    //   return [
    //     AService.getURI(
    //       "/PacketCommunication/GetPacketCommunicationAttachment"
    //     ),
    //     "?forceDownload=false&packetCommunicationAttachmentGUID=",
    //     this.item().GUID,
    //   ].join("");
    // }
  }

}
