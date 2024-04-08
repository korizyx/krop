declare interface KropResponse {
  status: number;
  headers: { [key: string]: string };
  data: {} | Buffer;
}

declare interface KropJsonProxy {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

declare interface KropRequestOptions<D = any> {
  url?: string;
  port?: number;
  method?:
    | "get"
    | "GET"
    | "delete"
    | "DELETE"
    | "head"
    | "HEAD"
    | "options"
    | "OPTIONS"
    | "post"
    | "POST"
    | "put"
    | "PUT"
    | "patch"
    | "PATCH"
    | "purge"
    | "PURGE"
    | "link"
    | "LINK"
    | "unlink"
    | "UNLINK";
  headers?: { [key: string]: string };
  payload?: string | {};
  proxy?: string | KropJsonProxy;
  ciphers?: string;
  timeout?: number;
  http2?: boolean;
  retry?: number;
  tlsVersion?: 'TLSv1' | 'TLSv1.1' | 'TLSv1.2' | 'TLSv1.3';
}

function request(...args: [KropRequestOptions | string]): Promise<KropResponse> {
  BETTER_CIPHERS: string
};

request.Session = class Session {
  declare cookies: string;
  constructor(default_options?: KropRequestOptions);

  req(...args: [KropRequestOptions | string]): Promise<KropResponse>;

  addCookie(
    cookie: string | { name: string; value: string | number }
  ): true | false;

  removeCookie(cookie_name: string): true | false;

  json(cookie?: string, encode?: boolean): { [key: string]: string };
};


export default request;
export class Session {
  declare cookies: string;
  constructor(default_options?: KropRequestOptions);

  req(...args: [KropRequestOptions | string]): Promise<KropResponse>;

  addCookie(
    cookie: string | { name: string; value: string | number }
  ): true | false;

  removeCookie(cookie_name: string): true | false;

  json(cookie?: string, encode?: boolean): { [key: string]: string };
}
