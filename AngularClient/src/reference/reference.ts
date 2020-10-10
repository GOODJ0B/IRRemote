export interface Controller {
  type:         string;
  name:         string;
  emitterGpio:  number;
  receiverGpio: number;
  commands:     { [key: string]: Command };
  description:  string;
}

export interface Command {
  type:            CommandType;
  name:            string;
  signalList:      SignalList[];
  description:     string;
  signalClassList: SignalClassList[];
}

export interface SignalClassList {
  type:    SignalClassListType;
  uid:     number;
  signals: number[];
  mean:    number;
  mode:    number;
  min:     number;
  max:     number;
  range:   number;
  id:      number;
}

export enum SignalClassListType {
  GapClass = 'apClass',
  PulseClass = 'PulseClass',
}

export interface SignalList {
  type:   SignalListType;
  length: number;
}

export enum SignalListType {
  Gap = 'Gap',
  Pulse = 'Pulse',
}

export enum CommandType {
  Command = 'Command',
}
