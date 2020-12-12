import KEYS from "./keys";

export interface Command {
  name: string;
  icon: string;
  location: number;
  isAddAction: boolean;
  isBusy: boolean;
}

export interface RfCommand {
  name: string;
  icon: string;
  location: number;
  index: number;
  isOn: boolean;
  isVisible: boolean;
  isBusy: boolean;
}

export interface TcpCommand {
  name: string;
  icon: string;
  location: number;
  isVisible: boolean;
  key: KEYS;
  image: string;
  customHandling: () => void;
}
