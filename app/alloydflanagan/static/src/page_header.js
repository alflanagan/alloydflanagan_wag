// noinspection JSUnusedGlobalSymbols
import { html, css, LitElement } from 'lit'

export class PageHeader extends LitElement {
  static styles = css`
  header {
  margin-bottom: 2rem;
  margin-right: 15%;
  margin-left: 15%;
}

h3 {
  margin-bottom: 0;
  color: black;
  margin-top: 2rem;
}

header h3 {
  font-size: 3.5rem;
  font-family: "OoohBaby", Helvetica, Arial, sans-serif;
  font-style: cursive;
  margin-top: 5rem;
}

nav {
  margin-top: 1rem;
}

nav menu-link {
  padding: 0.25rem 0;
  font-family: "Oooh Baby", serif;
  font-weight: 700;

  /* font-variant: small-caps; */
  color: rgb(255 255 255 / 100%);
  background-color: transparent;

  /* border-bottom: 0.25rem solid transparent; */
  font-size: 2.5rem;
}

nav menu-link:hover,
nav menu-link:focus {
  border-bottom-color: rgba(255 255 255 / 25%);
}

menu-link + menu-link {
  margin-left: 1rem;
}

nav span {
  margin-left: 15px;
  margin-right: 15px;
}

nav span:nth-child(1) {
  margin-left: 0;
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
    tabs: { type: String } // comma-separated
  }

  render () {
    let banner = ''
    if (this.banner) {
      banner = html`<img src="${this.banner}" alt="basic web site banner">`
    }
    const tabsList = this.tabs.split(',')

    // note: final <div></div> seems to fix problem where content after page-header
    // became a child node, not a sibling. Not sure if a bug in Lit or something I did.
    return html`
      <header class="mb-auto">
        <div class="inner">
          <div>
            <h3>A Lloyd Flanagan</h3>
          </div>
          <div>
            ${banner}
          </div>
          <nav class="nav nav-masthead justify-content-center app-nav">
            ${tabsList.map(tab => html`<menu-link title="${tab}" />`)}
          </nav>
        </div>
      </header>
      <div></div>
`
  }
}
