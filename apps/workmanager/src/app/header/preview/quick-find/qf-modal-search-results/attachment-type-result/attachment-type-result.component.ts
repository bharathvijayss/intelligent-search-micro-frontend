import { Component, input } from '@angular/core';
import { QuickFindResult } from '../../store/dummy-data.constant';

@Component({
  selector: 'en8-attachment-type-result',
  standalone: true,
  templateUrl: './attachment-type-result.component.html',
  styleUrls: ['./attachment-type-result.component.scss']
})
export class AttachmentTypeResultComponent {

  item = input.required<QuickFindResult>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

  openFile() {
    // if (this.myDrop && this.myDrop.isOpen) {
    //   this.myDrop.close();
    // }
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
