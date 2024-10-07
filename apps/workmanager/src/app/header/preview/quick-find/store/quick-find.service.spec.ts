import { TestBed } from "@angular/core/testing";
import { QuickFindService } from "./quick-find.service";
import { DataFieldType, PacketCommunicationType, PacketFileSource, PacketStatus, ProcessType, RAGStatus, UserTypeFilter } from '../../../../shared/dto';
import { IPacketEntities } from "../model/search-result";
import { FilterType } from "./quick-find.constant";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe('Service: QuickFind', () => {

  function setup() {

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        QuickFindService
      ],
    })

    const serviceUnderTest = TestBed.inject(QuickFindService);

    return {
      serviceUnderTest
    }
  }

  describe('processWorkItemData()', () => {

    function processWorkItemDataSetup(
      processType: ProcessType = ProcessType.Case,
      filterType: FilterType = FilterType.case
    ) {

      const { serviceUnderTest } = setup();

      const data: IPacketEntities = {
        guid: "198f8b6d-d8ae-4252-a0ec-062010c9ff12",
        type: "Packet",
        dueDate: "2024-08-30T06:47:11.996Z",
        processType: processType,
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.Draft,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: "2024-08-30T06:47:11.996Z",
        title: "[EXTERNAL] Reference A; Reference B",
        reference: "665693-C",
        dataFieldId: "198f8b6d-d8ae-4252-a0ec-062010c9ff12",
        dataFieldType: DataFieldType.Packet,
        dataFieldName: "string",
        confidence: 0.5,
        ragStatus: RAGStatus.Overdue,
        actionSubType: null,
        inPeerReview: null,
        timeRemainingWhenPaused: null,
        problem: false,
        newInformationReceived: false,
        canBeDoneByRobot: false,
        willBeDoneByRobot: false,
        relatedDataFields: []
      };

      const expectedRes = {
        guid: data.guid,
        packetType: data.processType,
        type: filterType,
        reference: data.reference,
        title: data.title,
        dueDate: data.dueDate,
        status: data.status,
        endDate: data.endDate,
        ragStatus: data.ragStatus,
        newInformationReceived: data.newInformationReceived,
        timeRemainingWhenPaused: data.timeRemainingWhenPaused,
        problem: data.problem,
        canBeDoneByRobot: data.canBeDoneByRobot,
        willBeDoneByRobot: data.willBeDoneByRobot,
        actionSubType: data.actionSubType,
        inPeerReview: data.inPeerReview,
        confidence: data.confidence
      }

      return { serviceUnderTest, data, expectedRes };
    }

    it('should process case work item data correctly', () => {
      const { serviceUnderTest, data, expectedRes } = processWorkItemDataSetup();

      const result = serviceUnderTest.processWorkItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });

    it('should process ticket work item data correctly', () => {
      const { serviceUnderTest, data, expectedRes } = processWorkItemDataSetup(ProcessType.Ticket, FilterType.ticket);

      const result = serviceUnderTest.processWorkItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });

    it('should process action work item data correctly', () => {
      const { serviceUnderTest, data, expectedRes } = processWorkItemDataSetup(ProcessType.Action, FilterType.action);

      const result = serviceUnderTest.processWorkItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });

  });

  describe('processCommItemData()', () => {

    function processCommItemDataSetup(
      dataFieldType: DataFieldType = DataFieldType.EmailIncomingPacketCommunication,
      filterType: FilterType = FilterType.inboundEmail,
      relatedDataFieldsExist = true
    ) {

      const { serviceUnderTest } = setup();

      const emailBody = relatedDataFieldsExist ? 'email_body' : null;
      const emailId = relatedDataFieldsExist ? 'emailID' : null;
      const loggedDt = relatedDataFieldsExist ? "2024-01-31T14:53:13.007" : null;
      const subject = relatedDataFieldsExist ? 'subject' : null;
      const attachmentCount = relatedDataFieldsExist ? 0 : null;
      const importance = relatedDataFieldsExist ? false : null;
      const fname = relatedDataFieldsExist ? 'fname' : null;

      const data = {
        guid: "901cd9b6-2a0b-439a-91f0-dae319227f97",
        type: "Packet",
        dueDate: "2023-03-31T11:33:51.377",
        processType: ProcessType.Ticket,
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.ToDo,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: null,
        title: "[EXTERNAL] Reference A; Reference B",
        reference: "394157-T",
        dataFieldId: "b1d96588-3b93-4639-816b-ba2ba297bf7c",
        dataFieldType: dataFieldType,
        dataFieldName: "string",
        confidence: 0.9,
        ragStatus: RAGStatus.Overdue,
        actionSubType: null,
        inPeerReview: null,
        timeRemainingWhenPaused: null,
        problem: false,
        newInformationReceived: false,
        canBeDoneByRobot: false,
        willBeDoneByRobot: false,
        relatedDataFields: relatedDataFieldsExist ? [
          {
            fieldName: 'body',
            data: emailBody
          },
          {
            fieldName: 'logged',
            data: loggedDt
          },
          {
            fieldName: 'fullName',
            data: fname
          },
          {
            fieldName: 'emailAddress',
            data: emailId
          },
          {
            fieldName: 'subject',
            data: subject
          },
          {
            fieldName: 'attachmentCount',
            data: attachmentCount
          },
          {
            fieldName: 'importance',
            data: importance
          },
        ] : []
      }

      const expectedRes = {
        type: filterType,
        packetGuid: data.guid,
        processType: data.processType,
        guid: data.dataFieldId,
        reference: data.reference,
        title: data.title,
        confidence: data.confidence,
        body: emailBody,
        emailAddress: emailId,
        logged: loggedDt,
        subject: subject,
        attachmentCount: attachmentCount,
        importance: importance,
        fullName: fname,
      }

      return { serviceUnderTest, data, expectedRes };
    }

    it('should process incoming communication item data correctly', () => {
      const { serviceUnderTest, data, expectedRes } = processCommItemDataSetup();

      const result = serviceUnderTest.processCommItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });

    it('should process outgoing communication item data correctly', () => {
      const { serviceUnderTest, data, expectedRes } = processCommItemDataSetup(DataFieldType.EmailOutgoingPacketCommunication, FilterType.outboundEmail);

      const result = serviceUnderTest.processCommItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });

    it('should process self service comments data correctly', () => {
      const { serviceUnderTest, data, expectedRes } = processCommItemDataSetup(DataFieldType.ESSCommentPacketCommunication, FilterType.selfServiceComments);

      const result = serviceUnderTest.processCommItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });

    it('should process notes data correctly', () => {
      const { serviceUnderTest, data, expectedRes } = processCommItemDataSetup(DataFieldType.AuditNotePacketCommunication, FilterType.notes);

      const result = serviceUnderTest.processCommItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });

    it('should process notes data correctly with no related data fields available', () => {
      const { serviceUnderTest, data, expectedRes } = processCommItemDataSetup(DataFieldType.AuditNotePacketCommunication, FilterType.notes, false);

      const result = serviceUnderTest.processCommItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });

  });

  describe('processAttachmentItemData()', () => {

    function processAttachmentItemDataSetup(
      dataFieldType: DataFieldType = DataFieldType.PacketCommunicationAttachment,
      filterType: FilterType = FilterType.fileAttachmentToEmail,
      packetSource: PacketFileSource = PacketFileSource.EmailAttachment,
      relatedDataFieldsExist = true
    ) {
      const { serviceUnderTest } = setup();

      const fileName = relatedDataFieldsExist ? 'fileName' : null;
      const packetCommType = relatedDataFieldsExist ? PacketCommunicationType.EmailIncoming : null;

      const data = {
        guid: "901cd9b6-2a0b-439a-91f0-dae319227f97",
        type: "Packet",
        dueDate: "2023-03-31T11:33:51.377",
        processType: ProcessType.Ticket,
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.ToDo,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: null,
        title: "[EXTERNAL] Reference A; Reference B",
        reference: "394157-T",
        dataFieldId: "b1d96588-3b93-4639-816b-ba2ba297bf7c",
        dataFieldType: dataFieldType,
        dataFieldName: "string",
        confidence: 0.7,
        ragStatus: RAGStatus.Overdue,
        actionSubType: null,
        inPeerReview: null,
        timeRemainingWhenPaused: null,
        problem: false,
        newInformationReceived: false,
        canBeDoneByRobot: false,
        willBeDoneByRobot: false,
        relatedDataFields: relatedDataFieldsExist ? [
          {
            fieldName: 'fileName',
            data: fileName
          },
          {
            fieldName: 'packetCommunicationType',
            data: packetCommType
          },
        ] : []
      }

      const expectedRes = {
        type: filterType,
        source: packetSource,
        fileName: fileName,
        packetGUID: data.guid,
        packetReference: data.reference,
        packetTitle: data.title,
        guid: data.dataFieldId,
        packetCommunicationType: packetCommType,
        confidence: data.confidence
      }

      return {
        serviceUnderTest,
        data,
        expectedRes
      }
    }

    it('should process email attachment item data correctly', () => {
      const { serviceUnderTest, data, expectedRes } = processAttachmentItemDataSetup();

      const result = serviceUnderTest.processAttachmentItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });

    it('should process packet attachment item data correctly', () => {
      const { serviceUnderTest, data, expectedRes } = processAttachmentItemDataSetup(
        DataFieldType.PacketFile,
        FilterType.fileAttachmentToPacket,
        PacketFileSource.AttachedToPacket
      );

      const result = serviceUnderTest.processAttachmentItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });

    it('should process packet attachment item data correctly with no related data fields', () => {
      const { serviceUnderTest, data, expectedRes } = processAttachmentItemDataSetup(
        DataFieldType.PacketFile,
        FilterType.fileAttachmentToPacket,
        PacketFileSource.AttachedToPacket,
        false
      );

      const result = serviceUnderTest.processAttachmentItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });

  });

  describe('processUserItemData()', () => {

    function processUserItemDataSetup(
      userType: UserTypeFilter = UserTypeFilter.Contact,
      filterType: FilterType = FilterType.contact,
      relatedDataFieldsExist = true
    ) {
      const { serviceUnderTest } = setup();

      const fullName = relatedDataFieldsExist ? 'fullname' : null;
      const emailAddress = relatedDataFieldsExist ? 'emailId' : null;

      const data = {
        guid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        type: "user",
        userType: userType,
        dataFieldType: "string",
        dataFieldName: "string",
        dataFieldValue: "string",
        relatedDataFields: relatedDataFieldsExist ? [
          {
            fieldName: 'fullName',
            data: fullName
          },
          {
            fieldName: 'emailAddress',
            data: emailAddress
          },
        ] : [],
        confidence: 0
      };

      const expectedRes = {
        userGuid: data.guid,
        type: filterType,
        fullName: fullName,
        emailAddress: emailAddress,
        confidence: data.confidence
      };

      return {
        serviceUnderTest,
        data,
        expectedRes
      }
    }

    it('should process contact user item data correctly', () => {
      const { serviceUnderTest, data, expectedRes } = processUserItemDataSetup();

      const result = serviceUnderTest.processUserItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });

    it('should process service agent user item data correctly', () => {
      const { serviceUnderTest, data, expectedRes } = processUserItemDataSetup(UserTypeFilter.Operational, FilterType.serviceAgent);

      const result = serviceUnderTest.processUserItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });

    it('should process service agent user item data correctly with no related data fields', () => {
      const { serviceUnderTest, data, expectedRes } = processUserItemDataSetup(UserTypeFilter.Operational, FilterType.serviceAgent, false);

      const result = serviceUnderTest.processUserItemData(data);

      expect(result).toStrictEqual(expectedRes);
    });
  });

  // describe('getSearchResultForQuery()', () => {

  // });

});
