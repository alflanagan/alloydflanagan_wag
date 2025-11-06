import { html, css, LitElement } from 'lit'

export class MenuLink extends LitElement {
  static styles = css`
@font-face {
  font-family: "OoohBaby";
  src:
    url("../fonts/OoohBaby-Regular.ttf") format("ttf");
}

span:hover,
span:focus {
  border-bottom-color: rgba(255 255 255 / 25%);
}

span {
  color: #fff;
  border-bottom-color: #fff;
  font-family: "OoohBaby", Helvetica, Arial, sans-serif;
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
    this.href = 'https://www.example.com'
  }

  render () {
    return html`<span class="btn"><a href="${this.href}">${this.title}</a></span>`
  }
}
