// noinspection JSUnusedGlobalSymbols
import { html, css, LitElement } from 'lit'

export class PageHeader extends LitElement {
  static styles = css`
@import("../static/css/variables.css");

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
    tabs: { type: String }, // comma-separated
    urls: { type: String } // comma-separated
  }

  /** Returns a single array whose elements are 2-tuples of successive elements of a and b.
      The resulting array will have the length of the shorter of a or b. */
  zip (a, b) {
    const minN = Math.min(a.length, b.length)
    const result = []
    for (let i = 0; i < minN; i++) {
      result.push([a[i], b[i]])
    }
    return result
  }

  render () {
    let banner = ''
    if (this.banner) {
      banner = html`<img src="${this.banner}" alt="basic web site banner">`
    }

    const tabsList = this.tabs.split(',')
    const urlList = this.urls.split(',')

    const linkList = this.zip(tabsList, urlList)

    // note: final <div></div> seems to fix problem where content after page-header
    // became a child node, not a sibling. Not sure if a bug in Lit or something I did.
    return html`
<header class="page-header">
  <div class="inner">
    <div>
      <h3>A Lloyd Flanagan's Website</h3>
    </div>
    <div>
      ${banner}
    </div>
    <nav class="nav nav-masthead justify-content-center app-nav">
      ${linkList.map(tab => html`<menu-link title="${tab[0]}" href="${tab[1]}" />`)}
    </nav>
  </div>
</header>
<div></div>
`
  }
}
