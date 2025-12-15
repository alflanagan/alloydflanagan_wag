import { html, css, LitElement } from 'lit'
/* eslint-env browser */
export class UnsplashCredit extends LitElement {
  static styles = css`
    #us-logo {
      display: inline-block;
      padding: 2px 3px;
    }

    #us-logo svg {
      height: 12px;
      width: auto;
      position: relative;
      vertical-align: middle;
      top: -2px;
      fill: white;
    }

    #photographer {
      display: inline-block;
      padding: 2px 3px;
    }`

  static properties = {
    photographer: { type: String },
    href: { type: String },
    title: { type: String }
  }

  render () {
    return html`
      <div id="background-image-box">
        <div class="p-2">
          <span id="bkgnd-image-credit">
            Background Image:{' '}
            <a
              href="${this.href}"
              target="_blank"
              rel="noopener noreferrer"
              title="${this.title}"
            >
              <span id="us-logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <title>unsplash-logo</title>
                  <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" />
                </svg>
              </span>
              <span id="photographer">${this.photographer}</span>
            </a>
          </span>
        </div>
    </div>
    `
  }
}

customElements.define('unsplash-credit', UnsplashCredit)
