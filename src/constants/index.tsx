export const radioInput = [
  { name: "Radio selection 1", value: "1" },
  { name: "Radio selection 2", value: "2" },
  { name: "Radio selection 3", value: "3" },
];

export const passwordDefault = "****";

export const option = [
  "Dropdown option",
  "Dropdown option 1",
  "Dropdown option 2",
  "Dropdown option 3",
  "Dropdown option 4",
  "Dropdown option 5",
];

interface InputItem {
  label: string;
  value: string;
  type: string;
  placeHolder: string;
  error: string;
  min: number;
  max: number;
  note?: string;
  setPassword?: (id: any) => void;
  onChangePassword?: () => void;
  blurPassword?: () => void;
}

export const inputText: InputItem[] = [
  {
    label: "Username",
    value: "userName",
    type: "text",
    placeHolder: "Enter username",
    error: "You need enter username",
    min: 1,
    max: 30,
  },
  {
    label: "Password",
    value: "password",
    placeHolder: "Enter password",
    type: "password",
    note: "Your password is between 4 and 12 characters",
    error: "You need enter password",
    min: 4,
    max: 12,
  },
  {
    label: "Input Text Label",
    value: "note",
    type: "text",
    placeHolder: "Typing here",
    error: "You need enter Text Label",
    min: 1,
    max: 30,
  },
];
