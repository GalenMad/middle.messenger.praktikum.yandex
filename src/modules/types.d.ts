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
