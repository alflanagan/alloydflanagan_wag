import { html, css, LitElement } from 'lit'

export class MenuLink extends LitElement {
  static styles = css`
  @import("../static/css/variables.css");

a {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  color: var(--color-text-primary);
  border-bottom-color: var(--color-border);
  border-width: var(--border-width);
  border-radius: var(--radius-sm);
}

a:hover, a:focus {
  color: var(--color-bg-muted);
  border-bottom-color: var(--color-bg);
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
