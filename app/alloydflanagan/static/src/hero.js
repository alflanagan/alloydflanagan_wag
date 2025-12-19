import { html, css, LitElement } from 'lit'

export class HeroBlock extends LitElement {
  static styles = css`

  @import("../css/colors.css");

  .hero-block {
    display: block;
    width: 80%;
    border-color: var(--slate);
    border-width: 2px;
  }

  .hero-block__title {
    font-size: 26px;
    color black;
  }

  .hero-block__content {
    color: var(--dark-grey);
  }
`

  static properties = {
    title: { type: String }
  }

  render () {
    return html`
    <div class="hero-block">
      <div class="hero-block__title">${this.title}</div>
      <div class="hero-block__content"><slot></slot></div>
    </div>
  `
  }
}
