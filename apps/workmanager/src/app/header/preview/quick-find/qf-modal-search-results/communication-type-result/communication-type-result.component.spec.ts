import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunicationTypeResultComponent } from './communication-type-result.component';
import { FilterType, IQuickFindResult } from '../../store/quick-find.constant';

describe('CommunicationTypeResultComponent', () => {

  type commType = FilterType.inboundEmail | FilterType.outboundEmail | FilterType.selfServiceComments | FilterType.notes;

  async function setup(
    itemType: commType = FilterType.inboundEmail,
    title: string | null = null,
    emailSub: string | null = null,
    emailAddress: string | null = null,
    contentBody: string | null = null
  ) {

    const locale = {
      no_title: "[no title]",
      no_email_subject: "[no email subject]",
      no_email_id: "[no email id]",
      no_email_content: "no email content",
      attachment: 'attachment',
      attachments: 'attachments'
    }

    const attachmentItem: IQuickFindResult = {
      type: itemType,
      packetGuid: "packetGuid",
      processType: 1,
      body: contentBody,
      guid: "guid",
      emailAddress: emailAddress,
      reference: "ref",
      title: title,
      logged: "logged Date",
      subject: emailSub,
      attachmentCount: 1,
      importance: true,
      fullName: "fullname",
      confidence: 1
    }

    const customEvent = {
      stopImmediatePropagation: jest.fn(),
      stopPropagation: jest.fn()
    } as unknown as Event

    TestBed.configureTestingModule({
      imports: [
        CommunicationTypeResultComponent
      ]
    }).compileComponents();

    const fixture: ComponentFixture<CommunicationTypeResultComponent> = TestBed.createComponent(CommunicationTypeResultComponent);
    const component: CommunicationTypeResultComponent = fixture.componentInstance;

    fixture.componentRef.setInput('locale', locale);
    fixture.componentRef.setInput('item', attachmentItem);

    return {
      fixture,
      component,
      attachmentItem,
      locale,
      customEvent
    }
  }

  describe('constructor()', () => {

    const action_icon = 'visibility';

    it('should create instance', async () => {
      const { component } = await setup();

      expect(component).toBeDefined();
    });

    it('locale should be defined', async () => {
      const { component } = await setup();

      expect(component.locale).toBeDefined();
    })

    it('showContent should be defined with default value of false', async () => {
      const { component } = await setup();

      expect(component.showContent).toBeFalsy();
    })

    it(`action_icon should be defined with default value of ${action_icon}`, async () => {
      const { component } = await setup();

      expect(component.action_icon).toBe(action_icon);
    })

    it('item should be defined', async () => {
      const { component } = await setup();

      expect(component.item).toBeDefined();
    })

    it('attachmentMapping should be undefined', async () => {
      const { component } = await setup();

      expect(component.attachmentMapping).toBeUndefined();
    })

  })

  describe('ngOnInit()', () => {

    it('should define the attachmentMapping with specified structure', async () => {
      const { component, attachmentItem, locale } = await setup();

      component.ngOnInit();

      expect(component.attachmentMapping).toBeDefined();
      expect(component.attachmentMapping).toEqual({
        '=1': `${attachmentItem.attachmentCount} ${locale.attachment}`,
        'other': `${attachmentItem.attachmentCount} ${locale.attachments}`
      });
    })

  })

  describe('icon()', () => {

    const incomingMail = 'mail';
    const outgoingMail = 'outgoing_mail';
    const ssComments = 'chat_bubble';
    const notes = 'sticky_note_2';

    it(`should return ${incomingMail} when the item type is inboundEmail`, async () => {
      const { component } = await setup(FilterType.inboundEmail);

      expect(component.icon()).toBe(incomingMail);
    })

    it(`should return ${outgoingMail} when the item type is outboundEmail`, async () => {
      const { component } = await setup(FilterType.outboundEmail);

      expect(component.icon()).toBe(outgoingMail);
    })

    it(`should return ${ssComments} when the item type is selfServiceComments`, async () => {
      const { component } = await setup(FilterType.selfServiceComments);

      expect(component.icon()).toBe(ssComments);
    })

    it(`should return ${notes} when the item type is notes`, async () => {
      const { component } = await setup(FilterType.notes);

      expect(component.icon()).toBe(notes);
    })

  })

  describe('isInboundEmail()', () => {

    it('should return true when the item type is inboundEmail', async () => {
      const { component } = await setup(FilterType.inboundEmail);

      expect(component.isInboundEmail()).toBeTruthy();
    })

    it('should return false when the item type is not inboundEmail', async () => {
      const { component } = await setup(FilterType.outboundEmail);

      expect(component.isInboundEmail()).toBeFalsy();
    })

  })

  describe('isEmailItem()', () => {

    it('should return true when the item type is inboundEmail', async () => {
      const { component } = await setup(FilterType.inboundEmail);

      expect(component.isEmailItem()).toBeTruthy();
    })

    it('should return true when the item type is outboundEmail', async () => {
      const { component } = await setup(FilterType.outboundEmail);

      expect(component.isEmailItem()).toBeTruthy();
    })

    it('should return false when the item type is selfServiceComments', async () => {
      const { component } = await setup(FilterType.selfServiceComments);

      expect(component.isEmailItem()).toBeFalsy();
    })

    it('should return false when the item type is notes', async () => {
      const { component } = await setup(FilterType.notes);

      expect(component.isEmailItem()).toBeFalsy();
    })

  })

  describe('title()', () => {

    it('should return reference and title alone if the item type is not an email', async () => {
      const { component, attachmentItem } = await setup(FilterType.notes, "title");

      expect(component.title()).toBe(`${attachmentItem.reference} ${attachmentItem.title}`)
    })

    it('should return reference and no title placeholder alone if the item type is not an email and title is not available', async () => {
      const { component, attachmentItem, locale } = await setup(FilterType.notes, null);

      expect(component.title()).toBe(`${attachmentItem.reference} ${locale.no_title}`)
    })

    it('should return subject, reference and title if the item type is an email', async () => {
      const { component, attachmentItem } = await setup(FilterType.inboundEmail, "title", "email Subject");

      expect(component.title()).toBe(`${attachmentItem.subject}, ${attachmentItem.reference} ${attachmentItem.title}`)
    })

    it('should return no email subject placeholder, reference and title if the item type is an email and email subject is not available', async () => {
      const { component, attachmentItem, locale } = await setup(FilterType.inboundEmail, "title", null);

      expect(component.title()).toBe(`${locale.no_email_subject}, ${attachmentItem.reference} ${attachmentItem.title}`)
    })

  })

  describe('subtitle()', () => {

    it('should return fullname and emailaddress if both are available', async () => {
      const { component, attachmentItem } = await setup(FilterType.inboundEmail, "title", "emailsub", "emailaddress");

      expect(component.subtitle()).toBe(`${attachmentItem.fullName} (${attachmentItem.emailAddress})`)
    })

    it('should return fullname and no emailaddress placeholder if emailaddress is not available', async () => {
      const { component, attachmentItem, locale } = await setup();

      expect(component.subtitle()).toBe(`${attachmentItem.fullName} (${locale.no_email_id})`)
    })

  })

  describe('viewContent', () => {

    it('should call stopImmediatePropagation() and stopPropagation() only once', async () => {
      const { component, customEvent } = await setup();

      component.viewContent(customEvent)

      expect(customEvent.stopImmediatePropagation).toHaveBeenCalledTimes(1);
      expect(customEvent.stopPropagation).toHaveBeenCalledTimes(1);
    })

    it('should toggle the showContent value from false to true and viceversa on each invocation', async () => {
      const { component, customEvent } = await setup();

      component.viewContent(customEvent);

      expect(component.showContent).toBeTruthy();

      component.viewContent(customEvent);

      expect(component.showContent).toBeFalsy();
    })

  })



});
