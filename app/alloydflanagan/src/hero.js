import { html, css, LitElement } from 'lit'

export class HeroBlock extends LitElement {
  static styles = css`

@import("../static/css/variables.css");

.hero-block {
  display: block;
  padding: var(--space-4);
}

.title {
  font-size: var(--text-2xl);
  color: var(--color-text-semibold);
  margin-right: var(--space-auto);
  margin-left: var(--space-auto);
  width: fit-content;
}

.content {
  color: var(--color-text-primary);
  margin-right: var(--space-auto);
  margin-left: var(--space-auto);
  width: fit-content;
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
