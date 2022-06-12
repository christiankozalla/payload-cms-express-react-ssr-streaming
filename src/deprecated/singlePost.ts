import { RichtextNode, richtextToHtml } from './rich-text-serializer-to-html';

interface Doc {
  id: string;
  title: string;
  author: {
    id: string;
    email: string;
    name?: string;
    publishedAt?: string;
  };
  category: string | null;
  tags: any[];
  content: RichtextNode[];
}

export default function (doc: Doc) {
  return `
    <main>
      <article>
        <div style="font-weight: 900; font-size: 3rem">Title ${doc.title}</div>
        <div>Written By ${doc.author.name}</div>
        <section>
          ${richtextToHtml(doc.content).join(' ')}
        </section>
      </article>
    </main>
  `;
}
