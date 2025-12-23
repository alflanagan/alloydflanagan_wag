import { html, css, LitElement } from 'lit'

export class HeroBlock extends LitElement {
  static styles = css`

  @import("../css/colors.css");

  :host {
    width: 100%;
    display: block;
  }

  .hero-block {
    display: block;
    width: 80%;
    border-color: var(--slate);
    border-width: 2px;
    border-style: solid;
    padding: 1rem;
  }

  .title {
    font-size: 26px;
    color black;
  }

  .content {
    color: var(--dark-grey);
  }
`

  static properties = {
    title: { type: String }
  }

  render () {
    return html`
    <div class="hero-block">
      <div class="title">${this.title}</div>
      <div class="content"><slot></slot></div>
    </div>
  `
  }
}
