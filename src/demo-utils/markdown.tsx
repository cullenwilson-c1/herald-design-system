import { Fragment, type ReactNode } from "react";

/**
 * Demo-only placeholder markdown renderer (NOT part of the design system). The real app renders markdown
 * itself and passes the output to `AssistantMessage` / `ChatLog renderMarkdown`. Supports: headings, bold,
 * italic, inline code, links, ul/ol, fenced code, blockquote, pipe tables, paragraphs.
 */
function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(re)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyBase}-${i++}`;
    if (m[1]) out.push(<code key={key}>{tok.slice(1, -1)}</code>);
    else if (m[2]) out.push(<strong key={key}>{tok.slice(2, -2)}</strong>);
    else if (m[3]) out.push(<em key={key}>{tok.slice(1, -1)}</em>);
    else {
      const [, label, href] = /\[([^\]]+)\]\(([^)]+)\)/.exec(tok)!;
      out.push(
        <a key={key} href={href} target="_blank" rel="noreferrer">
          {label}
        </a>,
      );
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

export function renderDemoMarkdown(markdown: string): ReactNode {
  const lines = markdown.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let k = 0;
  while (i < lines.length) {
    const line = lines[i]!;
    const key = `b${k++}`;
    if (line.trim() === "") {
      i++;
    } else if (line.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i]!.startsWith("```")) code.push(lines[i++]!);
      i++;
      blocks.push(
        <pre key={key} tabIndex={0}>
          <code>{code.join("\n")}</code>
        </pre>,
      );
    } else if (/^#{1,4}\s/.test(line)) {
      const level = /^#+/.exec(line)![0].length;
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
      blocks.push(<Tag key={key}>{inline(line.replace(/^#+\s/, ""), key)}</Tag>);
      i++;
    } else if (line.startsWith(">")) {
      const q: string[] = [];
      while (i < lines.length && lines[i]!.startsWith(">")) q.push(lines[i++]!.replace(/^>\s?/, ""));
      blocks.push(<blockquote key={key}>{inline(q.join(" "), key)}</blockquote>);
    } else if (/^\s*([-*]|\d+\.)\s/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items: string[] = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s/.test(lines[i]!)) {
        items.push(lines[i++]!.replace(/^\s*([-*]|\d+\.)\s/, ""));
      }
      const Tag = ordered ? "ol" : "ul";
      blocks.push(
        <Tag key={key}>
          {items.map((it, n) => (
            <li key={n}>{inline(it, `${key}-${n}`)}</li>
          ))}
        </Tag>,
      );
    } else if (line.includes("|") && /^\s*\|?[\s:-]+\|[\s|:-]*$/.test(lines[i + 1] ?? "")) {
      const head = cells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i]!.includes("|")) rows.push(cells(lines[i++]!));
      blocks.push(
        <table key={key}>
          <thead>
            <tr>
              {head.map((h, n) => (
                <th key={n}>{inline(h, `${key}h${n}`)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, n) => (
              <tr key={n}>
                {r.map((c, m) => (
                  <td key={m}>{inline(c, `${key}r${n}${m}`)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>,
      );
    } else {
      const p: string[] = [];
      while (
        i < lines.length &&
        lines[i]!.trim() !== "" &&
        !/^(#{1,4}\s|```|>|\s*([-*]|\d+\.)\s)/.test(lines[i]!)
      ) {
        p.push(lines[i++]!);
      }
      blocks.push(<p key={key}>{inline(p.join(" "), key)}</p>);
    }
  }
  return <Fragment>{blocks}</Fragment>;
}
