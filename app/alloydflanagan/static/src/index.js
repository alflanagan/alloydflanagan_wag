import { html, css, LitElement } from 'lit'
import { MenuLink } from './menu_link.js'
import Styles from '../css/index.css'

export class SimpleGreeting extends LitElement {
  static styles = css`p { color: blue }`

  static properties = {
    name: { type: String }
  }

  constructor () {
    super()
    this.name = 'Somebody'
  }

  render () {
    return html`<p>Hello, ${this.name}!</p>`
  }
}
customElements.define('simple-greeting', SimpleGreeting)
customElements.define('menu-link', MenuLink)
