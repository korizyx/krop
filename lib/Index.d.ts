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

declare interface KropRequestOptions {
  url: string;
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
  timeout?: number;
  http2?: boolean;
}

declare function request(options: KropRequestOptions): Promise<KropResponse>;

export default request;
export class Session {
  declare cookies: string;

  req(options: KropRequestOptions): Promise<KropResponse>;

  addCookie(
    cookie: string | { name: string; value: string | number }
  ): true | false;

  removeCookie(cookie_name: string): true | false;

  json(): { [key: string]: string };
}
