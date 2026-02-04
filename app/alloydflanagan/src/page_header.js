import { html, css, LitElement } from 'lit'

export class PageHeader extends LitElement {
  static styles = css`
@import url("/static/css/variables.css");

.page-header {
  padding-top: var(--space-2);
  padding-bottom: var(--space-4);
  background-color: var(--color-bg);
}

header h3 {
  color: var(--color-text-primary);
  font-size: var(--text-3xl);
  margin-block: var(--space-0);
}

nav {
  margin-top: var(--space-2);
}

nav menu-link {
  padding: var(--space-0);
  font-family: var(--font-sans);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
  background-color: var(--color-transparent);
  font-size: var(--text-base);
}

menu-link + menu-link {
  margin-left: var(--space-3);
}

nav menu-link:hover,
nav menu-link:focus {
  border-bottom-color: var(--color-text-secondary);
}

nav span {
  margin-left: var(--space-2);
  margin-right: var(--space-2);
}

nav span:nth-child(1) {
  margin-left: var(--space-0);
}

img {
  max-height: 100px;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
}
`

  static properties = {
    banner: { type: String },
  }

  render () {
    let banner = ''
    if (this.banner) {
      banner = html`<img src="${this.banner}" alt="basic web site banner">`
    }

    // note: final <div></div> seems to fix problem where content after page-header
    // became a child node, not a sibling. Not sure if a bug in Lit or something I did.
    return html`
<header class="page-header container">
  <div class="inner">
    <div>
      <h3>A Lloyd Flanagan's Website</h3>
    </div>
    <div>
      ${banner}
    </div>
    <nav class="nav nav-masthead justify-content-center app-nav">
      <menu-link href="about" title="About Me"></menu-link>
      <menu-link href="#" title="About This Site" disabled></menu-link>
      <menu-link href="#" title="Blog" disabled></menu-link>
      <menu-link href="#" title="Portfolio" disabled></menu-link>
    </nav>
  </div>
</header>
<div></div>
`
  }
}
