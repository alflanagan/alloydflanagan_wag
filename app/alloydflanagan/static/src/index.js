// need to import components even if we don't use them directly
// so they can all be registered here
import { MenuLink } from './menu_link.js'
import { PageHeader } from './page_header.js'
/* eslint no-unused-vars: 0 */
import css from '../css/index.css' // tell webpack to include file
/* eslint no-unused-vars: 1 */

/* global customElements */

customElements.define('page-header', PageHeader)
customElements.define('menu-link', MenuLink)
