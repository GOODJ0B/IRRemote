export interface Command {
  name: string;
  icon: string;
  location: number;
  isAddAction: boolean;
}

export interface RfCommand {
  name: string;
  icon: string;
  location: number;
  index: number;
  isOn: boolean;
  isVisible: boolean;
}
