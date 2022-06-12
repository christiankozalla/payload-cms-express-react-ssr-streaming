import React from 'react';
import serialize from '../../lib/rich-text-serializer';

export default function Post({ doc }) {
  return (
    <div>
      <article>
        <h1>{doc.title}</h1>
        <p>Written by {doc.author.name}</p>
        <section>{serialize(doc.content)}</section>
      </article>
    </div>
  );
}
