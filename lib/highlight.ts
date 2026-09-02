/**
 * A deliberately small TypeScript tokeniser for the hero code window and the
 * terminal. It exists so the code panel can be rendered as real React nodes
 * instead of `dangerouslySetInnerHTML`, and so the page ships no syntax
 * highlighting library at all.
 *
 * It only needs to handle the subset of TypeScript that appears in `data/` —
 * object literals, arrays, strings, numbers and line comments.
 */

export type TokenKind =
  | "plain"
  | "keyword"
  | "string"
  | "number"
  | "comment"
  | "key"
  | "punct";

export interface Token {
  text: string;
  kind: TokenKind;
}

const PATTERN =
  /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|\b(export|const|let|import|from|as|satisfies|type|interface|return|true|false|null|undefined)\b|([A-Za-z_$][\w$]*)(?=\s*:)|([{}\[\],:;=()<>|?.])/g;

export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;
  PATTERN.lastIndex = 0;

  let match = PATTERN.exec(line);
  while (match !== null) {
    const full = match[0];
    if (full.length === 0) {
      PATTERN.lastIndex += 1;
      match = PATTERN.exec(line);
      continue;
    }

    if (match.index > cursor) {
      tokens.push({ text: line.slice(cursor, match.index), kind: "plain" });
    }

    let kind: TokenKind = "punct";
    if (match[1]) kind = "comment";
    else if (match[2]) kind = "string";
    else if (match[3]) kind = "number";
    else if (match[4]) kind = "keyword";
    else if (match[5]) kind = "key";

    tokens.push({ text: full, kind });
    cursor = match.index + full.length;
    match = PATTERN.exec(line);
  }

  if (cursor < line.length) {
    tokens.push({ text: line.slice(cursor), kind: "plain" });
  }

  return tokens;
}

export function tokenizeBlock(code: string): Token[][] {
  return code.split("\n").map(tokenizeLine);
}

/** Token colours live in globals.css so the palette stays in one place. */
export const TOKEN_CLASS: Record<TokenKind, string> = {
  plain: "tok-plain",
  keyword: "tok-keyword",
  string: "tok-string",
  number: "tok-number",
  comment: "tok-comment",
  key: "tok-key",
  punct: "tok-punct",
};
