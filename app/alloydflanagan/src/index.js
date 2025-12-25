/* global customElements */

// need to import components even if we don't use them directly
// so they can all be registered here
import { MenuLink } from './menu_link.js'
import { PageHeader } from './page_header.js'
import { HeroBlock } from './hero.js'
import { AboutSection } from '../about_me/src/about_section'

customElements.define('page-header', PageHeader)
customElements.define('menu-link', MenuLink)
customElements.define('hero-block', HeroBlock)
customElements.define('about-section', AboutSection)
