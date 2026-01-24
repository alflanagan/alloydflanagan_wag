import { html, css, LitElement } from 'lit'

export class HeroBlock extends LitElement {
  static styles = css`

  @import("../css/variables.css");

  :host {
    width: var(--max-width-lg);
    display: block;
  }

  .hero-block {
    display: block;
    width: 80%;
    border-color: var(--color-border);
    border-width: var(--border-width);
    border-style: solid;
    padding: 1rem;
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
