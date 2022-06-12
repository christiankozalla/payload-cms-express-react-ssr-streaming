import escapeHTML from 'escape-html';

export interface RichtextNode {
  text?: string;
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  url?: string;
  type?: RichtextNodeTypes;
  children?: RichtextNode[];
}

type RichtextNodeTypes =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'li'
  | 'ul'
  | 'ol'
  | 'link'
  | 'quote'
  | 'indent';

const serializeHeadline = (node: RichtextNode) =>
  `<${node.type}>${richtextToHtml(node.children)}</${node.type}>`;
const isHeadline = (type: string | undefined) =>
  type !== undefined &&
  type.length === 2 &&
  type[0] === 'h' &&
  Number.isInteger(Number(type[1]));

export const richtextToHtml = (children: RichtextNode[]): any[] =>
  children.map((node, i) => {
    if (Object.prototype.hasOwnProperty.call(node, 'text')) {
      let text = `<span>${escapeHTML(node.text)}</span>`;

      if (node.bold) {
        text = `<strong>${text}</strong>`;
      }

      if (node.code) {
        text = `<code>${text}</code>`;
      }

      if (node.italic) {
        text = `<em>${text}</em>`;
      }

      // Handle other leaf types here...

      return text;
    }

    if (!node) {
      return null;
    }

    if (isHeadline(node.type)) return serializeHeadline(node);

    switch (node.type) {
      case 'quote':
        return `<blockquote>${richtextToHtml(node.children)}</blockquote>`;
      case 'ul':
        return `<ul>${richtextToHtml(node.children)}</ul>`;
      case 'ol':
        return `<ol>${richtextToHtml(node.children)}</ol>`;
      case 'li':
        return `<li>${richtextToHtml(node.children)}</li>`;
      case 'link':
        return `<a href=${escapeHTML(node.url)}>${richtextToHtml(
          node.children
        )}</a>`;

      default:
        return `<p>${richtextToHtml(node.children)}</p>`;
    }
  });
