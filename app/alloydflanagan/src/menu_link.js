import { html, css, LitElement } from 'lit'

export class MenuLink extends LitElement {
  static styles = css`
a {
  font-family: Karla, sans-serif;
  font-size: 24px;
  color: black;
  border-bottom-color: black;
  border-width: 2px;
}

a:hover, a:focus {
  color: var(--background);
  border-bottom-color: var(--background);
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
