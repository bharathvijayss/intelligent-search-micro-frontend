import { DataFieldType, PacketCommunicationType, PacketStatus, ProcessType, RAGStatus, UserTypeFilter } from "./../../../../shared/dto";
import { ISearchResult } from "../model/search-result";

export const dummy_data: ISearchResult = {
  packetResult: {
    packetEntities: [
      {
        guid: "198f8b6d-d8ae-4252-a0ec-062010c9ff12",  //packetguid
        type: "Packet",
        dueDate: "2024-08-30T06:47:11.996Z",           // DueDate
        processType: ProcessType.Case,                 // packetType, type
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.Draft,                    // Status
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: "2024-08-30T06:47:11.996Z",           // EndDate
        title: "[EXTERNAL] Reference A; Reference B",  // Title
        reference: "665693-C",                         // Reference
        dataFieldId: "198f8b6d-d8ae-4252-a0ec-062010c9ff12",
        dataFieldType: DataFieldType.Packet,          // type
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
      },
      {
        guid: "ae7be98b-f24c-41df-8643-c6480f7ec3e7",
        type: "Packet",
        dueDate: "2022-11-02T22:21:54.617",
        processType: ProcessType.Ticket,
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.InProgress,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: null,
        title: "Without reference number",
        reference: "394157-T",
        dataFieldId: "ae7be98b-f24c-41df-8643-c6480f7ec3e7",
        dataFieldType: DataFieldType.Packet,
        dataFieldName: "string",
        confidence: 0.8,
        ragStatus: RAGStatus.Overdue,
        actionSubType: null,
        inPeerReview: null,
        timeRemainingWhenPaused: null,
        problem: false,
        newInformationReceived: true,
        canBeDoneByRobot: false,
        willBeDoneByRobot: true,
        relatedDataFields: []
      },
      {
        guid: "ae7be98b-f24c-41df-8643-c6480f7ec3e7",
        type: "Packet",
        dueDate: "2022-11-02T22:21:54.617",
        processType: ProcessType.Ticket,
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.InProgress,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: null,
        title: "Without reference number",
        reference: "394157-T",
        dataFieldId: "ae7be98b-f24c-41df-8643-c6480f7ec3e7",
        dataFieldType: DataFieldType.Packet,
        dataFieldName: "string",
        confidence: 0.8,
        ragStatus: RAGStatus.Overdue,
        actionSubType: null,
        inPeerReview: null,
        timeRemainingWhenPaused: null,
        problem: false,
        newInformationReceived: false,
        canBeDoneByRobot: false,
        willBeDoneByRobot: false,
        relatedDataFields: []
      },
      {
        guid: "901cd9b6-2a0b-439a-91f0-dae319227f97",
        type: "Packet",
        dueDate: "2023-03-31T11:33:51.377",
        processType: ProcessType.Action,
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.ToDo,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: null,
        title: "[EXTERNAL] Reference A; Reference B",
        reference: "665693-C-A2.1",
        dataFieldId: "901cd9b6-2a0b-439a-91f0-dae319227f97",
        dataFieldType: DataFieldType.Packet,
        dataFieldName: "string",
        confidence: 0.4,
        ragStatus: RAGStatus.Overdue,
        actionSubType: null,
        inPeerReview: null,
        timeRemainingWhenPaused: null,
        problem: false,
        newInformationReceived: false,
        canBeDoneByRobot: false,
        willBeDoneByRobot: false,
        relatedDataFields: []
      },
      {
        guid: "901cd9b6-2a0b-439a-91f0-dae319227f97",  // PacketGUID
        type: "Packet",
        dueDate: "2023-03-31T11:33:51.377",
        processType: ProcessType.Ticket,
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.ToDo,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: null,
        title: "[EXTERNAL] Reference A; Reference B",
        reference: "394157-T",
        dataFieldId: "b1d96588-3b93-4639-816b-ba2ba297bf7c",  // communication GUID
        dataFieldType: DataFieldType.EmailIncomingPacketCommunication,
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
        relatedDataFields: [
          {
            fieldName: 'body',
            data: "Reply from Naresh\r\n\r\nThanks & regards,\r\nNaresh Kumar Ale\r\nProduct Quality Engineer\r\n\r\nnaresh.ale@enate.io<mailto:naresh.ale@enate.io>  +91 8639 322 047\r\n\r\n[cid:image001.png@01DA5455.2CE06DF0]\r\n\r\nFrom: regression.development.payroll+773900-T@enate.net <regression.development.payroll+773900-T@enate.net>\r\nSent: Wednesday, January 31, 2024 2:50 PM\r\nTo: Kavya Yalla kavya.yalla@enate.io; Naresh Kumar Ale naresh.ale@enate.net; Lohith KV lohith.kv@enate.io; Priya Pandey priya.pandey@enate.net; Mohammed Muzzamil Mohammed.Muzzamil@enate.net; Gokul Prasanth gokul.prasanth@enate.net; Pavan KK Pavan.kk@enate.net; Manoj manoj@enate.net\r\nCc: Kavya Yalla kavya.yalla@enate.io; Naresh Kumar Ale naresh.ale@enate.net; Lohith KV lohith.kv@enate.io; Priya Pandey priya.pandey@enate.net; Mohammed Muzzamil Mohammed.Muzzamil@enate.net; Gokul Prasanth gokul.prasanth@enate.net; Pavan KK Pavan.kk@enate.net; Manoj manoj@enate.net\r\nSubject: 773900-T - test for unprocessed\r\n\r\nSome people who received this message don't often get email f ..."
          },
          {
            fieldName: 'logged',
            data: "2024-01-31T14:53:13.007"
          },
          {
            fieldName: 'fullName',
            data: "Naresh Kumar Ale"
          },
          {
            fieldName: 'emailAddress',
            data: 'bharath.vijay@enate.net'
          },
          {
            fieldName: 'subject',
            data: "RE: 773900-T - test for unprocessed"
          },
          {
            fieldName: 'attachmentCount',
            data: 0
          },
          {
            fieldName: 'importance',
            data: false
          },
        ]
      },
      {
        guid: "901cd9b6-2a0b-439a-91f0-dae319227f97",  // PacketGUID
        type: "Packet",
        dueDate: "2023-03-31T11:33:51.377",
        processType: ProcessType.Ticket,
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.ToDo,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: null,
        title: "[EXTERNAL] Reference A; Reference B",
        reference: "394157-T",
        dataFieldId: "b1d96588-3b93-4639-816b-ba2ba297bf7c",  // communication GUID
        dataFieldType: DataFieldType.EmailOutgoingPacketCommunication,
        dataFieldName: "string",
        confidence: 0.3,
        ragStatus: RAGStatus.Overdue,
        actionSubType: null,
        inPeerReview: null,
        timeRemainingWhenPaused: null,
        problem: false,
        newInformationReceived: false,
        canBeDoneByRobot: false,
        willBeDoneByRobot: false,
        relatedDataFields: [
          {
            fieldName: 'body',
            data: "Reply from Naresh\r\n\r\nThanks & regards,\r\nNaresh Kumar Ale\r\nProduct Quality Engineer\r\n\r\nnaresh.ale@enate.io<mailto:naresh.ale@enate.io>  +91 8639 322 047\r\n\r\n[cid:image001.png@01DA5455.2CE06DF0]\r\n\r\nFrom: regression.development.payroll+773900-T@enate.net <regression.development.payroll+773900-T@enate.net>\r\nSent: Wednesday, January 31, 2024 2:50 PM\r\nTo: Kavya Yalla kavya.yalla@enate.io; Naresh Kumar Ale naresh.ale@enate.net; Lohith KV lohith.kv@enate.io; Priya Pandey priya.pandey@enate.net; Mohammed Muzzamil Mohammed.Muzzamil@enate.net; Gokul Prasanth gokul.prasanth@enate.net; Pavan KK Pavan.kk@enate.net; Manoj manoj@enate.net\r\nCc: Kavya Yalla kavya.yalla@enate.io; Naresh Kumar Ale naresh.ale@enate.net; Lohith KV lohith.kv@enate.io; Priya Pandey priya.pandey@enate.net; Mohammed Muzzamil Mohammed.Muzzamil@enate.net; Gokul Prasanth gokul.prasanth@enate.net; Pavan KK Pavan.kk@enate.net; Manoj manoj@enate.net\r\nSubject: 773900-T - test for unprocessed\r\n\r\nSome people who received this message don't often get email f ..."
          },
          {
            fieldName: 'logged',
            data: "2024-01-31T14:53:13.007"
          },
          {
            fieldName: 'fullName',
            data: "Naresh Kumar Ale"
          },
          {
            fieldName: 'emailAddress',
            data: null
          },
          {
            fieldName: 'subject',
            data: "RE: 773900-T - test for unprocessed"
          },
          {
            fieldName: 'attachmentCount',
            data: 2
          },
          {
            fieldName: 'importance',
            data: false
          },
        ]
      },
      {
        guid: "901cd9b6-2a0b-439a-91f0-dae319227f97",  // PacketGUID
        type: "Packet",
        dueDate: "2023-03-31T11:33:51.377",
        processType: ProcessType.Ticket,
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.ToDo,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: null,
        title: "[EXTERNAL] Reference A; Reference B",
        reference: "394157-T",
        dataFieldId: "b1d96588-3b93-4639-816b-ba2ba297bf7c",  // Notes GUID
        dataFieldType: DataFieldType.AuditNotePacketCommunication,
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
        relatedDataFields: [
          {
            fieldName: 'body',
            data: "Core product notes"
          },
          {
            fieldName: 'fullName',
            data: "Naresh Kumar Ale"
          },
          {
            fieldName: 'emailAddress',
            data: null
          },
        ]
      },
      {
        guid: "901cd9b6-2a0b-439a-91f0-dae319227f97",  // PacketGUID
        type: "Packet",
        dueDate: "2023-03-31T11:33:51.377",
        processType: ProcessType.Ticket,               // ProcessType
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.ToDo,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: null,
        title: "[EXTERNAL] Reference A; Reference B",         // Title
        reference: "394157-T",                                // Reference
        dataFieldId: "b1d96588-3b93-4639-816b-ba2ba297bf7c",  // GUID
        dataFieldType: DataFieldType.ESSCommentPacketCommunication,  // type
        dataFieldName: "string",
        confidence: 0.2,
        ragStatus: RAGStatus.Overdue,
        actionSubType: null,
        inPeerReview: null,
        timeRemainingWhenPaused: null,
        problem: false,
        newInformationReceived: false,
        canBeDoneByRobot: false,
        willBeDoneByRobot: false,
        relatedDataFields: [
          {
            fieldName: 'body',
            data: "self service commented notes"
          },
          {
            fieldName: 'fullName',                          // not sure
            data: "Naresh Kumar Ale"
          },
          {
            fieldName: 'emailAddress',
            data: null
          },
        ]
      },
      {
        guid: "901cd9b6-2a0b-439a-91f0-dae319227f97",  // PacketGUID
        type: "Packet",
        dueDate: "2023-03-31T11:33:51.377",
        processType: ProcessType.Ticket,                     // PacketProcessType
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.ToDo,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: null,
        title: "[EXTERNAL] Reference A; Reference B",        // PacketTitle
        reference: "394157-T",                                // PacketReference
        dataFieldId: "b1d96588-3b93-4639-816b-ba2ba297bf7c",  // file GUID
        dataFieldType: DataFieldType.PacketCommunicationAttachment,  // source (or) type
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
        relatedDataFields: [
          {
            fieldName: 'fileName',
            data: "File Tag Issue(1).docx"
          },
          {
            fieldName: 'packetCommunicationType',
            data: PacketCommunicationType.EmailIncoming
          },
        ]
      },
      {
        guid: "901cd9b6-2a0b-439a-91f0-dae319227f97",  // PacketGUID
        type: "Packet",
        dueDate: "2023-03-31T11:33:51.377",
        processType: ProcessType.Ticket,                     // PacketProcessType
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.ToDo,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: null,
        title: "[EXTERNAL] Reference A; Reference B",        // PacketTitle
        reference: "394157-T",                                // PacketReference
        dataFieldId: "b1d96588-3b93-4639-816b-ba2ba297bf7c",  // file GUID
        dataFieldType: DataFieldType.PacketCommunicationAttachment,  // source (or) type
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
        relatedDataFields: [
          {
            fieldName: 'fileName',
            data: "File Tag Issue(1).docx"
          },
          {
            fieldName: 'packetCommunicationType',
            data: PacketCommunicationType.EmailOutgoing
          },
        ]
      },
      {
        guid: "901cd9b6-2a0b-439a-91f0-dae319227f97",  // PacketGUID
        type: "Packet",
        dueDate: "2023-03-31T11:33:51.377",
        processType: ProcessType.Ticket,                     // PacketProcessType
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: PacketStatus.ToDo,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: null,
        title: "[EXTERNAL] Reference A; Reference B",         // PacketTitle
        reference: "394157-T",                                // PacketReference
        dataFieldId: "b1d96588-3b93-4639-816b-ba2ba297bf7c",  // file GUID
        dataFieldType: DataFieldType.PacketFile,  // source (or) type
        dataFieldName: "string",
        confidence: 0.6,
        ragStatus: RAGStatus.Overdue,
        actionSubType: null,
        inPeerReview: null,
        timeRemainingWhenPaused: null,
        problem: false,
        newInformationReceived: false,
        canBeDoneByRobot: false,
        willBeDoneByRobot: false,
        relatedDataFields: [
          {
            fieldName: 'fileName',
            data: "Bank savings account 1.xlsx"
          },
          {
            fieldName: 'packetCommunicationType',
            data: null
          },
        ]
      },
    ],
    customDatas: [
      {
        guid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        type: "string",
        dataFieldType: "string",
        dataFieldName: "string",
        dataFieldValue: "string",
        confidence: 0
      }
    ]
  },
  userEntities: [
    {
      guid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",  // User GUID
      type: "user",
      userType: UserTypeFilter.Contact,              // external => type
      dataFieldType: "string",
      dataFieldName: "string",
      dataFieldValue: "string",
      relatedDataFields: [
        {
          fieldName: 'fullName',
          data: 'bharath vijay'
        },
        {
          fieldName: 'emailAddress',
          data: 'bharath.vijay@enate.net'
        },
      ],
      confidence: 0
    },
    {
      guid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",      // User GUID
      type: "user",
      userType: UserTypeFilter.Operational,              // internal => type
      dataFieldType: "string",
      dataFieldName: "string",
      dataFieldValue: "string",
      relatedDataFields: [
        {
          fieldName: 'fullName',
          data: 'bharath vijay'
        },
        {
          fieldName: 'emailAddress',
          data: 'bharath.vijay@enate.net'
        },
      ],
      confidence: 0
    }
  ],
  objectEntities: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      type: "string",
      dataField: {
        language: "string",
        name: "string",
        description: "string"
      },
      nameConfidence: 0,
      descriptionConfidence: 0
    }
  ],
  processResults: [
    {
      process: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        type: "string",
        dataField: {
          language: "string",
          name: "string",
          description: "string"
        },
        nameConfidence: 0,
        descriptionConfidence: 0
      },
      packet: {
        guid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        type: "string",
        dueDate: "2024-08-30T06:47:11.996Z",
        processType: 1,
        assignedToUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: 0,
        startDate: "2024-08-30T06:47:11.996Z",
        endDate: "2024-08-30T06:47:11.996Z",
        title: "string",
        reference: "string",
        ragStatus: RAGStatus.Overdue,
        actionSubType: null,
        inPeerReview: null,
        timeRemainingWhenPaused: null,
        problem: false,
        newInformationReceived: false,
        canBeDoneByRobot: false,
        willBeDoneByRobot: false,
      }
    }
  ]
}
