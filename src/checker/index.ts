import { appConfig } from '../settings';
import { slack } from './slack';
import { Checkable, CheckerType } from './types';

export class Checker implements Checkable {
  protected checker: Checkable;

  constructor(type: CheckerType) {
    this.checker = this.selectChecker(type);
  }

  alert: (message: string) => Promise<string> = async (message: string) => {
    console.debug('Checker.alert: ' + message);
    if (appConfig.env.DRYRUN) {
      console.log(
        'Checker.alert: ' + message + ' is not fired, because of DRYRUN MODE'
      );
      return '';
    }
    return this.checker.alert(message);
  };

  postLog: (log: string) => Promise<string> = async (log: string) => {
    console.debug('Checker.postLog: ' + log);
    if (appConfig.env.DRYRUN) {
      console.log(
        'Checker.postLog: ' + log + ' is not fired, because of DRYRUN MODE'
      );
      return '';
    }
    return this.checker.postLog(log);
  };

  confirmLogs: (id: string) => Promise<boolean> = async (id: string) => {
    console.debug('Checker.confirmLogs: ' + id);
    if (appConfig.env.DRYRUN) {
      console.log(
        'Checker.confirmLogs: ' + id + ' is not fired, because of DRYRUN MODE'
      );
      return appConfig.env.IS_CONFIRMED;
    }
    return this.checker.confirmLogs(id);
  };

  private selectChecker = (type: CheckerType): Checkable => {
    switch (type) {
      case 'slack':
        return slack;
      default:
        return slack;
    }
  };
}
