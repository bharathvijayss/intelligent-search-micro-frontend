/**
* The status of the Due Date relative to 'now'.
*/
export enum RAGStatus {
  /**
   * To Be Determined
   */
  ToBeDetermined = -2,
  /**
   * Overdue
   */
  Overdue = -1,
  /**
   * Due Today
   */
  DueToday = 0,
  /**
   * Due in the Future
   */
  DueInFuture = 1
}

/**
 * The type of a Process
 */
export enum ProcessType {
  /**
   * Case
   */
  Case = 1,
  /**
   * Ticket
   */
  Ticket = 2,
  /**
   * Action
   */
  Action = 3
}

/**
 * The status of a Packet.
 */
export enum PacketStatus {
  /**
   * Draft
   */
  Draft = 0,
  /**
   * To do
   */
  ToDo = 1,
  /**
   * In progress
   */
  InProgress = 2,
  /**
   * Waiting
   */
  Waiting = 3,
  /**
   * Resolved
   */
  Resolved = 4,
  /**
   * Closed
   */
  Closed = 5
}


/**
 * How a Packet was resolved.
 */
export enum PacketResolutionMethod {

  /**
   * Communication with Service Recipient
   */
  CommunicationWithServiceRecipient = 0,

  /**
   * New Case launched
   */
  CaseLaunched = 1,

  /**
   * No customer response
   */
  NoCustomerResponse = 2,

  /**
   * Split into multiple Tickets
   */
  SplitIntoMultipleTickets = 3,

  /**
   * Merged into another Work Item
   */
  Merged = 4,

  /**
   * All Child Work Items Closed
   */
  AllChildWorkItemsClosed = 5,

  /**
   * Cancelled
   */
  Cancelled = 6,

  /**
   * Done successfully
   */
  DoneSuccessfully = 7,

  /**
   * Not done successfully
   */
  NotDoneSuccessfully = 9,

  /**
   * Case completed
   */
  CaseCompleted = 11,

  /**
   * Rework
   */
  Rework = 12,

  /**
   * End Case
   */
  EndCase = 13,

  /**
   * Rejected
   */
  Rejected = 100,

  /**
   * Rejected as SPAM
   */
  RejectedAsSpam = 101,

  /**
   * Rejected due to no configured email address matching recipient address
   */
  RejectedUnconfiguredEmailAddress = 102
}

/**
 * The type of an Action Type.
 */
export enum ActionSubType {
  /**
   * Manual
   */
  ManualAction = 0,
  /**
   * Manual with Peer Review
   */
  ManualwithPeerReviewAction = 1,
  /**
   * Send Email
   */
  SendEmailAction = 2,
  /**
   * Send Email and Wait
   */
  SendEmailandWaitAction = 3,
  /**
   * Start Case
   */
  StartCaseAction = 4,
  /**
   * Wait for Sub Cases to Complete
   */
  WaitForSubCasesToCompleteAction = 6,
  /**
   * Trigger External API
   */
  TriggerExternalAPIAction = 7,
  /**
   * End Case Action
   */
  EndCaseAction = 8,
  /**
   * Approval Action
   */
  ApprovalAction = 9,
  /**
   * IDP Data Extraction Action
   */
  IDPDataExtractionAction = 10,
  /**
   * AI Action
   */
  AiAction = 11
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

export enum DataFieldType {
  Packet = 0,
  EmailIncomingPacketCommunication = 1,
  EmailOutgoingPacketCommunication = 2,
  ESSCommentPacketCommunication = 3,
  AuditNotePacketCommunication = 4,
  PhoneIncomingPacketCommunication = 5,
  PhoneOutgoingPacketCommunication = 6,
  LetterIncomingPacketCommunication = 7,
  LetterOutgoingPacketCommunication = 8,
  PacketCommunicationContact = 9,
  PacketCommunicationAttachment = 10,
  PacketHyperlink = 11,
  PacketFile = 12,
  PacketContact = 13,
  PacketCustomData = 14,
  User = 15
}

export enum UserTypeFilter {
  Contact = 1,
  Operational = 2,
  EmployeeSelfService = 4,
  Robot = 8
}
