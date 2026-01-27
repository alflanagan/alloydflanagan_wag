// need to import components even if we don't use them directly
// so they can all be registered here
import { MenuLink } from './menu_link.js'
import { PageHeader } from './page_header.js'
import { HeroBlock } from './hero.js'
import { AboutSection } from '../about_me/src/about_section.js'
import { PrinciplesBlock } from './principles.js'
import { UnsplashCredit } from './unsplash_credit.js'

window.customElements.define('page-header', PageHeader)
window.customElements.define('menu-link', MenuLink)
window.customElements.define('hero-block', HeroBlock)
window.customElements.define('about-section', AboutSection)
window.customElements.define('principles-block', PrinciplesBlock)
window.customElements.define('unsplash-credit', UnsplashCredit)
