import { List$NonEmpty, List$Empty } from "./gleam.mjs";
import { HtmlNode$Text, HtmlNode$Element, HtmlNode$Comment } from "./javascript_dom_parser.mjs";
import * as array from "../gleam_javascript/gleam/javascript/array.mjs"

export function parse(html) {
  return new DOMParser().parseFromString(html, "text/html").documentElement;
}

export function toString(element) {
  return element.outerHTML;
}

export function toRecords(element) {
  switch (element.nodeType) {
    case element.ELEMENT_NODE:
      const children = array.to_list(
        Array.from(element.childNodes).map(toRecords),
      );
      return HtmlNode$Element(element.tagName, attributes(element), children);

    case element.TEXT_NODE:
      return HtmlNode$Text(element.textContent);

    case element.COMMENT_NODE:
      return HtmlNode$Comment(element.textContent);

    default:
      throw new Error("Unexpected node " + element);
  }
}

export function attributes(element) {
  let attributes = List$Empty();
  for (const attribute of element.attributes) {
    attributes = List$NonEmpty([attribute.name, attribute.value], attributes);
  }
  return attributes;
}

export function tag(element) {
  return element.tagName;
}

export function childNodes(element) {
  return array.to_list(element.childNodes);
}
