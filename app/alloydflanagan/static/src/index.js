// need to import components even if we don't use them directly
// so they can all be registered here
import { MenuLink } from './menu_link.js'
import { PageHeader } from './page_header.js'
// tell webpack to include styles
import css from '../css/index.css' // eslint-disable-line

customElements.define('page-header', PageHeader)
customElements.define('menu-link', MenuLink)
