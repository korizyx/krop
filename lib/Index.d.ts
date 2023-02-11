declare interface HermesResponse {
  _readableState: ReadableState;
  _maxListeners: number | undefined;
  socket: null | any;
  httpVersionMajor: number;
  httpVersionMinor: number;
  httpVersion: string;
  complete: boolean;
  rawHeaders: Array<string>;
  rawTrailers: Array<string>;
  aborted: boolean;
  upgrade: boolean;
  url: string;
  method: null | string;
  statusCode: number;
  statusMessage: string;
  client: TLSSocket;
  _consuming: boolean;
  _dumped: boolean;
  req: ClientRequest;
  headers: {
    connection: string;
    "Content-Type"?: string;
    date?: string;
  };
  data: {} | Buffer;
}

declare interface HermesJsonProxy {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

declare interface HermesRequestOptions {
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
  headers?: {};
  payload?: string | {};
  proxy?: string | HermesJsonProxy;
  timeout?: number;
  http2?: boolean;
}

declare function Request(
  options: HermesRequestOptions
): Promise<HermesResponse>;

export default Request;
export class Session {
  declare cookies: string;

  req(options: HermesRequestOptions): Promise<HermesResponse>;

  addCookie(
    cookie: string | { name: string; value: string | number }
  ): true | false;

  removeCookie(cookie_name: string): true | false;
}
