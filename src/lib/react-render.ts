import path from 'path';
import { renderToStaticNodeStream } from 'react-dom/server';
import { createElement } from 'react';

export async function reactRender(
  view: string,
  options = {},
  callback?: (err: Error, Html: string) => void
) {
  const component = await import(
    path.resolve(__dirname, '../templates/react', view + '.tsx')
  );
  const stream = renderToStaticNodeStream(
    createElement(component.default, options)
  );
  stream.pipe(this);
}
