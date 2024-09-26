import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTypeResultComponent } from './user-type-result.component';
import { FilterType, IQuickFindResult } from '../../store/quick-find.constant';

describe('UserTypeResultComponent', () => {

  type userType = FilterType.contact | FilterType.serviceAgent;

  async function setup(userType: userType = FilterType.contact, emailId: string | null = null) {

    const locale = {
      no_email_id: "[no email id]"
    }

    const userItem: IQuickFindResult = {
      userGuid: "userguid",
      type: userType,
      fullName: "full name",
      emailAddress: emailId,
      confidence: 1
    }

    TestBed.configureTestingModule({
      imports: [
        UserTypeResultComponent
      ]
    }).compileComponents();

    const fixture: ComponentFixture<UserTypeResultComponent> = TestBed.createComponent(UserTypeResultComponent);
    const component: UserTypeResultComponent = fixture.componentInstance;

    fixture.componentRef.setInput('locale', locale);
    fixture.componentRef.setInput('item', userItem);

    return {
      fixture,
      component,
      userItem,
      locale
    }
  }

  describe('constructor()', () => {

    it('should create instance', async () => {
      const { component } = await setup();

      expect(component).toBeTruthy();
    });

    it('locale should be defined', async () => {
      const { component } = await setup();

      expect(component.locale).toBeTruthy();
    })

    it('item should be defined', async () => {
      const { component } = await setup();

      expect(component.item).toBeTruthy();
    })

  })

  describe('icon()', () => {
    const contact_icon = 'contact_page';
    const agent_icon = 'person';

    it(`should return ${contact_icon} if the user type is contact`, async () => {
      const { component } = await setup(FilterType.contact);

      expect(component.icon()).toBe(contact_icon);
    })

    it(`should return ${agent_icon} if the user type is service agent`, async () => {
      const { component } = await setup(FilterType.serviceAgent);

      expect(component.icon()).toBe(agent_icon);
    })

  })

  describe('title()', () => {

    it('should return fullname', async () => {
      const { component, userItem } = await setup();

      expect(component.title()).toBe(userItem.fullName);
    })

  })

  describe('subtitle()', () => {

    it('should return emailAddress if available', async () => {
      const { component, userItem } = await setup(FilterType.contact, "emailId");

      expect(component.subtitle()).toBe(userItem.emailAddress);
    })

    it('should return emailAddress placeholder if emailAddress not available', async () => {
      const { component, locale } = await setup(FilterType.contact, null);

      expect(component.subtitle()).toBe(locale.no_email_id);
    })
  })

});
