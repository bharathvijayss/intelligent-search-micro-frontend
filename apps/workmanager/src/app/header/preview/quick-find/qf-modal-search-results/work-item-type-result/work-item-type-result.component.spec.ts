import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkItemTypeResultComponent } from './work-item-type-result.component';
import { FilterType, IQuickFindResult } from '../../store/quick-find.constant';
import { TranslateService } from '@ngx-translate/core';
import { provideAutoSpy } from 'jest-auto-spies';
import { ActionSubType, PacketStatus, RAGStatus } from '../../../../../shared/dto';

describe('WorkItemTypeResultComponent', () => {

  type itemType = FilterType.case | FilterType.action | FilterType.ticket;

  async function setup(
    itemType: itemType = FilterType.case,
    endDate: string | null = null,
    title: string | null = null,
    ragStatus: RAGStatus | null = null,
    dueDate: string | null = null,
    packetStatus: PacketStatus = PacketStatus.ToDo,
    actionSubType: ActionSubType | null = null
  ) {

    const locale = {
      no_title: "[no_title]"
    }

    const workItem: IQuickFindResult = {
      guid: "guid",
      packetType: 1,
      type: itemType,
      reference: "ref",
      title: title,
      dueDate: dueDate,
      status: packetStatus,
      endDate: endDate,
      ragStatus: ragStatus,
      newInformationReceived: false,
      timeRemainingWhenPaused: "timeRemaining",
      problem: false,
      canBeDoneByRobot: false,
      willBeDoneByRobot: false,
      actionSubType: actionSubType,
      inPeerReview: false,
      confidence: 0.5,
    }

    TestBed.configureTestingModule({
      imports: [WorkItemTypeResultComponent],
      providers: [
        provideAutoSpy(TranslateService)
      ]
    }).compileComponents();

    const fixture: ComponentFixture<WorkItemTypeResultComponent> = TestBed.createComponent(WorkItemTypeResultComponent);
    const component: WorkItemTypeResultComponent = fixture.componentInstance;

    fixture.componentRef.setInput('locale', locale);
    fixture.componentRef.setInput('item', workItem);

    return {
      fixture,
      component,
      workItem,
      locale
    }
  }

  describe('constructor()', () => {

    const actionIcon = 'back_hand';

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

    it('profileStore should be defined', async () => {
      const { component } = await setup();

      expect(component.profileStore).toBeTruthy();
    })

    it(`actionIcon should be defined with default value ${actionIcon}`, async () => {
      const { component } = await setup();

      expect(component.actionIcon).toBe(actionIcon);
    })

  })

  describe('icon()', () => {

    const case_icon = 'folder_open';
    const ticket_icon = 'confirmation_number';
    const action_icon = 'bolt';

    it(`should return ${case_icon} when the item type is case`, async () => {
      const { component } = await setup(FilterType.case);

      expect(component.icon()).toBe(case_icon);
    })

    it(`should return ${ticket_icon} when the item type is ticket`, async () => {
      const { component } = await setup(FilterType.ticket);

      expect(component.icon()).toBe(ticket_icon);
    })

    it(`should return ${action_icon} when the item type is action`, async () => {
      const { component } = await setup(FilterType.action);

      expect(component.icon()).toBe(action_icon);
    })

  })

  describe('isClosedWork()', () => {

    it('should return true if endDate is available', async () => {
      const { component } = await setup(FilterType.case, 'endDate');

      expect(component.isClosedWork()).toBeTruthy();
    })

    it('should return false if endDate is not available', async () => {
      const { component } = await setup(FilterType.case, null);

      expect(component.isClosedWork()).toBeFalsy();
    })

  })

  describe('title()', () => {

    it('should return reference and title if both are available', async () => {
      const { component, workItem } = await setup(FilterType.case, null, "title");

      expect(component.title()).toBe(`${workItem.reference} ${workItem.title}`)
    })

    it('should return reference and title placeholder if title is not available', async () => {
      const { component, workItem, locale } = await setup(FilterType.case, null, null);

      expect(component.title()).toBe(`${workItem.reference} ${locale.no_title}`)
    })

  })

  describe('ragStatusClass()', () => {

    const overDue = 'overdue';
    const dueToday = 'dueToday';
    const dueInFuture = 'dueInFuture';

    it('should return empty string if the work item is already closed', async () => {
      const { component } = await setup(FilterType.case, "endDate", "title");

      expect(component.ragStatusClass()).toBe("")
    })

    it(`should return ${overDue} when the ragStatus is overdue`, async () => {
      const { component } = await setup(FilterType.case, null, "title", RAGStatus.Overdue);

      expect(component.ragStatusClass()).toBe(overDue)
    })

    it(`should return ${dueToday} when the ragStatus is dueToday`, async () => {
      const { component } = await setup(FilterType.case, null, "title", RAGStatus.DueToday);

      expect(component.ragStatusClass()).toBe(dueToday)
    })

    it(`should return ${dueInFuture} when the ragStatus is dueInFuture`, async () => {
      const { component } = await setup(FilterType.case, null, "title", RAGStatus.DueInFuture);

      expect(component.ragStatusClass()).toBe(dueInFuture)
    })

    it(`should return ${dueInFuture} when the ragStatus is not available`, async () => {
      const { component } = await setup(FilterType.case, null, "title", null);

      expect(component.ragStatusClass()).toBe(dueInFuture)
    })

  })

  describe('isPaused()', () => {

    it('should return true when the dueDate is not available and work item status is waiting', async () => {
      const { component } = await setup(FilterType.case, null, null, null, null, PacketStatus.Waiting);

      expect(component.isPaused()).toBeTruthy();
    })

    it('should return false when the dueDate is available', async () => {
      const { component } = await setup(FilterType.case, null, null, null, "dueDate", PacketStatus.Waiting);

      expect(component.isPaused()).toBeFalsy();
    })

    it('should return false when the work item status is not waiting', async () => {
      const { component } = await setup(FilterType.case, null, null, null, null, PacketStatus.ToDo);

      expect(component.isPaused()).toBeFalsy();
    })

  })

  describe('showPeerReviewInfo()', () => {

    it('should return true if the action subtype is manual with peer review action and packet is neither resolved nor closed', async () => {
      const { component } = await setup(FilterType.action, null, null, null, null, PacketStatus.InProgress, ActionSubType.ManualwithPeerReviewAction);

      expect(component.showPeerReviewInfo()).toBeTruthy();
    })

    it('should return false if the action subtype is not manual with peer review action', async () => {
      const { component } = await setup(FilterType.action, null, null, null, null, PacketStatus.InProgress, ActionSubType.ManualAction);

      expect(component.showPeerReviewInfo()).toBeFalsy();
    })

    it('should return false if the action is in resolved state', async () => {
      const { component } = await setup(FilterType.action, null, null, null, null, PacketStatus.Resolved, ActionSubType.ManualwithPeerReviewAction);

      expect(component.showPeerReviewInfo()).toBeFalsy();
    })

    it('should return false if the action is in closed state', async () => {
      const { component } = await setup(FilterType.action, null, null, null, null, PacketStatus.Closed, ActionSubType.ManualwithPeerReviewAction);

      expect(component.showPeerReviewInfo()).toBeFalsy();
    })

  })

});
