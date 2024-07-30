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
