import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttachmentTypeResultComponent } from './attachment-type-result.component';
import { FilterType, IQuickFindResult } from '../../store/quick-find.constant';
import { PacketCommunicationType, PacketFileSource } from '../../../../../shared/dto';

describe('AttachmentTypeResultComponent', () => {

  async function setup(
    packetTitle: string | null = null,
    packetCommunicationType: PacketCommunicationType = PacketCommunicationType.EmailIncoming,
    fileName: string | null = null
  ) {

    const locale = {
      no_title: "[no title]"
    }

    const attachmentItem: IQuickFindResult = {
      confidence: 0.5,
      fileName: fileName,
      guid: "guid",
      packetCommunicationType: packetCommunicationType,
      packetGUID: "packetguid",
      packetReference: "ref",
      packetTitle: packetTitle,
      source: PacketFileSource.EmailAttachment,
      type: FilterType.fileAttachmentToEmail
    }

    TestBed.configureTestingModule({
      imports: [
        AttachmentTypeResultComponent
      ]
    }).compileComponents();

    const fixture: ComponentFixture<AttachmentTypeResultComponent> = TestBed.createComponent(AttachmentTypeResultComponent);
    const component: AttachmentTypeResultComponent = fixture.componentInstance;

    fixture.componentRef.setInput('locale', locale);
    fixture.componentRef.setInput('item', attachmentItem);

    return {
      component,
      fixture,
      attachmentItem,
      locale
    }
  }

  describe('constructor()', () => {

    it('should create instance', async () => {
      const { component } = await setup();

      expect(component).toBeDefined();
    });

    it('locale should be defined', async () => {
      const { component } = await setup();

      expect(component.locale).toBeDefined();
    })

    it('icon should be defined with default value', async () => {
      const { component } = await setup();

      expect(component.icon).toBe("attach_file");
    })

    it('email_incoming_icon should be defined with default value', async () => {
      const { component } = await setup();

      expect(component.email_incoming_icon).toBe("arrow_downward_alt");
    })

    it('email_outgoing_icon should be defined with default value', async () => {
      const { component } = await setup();

      expect(component.email_outgoing_icon).toBe("arrow_upward_alt");
    })

    it('item should be defined', async () => {
      const { component } = await setup();

      expect(component.item).toBeDefined();
    })

  })

  describe('title()', () => {

    it('should return the fileName', async () => {
      const { component, attachmentItem } = await setup("packet_title", PacketCommunicationType.EmailIncoming, 'file_name');

      expect(component.title()).toBe(attachmentItem.fileName);
    })

    it('should return empty string if there is no filename', async () => {
      const { component } = await setup();

      expect(component.title()).toBe("");
    })

  })

  describe('subtitle()', () => {

    it('should return the packetReference and packetTitle when packetTitle is available', async () => {
      const { component, attachmentItem } = await setup("packet title");

      expect(component.subtitle()).toBe(`${attachmentItem.packetReference} ${attachmentItem.packetTitle}`);
    })

    it('should return the packetReference and no title placeholder when packetTitle is not available', async () => {
      const { component, attachmentItem, locale } = await setup();

      expect(component.subtitle()).toBe(`${attachmentItem.packetReference} ${locale.no_title}`);
    })

  })

  describe('isIncomingEmail()', () => {

    it('should return true when the packetCommunicationType is EmailIncoming', async () => {
      const { component } = await setup();

      expect(component.isIncomingEmail()).toBeTruthy();
    })

    it('should return false when the packetCommunicationType is EmailOutgoing', async () => {
      const { component } = await setup(null, PacketCommunicationType.EmailOutgoing);

      expect(component.isIncomingEmail()).toBeFalsy();
    })

  })

  describe('isOutgoingEmail()', () => {

    it('should return true when the packetCommunicationType is EmailOutgoing', async () => {
      const { component } = await setup(null, PacketCommunicationType.EmailOutgoing);

      expect(component.isOutgoingEmail()).toBeTruthy();
    })

    it('should return false when the packetCommunicationType is EmailIncoming', async () => {
      const { component } = await setup();

      expect(component.isOutgoingEmail()).toBeFalsy();
    })

  })

});
