import { html, css, LitElement } from 'lit'

export class AboutSection extends LitElement {
  static styles = css`
@import("../../static/css/variables.css");

section {
  border-style: solid;
  border-color: var(--border-color);
  border-width: var(--border-width);
}
`

  static properties = {
    id: { type: String }
  }

  render () {
    console.log('rendering AboutSection')
    return html`
      <section>
        <h3>About</h3>
        <p>
          I’m a software engineer with more than 15 years of experience
          building SaaS platforms, APIs, and infrastructure.
        </p>
        <p>
          I value clean abstractions, pragmatic architecture,
          and systems that are easy to maintain.
        </p>
      </section>
    `
  }
}
