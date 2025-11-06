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
  font-family: "Oooh Baby", cursive;
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
`

  static properties = {
    banner: { type: String },
    tabs: { type: String } // comma-separated
  }

  render () {
    let banner = ''
    if (this.banner) {
      banner = `<img src="${this.banner}" width=800 alt="basic web site banner">`
    }
    console.log(banner)
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
    ${this.tabs.split(',').map(tab => html`<menu-link name="${tab}" />`)}
    </nav>
  </div>
</header>
`
  }
}
