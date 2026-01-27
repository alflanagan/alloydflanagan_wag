import { html, css, LitElement } from 'lit'

export class PrinciplesBlock extends LitElement {
  static styles = css`
@import("../static/css/variables.css");

#principles {
  display: block;
  border:var(--color-text-secondary) solid var(--border-width);
}

#heading {
  font-size: var(--text-xl);
  padding-left: var(--space-4);
}

ul li {
  font-weight: var(--font-semibold);
}
`

  render () {
    return html`
<div id="principles">
  <h3 id="heading">Software Development Principles</h3>
  <ul>
    <li>Everyting is a trade-off.</li>
    <li>Code should be as simple as possible, but no simpler.</li>
    <li>Minimize dependencies.</li>
    <li>Automated, complete testing is the best way to prevent bugs.</li>
  </ul>
</div>
  `
  }
}
