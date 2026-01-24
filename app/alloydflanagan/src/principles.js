import { html, css, LitElement } from 'lit'

export class PrinciplesBlock extends LitElement {
  static styles = css`
    @import("../css/colors.css");

    .principles {
      display: block;
      border: black solid 2px;
    }

    #heading {
      font-size: 20px;
    }
  `

  render () {
    return html`
    <div class="principles">
  <h3 id="heading">Software Development Principles</h3>
  <ul>
    <li>There are no absolute rules or magic bullets: every decision is a tradeoff.
    <div>Your job is to know the tradeoffs, and the business requirements, and decide
    what tradeoffs to make.</div>
    </li>
    <li>There are two kinds of code: code that has comprehensive automated testing, and
      code that has bugs.</li>
    <li>Code should be as simple as possible, but no simpler.</li>
    <li>Minimize dependencies.</li>
  </ul>
    </div>
  `
  }
}
