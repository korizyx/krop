<div align="center">
    <img src="https://i.imgur.com/GbmmPAs.png" />
    <h1>powerful and fast</h1>
    <small>Make simple and fast stealth requests, supporting the recently tls versions and any proxies (auth/port:ip). To make better stealth request</small>
</div>
<div align="center">

[![npm version](https://img.shields.io/npm/v/krop.svg)](https://www.npmjs.org/package/krop)
[![Coverage Status](https://coveralls.io/repos/github/korizyx/krop/badge.svg?branch=master)](https://coveralls.io/github/korizyx/krop?branch=master)
![GitHub file size in bytes](https://img.shields.io/github/size/korizyx/krop/dist/krop.min.js)
[![npm downloads](https://img.shields.io/npm/dm/krop.svg)](https://npm-stat.com/charts.html?package=krop)
[![Known Vulnerabilities](https://snyk.io/test/npm/krop/badge.svg)](https://snyk.io/test/npm/krop)

</div>

<br />

## Features

- [x] Proxy
  - [x] Http(s)
  - [ ] Socks4/5
- [x] Support [Http2](https://support.cloudflare.com/hc/en-us/articles/200168076-Understanding-Cloudflare-HTTP-2-and-HTTP-3-Support#6ncFUWOVRaVtPzYN1euBIC) _(test website/api support for http/2 here https://tools.keycdn.com/http2-test)_
- [x] Support TLS 1.3, [as even Cloudflare said](https://www.cloudflare.com/learning/ssl/why-use-tls-1.3/) _"In a nutshell, TLS 1.3 is faster and more secure than TLS 1.2"_
- [x] Automatic request/response data parse
- [x] Session for automatic [storage cookies](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Set-Cookie)
- [x] Already with types
- [x] **0 dependencies**
- [x] Fastest between **Superagent**, **Axios** and **Got**
      <img src="https://i.imgur.com/uisHOpg.png">

## Install

> Available for any computer running [nodejs](https://nodejs.org/)

yarn

```bash
yarn add krop
```

npm

```bash
npm install krop
```

## Examples

> this module is avaliable for CommonJS or ESM/Typescript

<details>
  <summary> <b> CommonJS </b> </summary>
  <br>

simple get

```javascript
const krop = require("krop");

krop("discord.com").then(console.log);
```

cookie session

```javascript
const { Session } = require("krop");

const session = new Session({
  // default options for all requests in this session
  headers: {
    authorization: "Berear ...",
  },
});
session.default_options; // change them anytime!

session
  .req({
    url: "discord.com", // automatic add https:// in the url
  })
  .then((response) => {
    console.log(
      response,
      /**
       * cookies saved from previous request (automatic save)
       */
      session.cookies
    );
  });
```

using proxy

```javascript
const krop = require("krop");

krop({
  url: "https://api.ipify.org/?format=json",
  /**
   * automatic parse proxy (supporting auth config)
   */
  proxy: "47.254.153.200:80", // or "username:password@host:port"
  timeout: 10000,
}).then((response) => {
  /**
   * returns proxy ip
   */
  console.log(response.data);
});
```

downloading any media

```javascript
const Request = require("krop");
const { writeFileSync } = require("fs");

Request({
  url: "https://pt.wikipedia.org/static/images/mobile/copyright/wikipedia.png",
}).then((response) => {
  // learn about https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  const mime_type = {
    media: response.headers["content-type"].split("/")[0],
    extension: response.headers["content-type"].split("/")[1],
  };

  const file_name = `./${mime_type.media}.${mime_type.extension}`;

  /**
   * saving media
   */
  writeFileSync(
    file_name,
    /**
     * `response.data` automatic transforms media in buffer
     */
    response.data,
    {
      flag: "w+",
    }
  );

  console.log(response.headers["content-type"], response.data.length);
});
```

  </br>
</details>

<details>
  <summary> <b> ESM/TS </b> </summary>
  <br>

simple get

```javascript
import krop from "krop";

console.log(await krop("discord.com"));
```

cookie session

```javascript
import krop from "krop";
const { Session } = krop;

const session = new Session({
  // default options for all requests in this session
  headers: {
    authorization: "Berear ...",
  },
});
session.default_options; // change them anytime!

const response = await session.req("discord.com");

console.log(
  response,
  /**
   * cookies saved from previous request (automatic save)
   */
  session.json()
);
```

using proxy

```javascript
import krop from "krop";

const response = await krop({
  url: "https://api.ipify.org/?format=json",
  /**
   * automatic parse proxy (supporting auth config)
   */
  proxy: "47.254.153.200:80", // or "username:password@host:port"
  timeout: 10000,
});

/**
 * returns proxy ip
 */
console.log(response.data);
```

downloading any media

```javascript
import krop from "krop";
import { writeFileSync } from "fs";

const response = await krop({
  url: "https://pt.wikipedia.org/static/images/mobile/copyright/wikipedia.png",
});

// learn about https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
const mime_type = {
  media: response.headers["content-type"].split("/")[0],
  extension: response.headers["content-type"].split("/")[1],
};
const file_name = `./${mime_type.media}.${mime_type.extension}`;

/**
 * saving media
 */
writeFileSync(
  file_name,
  /**
   * `response.data` automatic transforms media in buffer
   */
  response.data,
  {
    flag: "w+",
  }
);

console.log(response.headers["content-type"], response.data.length);
```

  </br>
</details>

## Request Config

> Tip: _By default, `krop` is a function, to make a quick `get` request just pass the `string` containing the domain, example: `krop("www.google.com")`_

```javascript
{
  // `url` is the server URL that will be used for the request - Automatic add https://
  url: 'https://example.com/',

  // `method` is the request method to be used when making the request
  method: 'GET', // default

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `payload` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
  // must be of one of the following types:
  // - string, plain object
  payload: {
    firstName: 'Fred'
  },

  // syntax alternative to send payload into the body
  payload: 'Country=Foo&City=Bar',

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000,

  // `proxy` defines the hostname, port, and protocol of the proxy server or string content  all.
  proxy: {
    protocol: 'https', // default
    host: '127.0.0.1',
    port: 80,
    username: 'foo',
    password: 'bar'
  },

   // support string, automatic parse - Automatic add https://
  proxy: 'https://foo:bar@127.0.0.1:80',

  // support http2
  http2: false // default
}
```

## Response Example

> It always sees these parameters as a response, but depending on the HTTP protocol level, more things can come up

```javascript
{
  status: number,
  headers: {
    ...
  },
  data: {
    ...
  }
}
```

## License

This project is licensed under the MIT - see the [LICENSE](https://github.com/kori-lab/fivem-lookup/blob/main/LICENSE) file for details.
