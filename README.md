# Monolithic SSR App

This application is based on [PayloadCMS](https://payloadcms.com) which uses Express and MongoDB for routing and serving content. Is has been generated with

```sh
$ npx create-payload-app
```

## Server-Side Rendering with React and Node.js Streams

This application used React's JSX as a template engine. React components can be imported into Express route handlers and process with `React.createElement`. The compiled component output is then streamed to Express' `response` object via a Node stream like this:

```
const stream = renderToStaticNodeStream(createElement(MyComponent, myProps));
stream.pipe(res)
```
