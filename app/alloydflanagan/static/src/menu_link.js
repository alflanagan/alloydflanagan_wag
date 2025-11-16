import { html, css, LitElement } from 'lit'

export class MenuLink extends LitElement {
  static styles = css`
span:hover,
span:focus {
  border-bottom-color: rgba(255 255 255 / 25%);
}

span {
  color: #fff;
  border-bottom-color: #fff;
  font-family: "Oooh Baby", Helvetica, Arial, sans-serif;
  font-size: 24px;
}

a {
  color: rgb(40 40 40 / 100%);
}

a:hover {
  color: rgb(250 244 200);
}
`

  static properties = {
    href: { type: String },
    title: { type: String }
  }

  constructor () {
    super()
  }

  render () {
    return html`<span class="btn"><a href="${this.href}">${this.title}</a></span>`
  }
}
