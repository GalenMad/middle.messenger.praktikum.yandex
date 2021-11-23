declare module '*.pug';
declare module '*.svg';

interface PropsAttributes {
  [key: string]: string;
}

interface PropsEvent {
  type: keyof ElementEventMap | string | [];
  selector?: string;
  cb: (this: Element, ev: Event) => any;
}

interface Props {
  [key: string]: Function | unknown | string;
  events?: PropsEvent[];
  attributes?: PropsAttributes;
}

interface FormProps extends Props {
  submitCallback: (data: { [key: string]: unknown }) => void;
  fields: FormField[]
}

interface FormField extends Props {
  label: string,
  id: string,
  name: string,
  value: string,
  validators?: Array<(value: any) => boolean | string>;
}

interface UserInfo {
  [key: string]: string;
}

interface UserProfileItem {
  name: string;
  value: string | number;
}

interface ChatItem {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: {
    user: {
      first_name: string,
      second_name: string,
      avatar: string,
      emai: string,
      login: string,
      phone: string
    },
    time: string,
    content: string
  }
}

interface GlobalStore {
  messages: { [index: number]: {}[] };
  activeSocket: WebSocket;
  sockets: { [index: number]: WebSocket };
  isAuthorized: boolean;
  activeChat: ChatItem;
  chatList: ChatItem[];
  userInfo: UserInfo;
  chatsUsers: { [index: number]: string[] }
  userProfile: UserProfileItem[];
  changeInfoFields: FormField[];
}

interface RequestOptions {
  timeout?: number,
  data?: { [key: string]: any } | FormData,
  method?: string,
  headers?: Record<string, string>
}

interface RequestResponse {
  error: boolean,
  status: string | number,
  data: { [key: string]: any } | string | null
}

interface QueryData { [key: string]: string }
