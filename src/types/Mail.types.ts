export interface SendMailOptions {
  to: string | string[];
  from: string;
  subject: string;
  text: string;
  html: string;
  cc: string | string[];
}
