enum FilterType {
  case = 'case',
  ticket = 'ticket',
  action = 'action',
  contact = 'contact',
  serviceAgent = 'serviceAgent',
  inboundEmail = 'inboundEmail',
  outboundEmail = 'outboundEmail',
  selfServiceComments = 'selfServiceComments',
  notes = 'notes',
  fileAttachmentToPacket = 'fileAttachmentToPacket',
  fileAttachmentToEmail = 'fileAttachmentToEmail',
}

export interface workItemResult {
  "GUID": string,
  "PacketType": number,
  "type": FilterType,
  "Reference": string,
  "Title": null | string,
  "DueDate": null | string,
  "Status": number,
  "RAGStatus": number,
  "NewInformationReceived": boolean,
  "EndDate": null | string,
  "TimeRemainingWhenPaused": null | string | number,
  "Problem": boolean,
  "CanBeDoneByRobot": boolean,
  "WillBeDoneByRobot": boolean,
  "ActionSubType": null | number,
  "InPeerReview": boolean,
}

export interface userItemResult {
  "UserGUID": string,
  "type": FilterType,
  "FullName": string,
  "EmailAddress": string,
}

export interface communicationItemResult {
  "type": FilterType,
  "PacketGUID": string,
  "ProcessType": number,
  "Body": string,
  "GUID": string,
  "Logged": string,
  "FullName": string,
  "EmailAddress": null | string,
  "Reference": string,
  "Title": null | string,
  "Subject"?: string,
  "AttachmentCount"?: number,
  "Importance": boolean | null;
}

/**
 * The source of a Packet File.
 */
export enum PacketFileSource {
  /**
   * Attached to Packet
   */
  AttachedToPacket = 0,
  /**
   * Attached to an Email
   */
  EmailAttachment = 1,
  /**
   * Temporary Attachment
   */
  TemporaryAttachment = 2
}

/**
 * The type of Packet Communication.
 */
export enum PacketCommunicationType {
  /**
   * Email Outgoing
   */
  EmailOutgoing = 0,
  /**
   * Phone Incoming
   */
  PhoneIncoming = 1,
  /**
   * Email Incoming
   */
  EmailIncoming = 2,
  /**
   * Self Service Comment
   */
  ESSComment = 3,
  /**
   * Note
   */
  AuditNote = 4,
  /**
   * Phone Outgoing
   */
  PhoneOutgoing = 5,
  /**
   * Letter Incoming
   */
  LetterIncoming = 6,
  /**
   * Letter Outgoing
   */
  LetterOutgoing = 7
}

export interface attachmentItemResult {
  "type": FilterType,
  "Source": PacketFileSource | null,
  "FileName": string,
  "LastUpdatedOn": string,
  "PacketGUID": string,
  "PacketReference": string,
  "PacketTitle": string,
  "PacketProcessType": number,
  "GUID": string,
  "PacketCommunicationType": PacketCommunicationType | null
}

export type QuickFindResult = workItemResult | communicationItemResult | attachmentItemResult | userItemResult

export interface ISearchResult {
  "search_results": QuickFindResult[]
}

