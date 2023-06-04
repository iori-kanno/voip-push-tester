/** Used to identify the message at the start of the notification.
 *  ex) slack needs to use ts. */
export type UniqueId = string;

// TODO: add other checker types
export type CheckerType = 'slack';

export interface Checkable {
  alert: (message: string) => Promise<UniqueId | undefined>;
  postLog: (log: string) => Promise<UniqueId | undefined>;
  /** Search for the target log from the id of the start notification
   *  and return true if it is confirmed, false if it is not. */
  confirmLogs: (id: UniqueId) => Promise<boolean>;
}
