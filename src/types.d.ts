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
  [key: string]: Function | unknown | string | {};
  events?: PropsEvent[];
  attributes?: PropsAttributes;
}

interface FormProps extends Props {
  submitCallback?: (data: { [key: string]: unknown }) => void;
  fields?: FormField[];
  [key: string]: unknown;
}

interface FormField extends Props {
  label: string,
  id: string,
  name: string,
  value: string,
  validators?: Array<(value: any) => boolean | string>;
}

interface UserInfo {
  avatar: string | null;
  display_name: string | null;
  email: string;
  first_name: string;
  id: number;
  login: string;
  phone: string;
  second_name: string;
}

interface UserProfileItem {
  name: string;
  value: string | number | undefined | null;
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
  activeSocket: WebSocket | null;
  sockets: { [index: number]: WebSocket };
  isAuthorized: boolean;
  activeChat: ChatItem | null;
  chatList: ChatItem[];
  userInfo: UserInfo;
  chatsUsers: { [index: number]: { [index: number]: string } }
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
  data: { [key: string]: any } | null
}

interface QueryData { [key: string]: string }

// TODO: Узнать почему это работает
interface MessageEvent extends Event {
  message: string
}

interface PageOptions {
  isNotForAuthorized: boolean;
  isPrivate: boolean;
}

interface SocketMessage {
  chat_id: number
  content: string
  file: null
  id: number
  is_read: boolean
  time: string
  type: string
  user_id: number
}

interface PropsEvent {
  type: keyof ElementEventMap | string | [];
  selector?: string;
  cb: (this: Element, ev: Event) => any;
}

interface Selectors {
  [key: string]: string;
}

interface ErrorModalContentProps {
  status: number | string;
  reason: string | null;
}