export const dummy_data: ISearchResult = {
  "search_results": [
    {
      "GUID": "198f8b6d-d8ae-4252-a0ec-062010c9ff12",
      "PacketType": 1,
      "type": FilterType.case,
      "Reference": "665693-C",
      "Title": "[EXTERNAL] Reference A; Reference B",
      "DueDate": "2023-04-06T11:30:49.327",
      "Status": 0,
      "RAGStatus": -1,
      "NewInformationReceived": false,
      "EndDate": null,
      "TimeRemainingWhenPaused": null,
      "Problem": false,
      "CanBeDoneByRobot": false,
      "WillBeDoneByRobot": false,
      "ActionSubType": null,
      "InPeerReview": false,
    },
    {
      "GUID": "198f8b6d-d8ae-4252-a0ec-062010c9ff12",
      "PacketType": 1,
      "type": FilterType.case,
      "Reference": "665693-C",
      "Title": "[EXTERNAL] Reference A; Reference B[EXTERNAL] Reference A; Reference B[EXTERNAL] Reference A; Reference B[EXTERNAL] Reference A; Reference B[EXTERNAL] Reference A; Reference B[EXTERNAL] Reference A; Reference B[EXTERNAL] Reference A; Reference B[EXTERNAL] Reference A; Reference B[EXTERNAL] Reference A; Reference B",
      "DueDate": null,
      "Status": 1,
      "RAGStatus": -2,
      "NewInformationReceived": true,
      "EndDate": null,
      "TimeRemainingWhenPaused": null,
      "Problem": false,
      "CanBeDoneByRobot": false,
      "WillBeDoneByRobot": false,
      "ActionSubType": null,
      "InPeerReview": false,
    },
    {
      "GUID": "198f8b6d-d8ae-4252-a0ec-062010c9ff12",
      "PacketType": 1,
      "type": FilterType.case,
      "Reference": "665693-C",
      "Title": null,
      "DueDate": "2023-04-06T11:30:49.327",
      "Status": 2,
      "RAGStatus": 0,
      "NewInformationReceived": false,
      "EndDate": null,
      "TimeRemainingWhenPaused": null,
      "Problem": false,
      "CanBeDoneByRobot": false,
      "WillBeDoneByRobot": false,
      "ActionSubType": null,
      "InPeerReview": false,
    },
    {
      "GUID": "198f8b6d-d8ae-4252-a0ec-062010c9ff12",
      "PacketType": 1,
      "type": FilterType.case,
      "Reference": "665693-C",
      "Title": "",
      "DueDate": "2023-04-06T11:30:49.327",
      "Status": 2,
      "RAGStatus": 1,
      "NewInformationReceived": false,
      "EndDate": null,
      "TimeRemainingWhenPaused": null,
      "Problem": true,
      "CanBeDoneByRobot": false,
      "WillBeDoneByRobot": false,
      "ActionSubType": null,
      "InPeerReview": false,
    },
    {
      "GUID": "198f8b6d-d8ae-4252-a0ec-062010c9ff12",
      "PacketType": 1,
      "type": FilterType.case,
      "Reference": "665693-C",
      "Title": "",
      "DueDate": null,
      "Status": 3,
      "RAGStatus": 1,
      "NewInformationReceived": true,
      "EndDate": null,
      "TimeRemainingWhenPaused": null,
      "Problem": false,
      "CanBeDoneByRobot": false,
      "WillBeDoneByRobot": false,
      "ActionSubType": null,
      "InPeerReview": false,
    },
    {
      "GUID": "198f8b6d-d8ae-4252-a0ec-062010c9ff12",
      "PacketType": 1,
      "type": FilterType.case,
      "Reference": "665693-C",
      "Title": "",
      "DueDate": null,
      "Status": 3,
      "RAGStatus": 1,
      "NewInformationReceived": true,
      "EndDate": null,
      "TimeRemainingWhenPaused": "1.01:30:00",
      "Problem": false,
      "CanBeDoneByRobot": false,
      "WillBeDoneByRobot": false,
      "ActionSubType": null,
      "InPeerReview": false,
    },
    {
      "GUID": "198f8b6d-d8ae-4252-a0ec-062010c9ff12",
      "PacketType": 1,
      "type": FilterType.case,
      "Reference": "665693-C",
      "Title": "",
      "DueDate": null,
      "Status": 3,
      "RAGStatus": 1,
      "NewInformationReceived": true,
      "EndDate": null,
      "TimeRemainingWhenPaused": "-1.01:30:00",
      "Problem": false,
      "CanBeDoneByRobot": false,
      "WillBeDoneByRobot": false,
      "ActionSubType": null,
      "InPeerReview": false,
    },
    {
      "GUID": "198f8b6d-d8ae-4252-a0ec-062010c9ff12",
      "PacketType": 1,
      "type": FilterType.case,
      "Reference": "665693-C",
      "Title": "Closed Work Item",
      "DueDate": "2023-04-06T11:30:49.327",
      "Status": 4,
      "RAGStatus": -1,
      "NewInformationReceived": true,
      "EndDate": null,
      "TimeRemainingWhenPaused": null,
      "Problem": false,
      "CanBeDoneByRobot": false,
      "WillBeDoneByRobot": false,
      "ActionSubType": null,
      "InPeerReview": false,
    },
    {
      "GUID": "198f8b6d-d8ae-4252-a0ec-062010c9ff12",
      "PacketType": 1,
      "type": FilterType.case,
      "Reference": "665693-C",
      "Title": "[EXTERNAL] Reference A; Reference B",
      "DueDate": "2023-04-06T11:30:49.327",
      "Status": 5,
      "RAGStatus": -1,
      "NewInformationReceived": false,
      "EndDate": "2023-04-06T11:30:49.327",
      "TimeRemainingWhenPaused": null,
      "Problem": false,
      "CanBeDoneByRobot": false,
      "WillBeDoneByRobot": false,
      "ActionSubType": null,
      "InPeerReview": false,
    },
    {
      "GUID": "ae7be98b-f24c-41df-8643-c6480f7ec3e7",
      "PacketType": 2,
      "type": FilterType.ticket,
      "Reference": "394157-T",
      "Title": "Without reference number",
      "DueDate": "2022-11-02T22:21:54.617",
      "Status": 2,
      "RAGStatus": 0,
      "NewInformationReceived": false,
      "EndDate": null,
      "TimeRemainingWhenPaused": null,
      "Problem": false,
      "CanBeDoneByRobot": false,
      "WillBeDoneByRobot": false,
      "ActionSubType": null,
      "InPeerReview": false,
    },
    {
      "GUID": "901cd9b6-2a0b-439a-91f0-dae319227f97",
      "PacketType": 3,
      "type": FilterType.action,
      "Reference": "665693-C-A2.1",
      "Title": "[EXTERNAL] Reference A; Reference B",
      "DueDate": "2023-03-31T11:33:51.377",
      "Status": 1,
      "RAGStatus": -1,
      "NewInformationReceived": false,
      "EndDate": null,
      "TimeRemainingWhenPaused": null,
      "Problem": false,
      "CanBeDoneByRobot": false,
      "WillBeDoneByRobot": false,
      "ActionSubType": null,
      "InPeerReview": false,
    },
    {
      "GUID": "901cd9b6-2a0b-439a-91f0-dae319227f97",
      "PacketType": 3,
      "type": FilterType.action,
      "Reference": "665693-C-A2.1",
      "Title": "[EXTERNAL] Reference A; Reference B",
      "DueDate": "2023-03-31T11:33:51.377",
      "Status": 1,
      "RAGStatus": -1,
      "NewInformationReceived": false,
      "EndDate": null,
      "TimeRemainingWhenPaused": null,
      "Problem": false,
      "CanBeDoneByRobot": true,
      "WillBeDoneByRobot": true,
      "ActionSubType": null,
      "InPeerReview": false,
    },
    {
      "GUID": "901cd9b6-2a0b-439a-91f0-dae319227f97",
      "PacketType": 3,
      "type": FilterType.action,
      "Reference": "665693-C-A2.1",
      "Title": "[EXTERNAL] Reference A; Reference B",
      "DueDate": "2023-03-31T11:33:51.377",
      "Status": 1,
      "RAGStatus": -1,
      "NewInformationReceived": false,
      "EndDate": null,
      "TimeRemainingWhenPaused": null,
      "Problem": false,
      "CanBeDoneByRobot": true,
      "WillBeDoneByRobot": false,
      "ActionSubType": null,
      "InPeerReview": false,
    },
    {
      "GUID": "901cd9b6-2a0b-439a-91f0-dae319227f97",
      "PacketType": 3,
      "type": FilterType.action,
      "Reference": "665693-C-A2.1",
      "Title": "[EXTERNAL] Reference A; Reference B",
      "DueDate": "2023-03-31T11:33:51.377",
      "Status": 1,
      "RAGStatus": -1,
      "NewInformationReceived": false,
      "EndDate": null,
      "TimeRemainingWhenPaused": null,
      "Problem": false,
      "CanBeDoneByRobot": false,
      "WillBeDoneByRobot": false,
      "ActionSubType": 1,
      "InPeerReview": true,
    },
    {
      "GUID": "901cd9b6-2a0b-439a-91f0-dae319227f97",
      "PacketType": 3,
      "type": FilterType.action,
      "Reference": "665693-C-A2.1",
      "Title": "[EXTERNAL] Reference A; Reference B",
      "DueDate": "2023-03-31T11:33:51.377",
      "Status": 1,
      "RAGStatus": -1,
      "NewInformationReceived": false,
      "EndDate": null,
      "TimeRemainingWhenPaused": null,
      "Problem": false,
      "CanBeDoneByRobot": false,
      "WillBeDoneByRobot": false,
      "ActionSubType": 1,
      "InPeerReview": false,
    },
    {
      "UserGUID": "29221aca-e653-47b6-846c-73e41fe3ed2d",
      "FullName": "Agent 1 Full Name",
      "EmailAddress": "agent1@test.net",
      "type": FilterType.contact,
    },
    {
      "UserGUID": "29221aca-e653-47b6-846c-73e41fe3ed2d",
      "FullName": "Agent 2 Full Name ref testref testref testref testref testref testref testref testref testref testref testref testref testref test",
      "EmailAddress": "agent2@test.net",
      "type": FilterType.contact,
    },
    {
      "UserGUID": "ed386409-17eb-4203-a4b3-b907d79f90dd",
      "FullName": "Contact 1 Full Name",
      "EmailAddress": "contact1@enate.net",
      "type": FilterType.serviceAgent,
    },
    {
      "UserGUID": "ed386409-17eb-4203-a4b3-b907d79f90dd",
      "FullName": "Contact 2 Full Name",
      "EmailAddress": "",
      "type": FilterType.serviceAgent,
    },
    {
      "type": FilterType.inboundEmail,
      "PacketGUID": "2f504c46-8c39-4265-ac93-87c2f0756f99",
      "ProcessType": 2,
      "Body": "Reply from Naresh\r\n\r\nThanks & regards,\r\nNaresh Kumar Ale\r\nProduct Quality Engineer\r\n\r\nnaresh.ale@enate.io<mailto:naresh.ale@enate.io>  +91 8639 322 047\r\n\r\n[cid:image001.png@01DA5455.2CE06DF0]\r\n\r\nFrom: regression.development.payroll+773900-T@enate.net <regression.development.payroll+773900-T@enate.net>\r\nSent: Wednesday, January 31, 2024 2:50 PM\r\nTo: Kavya Yalla kavya.yalla@enate.io; Naresh Kumar Ale naresh.ale@enate.net; Lohith KV lohith.kv@enate.io; Priya Pandey priya.pandey@enate.net; Mohammed Muzzamil Mohammed.Muzzamil@enate.net; Gokul Prasanth gokul.prasanth@enate.net; Pavan KK Pavan.kk@enate.net; Manoj manoj@enate.net\r\nCc: Kavya Yalla kavya.yalla@enate.io; Naresh Kumar Ale naresh.ale@enate.net; Lohith KV lohith.kv@enate.io; Priya Pandey priya.pandey@enate.net; Mohammed Muzzamil Mohammed.Muzzamil@enate.net; Gokul Prasanth gokul.prasanth@enate.net; Pavan KK Pavan.kk@enate.net; Manoj manoj@enate.net\r\nSubject: 773900-T - test for unprocessed\r\n\r\nSome people who received this message don't often get email f ...",
      "GUID": "b1d96588-3b93-4639-816b-ba2ba297bf7c",
      "Logged": "2024-01-31T14:53:13.007",
      "FullName": "Naresh Kumar Ale", // new
      "EmailAddress": null, // new
      "Subject": "RE: 773900-T - test for unprocessed",
      "Reference": "665693-C",
      "Title": "[EXTERNAL] Reference A; Reference B",
      "AttachmentCount": 0,
      "Importance": false // change in data type
    },
    {
      "type": FilterType.inboundEmail,
      "PacketGUID": "2f504c46-8c39-4265-ac93-87c2f0756f99",
      "ProcessType": 2,
      "Body": "Reply from Naresh\r\n\r\nThanks & regards,\r\nNaresh Kumar Ale\r\nProduct Quality Engineer\r\n\r\nnaresh.ale@enate.io<mailto:naresh.ale@enate.io>  +91 8639 322 047\r\n\r\n[cid:image001.png@01DA5455.2CE06DF0]\r\n\r\nFrom: regression.development.payroll+773900-T@enate.net <regression.development.payroll+773900-T@enate.net>\r\nSent: Wednesday, January 31, 2024 2:50 PM\r\nTo: Kavya Yalla kavya.yalla@enate.io; Naresh Kumar Ale naresh.ale@enate.net; Lohith KV lohith.kv@enate.io; Priya Pandey priya.pandey@enate.net; Mohammed Muzzamil Mohammed.Muzzamil@enate.net; Gokul Prasanth gokul.prasanth@enate.net; Pavan KK Pavan.kk@enate.net; Manoj manoj@enate.net\r\nCc: Kavya Yalla kavya.yalla@enate.io; Naresh Kumar Ale naresh.ale@enate.net; Lohith KV lohith.kv@enate.io; Priya Pandey priya.pandey@enate.net; Mohammed Muzzamil Mohammed.Muzzamil@enate.net; Gokul Prasanth gokul.prasanth@enate.net; Pavan KK Pavan.kk@enate.net; Manoj manoj@enate.net\r\nSubject: 773900-T - test for unprocessed\r\n\r\nSome people who received this message don't often get email f ...",
      "GUID": "b1d96588-3b93-4639-816b-ba2ba297bf7c",
      "Logged": "2024-01-31T14:53:13.007",
      "FullName": "Naresh Kumar Ale", // new
      "EmailAddress": "naresh.ale@enate.net", // new
      "Subject": "",
      "Reference": "665693-C",
      "Title": "[EXTERNAL] Reference A; Reference B",
      "AttachmentCount": 1,
      "Importance": true
    },
    {
      "type": FilterType.outboundEmail,
      "PacketGUID": "20f8c1c8-8acc-4c00-b6c8-0eab1f610542",
      "ProcessType": 2,
      "Logged": "2024-01-31T14:33:40.2",
      "FullName": "Harish Narayanappa", // new
      "EmailAddress": "harish.narayanappa1@enate.net", // new
      "Subject": "773909-T - test (2)",
      "Reference": "665693-C",
      "Title": "[EXTERNAL] Reference A; Reference B",
      "AttachmentCount": 2,
      "Body": "Dear Sir / Madam,\r\nYour ticket has been logged with reference number 773909-T and is being reviewed.\r\nTicket Description:\r\ntest\r\nIf you would like to add additional comments, then please do so by replying to this email.\r\nRegards,\r\nClaudine Richardson\r\nclaudine.richardson@enate.net\r\nCurrent Development\r\n\r\n\r\n\r\nPlease provide feedback:\r\n<https://qa22lb01.enate.engineering/currentdevelopment//feedbackForm.html?packetGUID=20f8c1c8-8acc-4c00-b6c8-0eab1f610542&feedbackScore=1><https://qa22lb01.enate.engineering/currentdevelopment//feedbackForm.html?packetGUID=20f8c1c8-8acc-4c00-b6c8-0eab1f610542&feedbackScore=2><https://qa22lb01.enate.engineering/currentdevelopment//feedbackForm.html?packetGUID=20f8c1c8-8acc-4c00-b6c8-0eab1f610542&feedbackScore=3><https://qa22lb01.enate.engineering/currentdevelopment//feedbackForm.html?packetGUID=20f8c1c8-8acc-4c00-b6c8-0eab1f610542&feedbackScore=4><https://qa22lb01.enate.engineering/currentdevelopment//feedbackForm.html?packetGUID=20f8c1c8-8acc-4c00-b6c8-0eab1f610542&feedbackSc ...",
      "GUID": "cbd0b284-983b-431c-8470-6a0b8dcfefad",
      "Importance": false
    },
    {
      "type": FilterType.selfServiceComments,
      "PacketGUID": "bfad39a4-06ef-4af0-b969-0f27eda59a74",
      "ProcessType": 3,
      "GUID": "c5595c05-1301-4c31-9744-11bc2d9dc8fe",
      "Logged": "2023-12-04T15:00:50.12",
      "FullName": "Shalini Rudresh", // new
      "EmailAddress": "Shalini.Rudresh@enate.net", // new
      "Reference": "665693-C", // new
      "Title": "[EXTERNAL] Reference A; Reference B", // new
      "Body": "self service commented notes",
      "Importance": null
    },
    {
      "type": FilterType.notes,
      "PacketGUID": "bfad39a4-06ef-4af0-b969-0f27eda59a74",
      "ProcessType": 3,
      "GUID": "c5595c05-1301-4c31-9744-11bc2d9dc8fe",
      "Logged": "2023-12-04T15:00:50.12",
      "FullName": "Shalini Rudresh", // new
      "EmailAddress": "Shalini.Rudresh@enate.net", // new
      "Reference": "665693-C", // new
      "Title": "[EXTERNAL] Reference A; Reference B", // new
      "Body": "core product Notes",
      "Importance": null
    },
    {
      "type": FilterType.fileAttachmentToPacket,
      "Source": PacketFileSource.AttachedToPacket,
      "FileName": "Bank savings account 1.xlsx",
      "LastUpdatedOn": "2024-05-26T22:56:19.57",
      "PacketGUID": "2ca018ae-c61c-4a5e-997d-6e8b55610f8d",
      "PacketReference": "773948-C",
      "PacketTitle": "Intelligent Search",
      "PacketProcessType": 1,
      "GUID": "c0168818-5be0-41d0-a972-8c888a75ecbe",
      "PacketCommunicationType": null
    },
    {
      "type": FilterType.fileAttachmentToEmail,
      "Source": PacketFileSource.EmailAttachment,
      "FileName": "File Tag Issue(1).docx",
      "GUID": "684fccf6-5409-4240-b952-4f42b659daf8",
      "PacketGUID": "4c4652dc-a631-4b11-b5ca-2aef6ccda3e6",
      "PacketReference": "324732-C-A1.1",
      "PacketTitle": "Case with Steps ",
      "PacketProcessType": 3,
      "LastUpdatedOn": "2022-07-11T19:46:50.613",
      "PacketCommunicationType": PacketCommunicationType.EmailIncoming
    },
    {
      "type": FilterType.fileAttachmentToEmail,
      "Source": PacketFileSource.EmailAttachment,
      "FileName": "File Tag Issue(1).docx",
      "GUID": "684fccf6-5409-4240-b952-4f42b659daf8",
      "PacketGUID": "4c4652dc-a631-4b11-b5ca-2aef6ccda3e6",
      "PacketReference": "324732-C-A1.1",
      "PacketTitle": "",
      "PacketProcessType": 3,
      "LastUpdatedOn": "2022-07-11T19:46:50.613",
      "PacketCommunicationType": PacketCommunicationType.EmailOutgoing
    }
  ]
}
