import { html, css, LitElement } from 'lit'

export class MenuLink extends LitElement {
  static styles = css`
  @import("../static/css/variables.css");

a {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  color: var(--color-text-primary);
  text-decoration: none;
}

a:hover, a:focus {
  text-decoration: underline;
}
`

  static properties = {
    href: { type: String },
    title: { type: String }
  }

  render () {
    return html`<span class="btn"><a href="${this.href}">${this.title}</a></span>`
  }
}
