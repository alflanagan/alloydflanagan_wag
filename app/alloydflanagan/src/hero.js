import { html, css, LitElement } from 'lit'

export class HeroBlock extends LitElement {
  static styles = css`

  @import("../static/css/variables.css");

  .hero-block {
    display: block;
    border-color: var(--color-border);
    border-width: var(--borde-width);
    border-style: solid;
    padding: var(--space-4);
  }

  .title {
    font-size: var(--text-xl);
    color: var(--color-text-primary);
  }

  .content {
    color: var(--color-text-muted);
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
