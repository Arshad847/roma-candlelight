import React from 'https://esm.sh/react@19.2.0';
import { html } from './jsx.js';

export function Providers(props) {
  return html`<${React.Fragment}>${props.children}</${React.Fragment}>`;
}