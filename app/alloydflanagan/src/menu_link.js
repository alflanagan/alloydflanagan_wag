import { html, css, LitElement } from 'lit'

export class MenuLink extends LitElement {
  static styles = css`
@import url("/static/css/variables.css");

a {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  color: var(--color-text-primary);
  text-decoration: none;
}

a:hover, a:focus {
  text-decoration: underline;
  }

  button {
  background-color: var(--background-color);
  border: none;
  }

  button[disabled] {
  color: var(--color-text-muted);
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  }
`

  static properties = {
    href: { type: String },
    title: { type: String },
    disabled: { type: Boolean },
  }

  render() {
    let disabled = ''
    if (typeof this.disabled === 'undefined') {
      return html`<button ${disabled}><a href="${this.href}">${this.title}</a></button>`
    }
    return html`<button disabled>${this.title}</button>`
  }
}
