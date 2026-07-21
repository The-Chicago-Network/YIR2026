const template = document.createElement("template");

template.innerHTML = `
  <style>
    a[href] {
      color: #447988;
    }

    h3 {
      color: #7a7416;
      font-family: var(--hhhFontFamily);
      font-size: 2rem;
      font-weight: var(--hhFontWeight);
      font-variation-settings: var(--hhhVariationSettings);
      line-height: calc(2rem * 1.5);
      margin-bottom: 3rem;
      position: relative;
      letter-spacing: .25rem;
      z-index: 10;
    }

    .innerSlide {
      margin: 0 auto 0 auto;
      max-width: 40em;
      padding-left: 5vw;
      padding-right: 5vw;
    }

    p {
      font-family: var(--pFontFamily);
      font-weight: var(--pFontWeight);
      font-size: var(--pFontSize);
      line-height: var(--pLineHeight);
    }

    .slideContainer {
      background-color: var(--slideImageBG);
      border-top: solid 1rem #C0B622;
      box-shadow: -0px -20px 20px rgba(0,0,0,0.1), -0px -5px 10px rgba(0,0,0,0.1);
      color: var(--contentTextColor);
      width: 100vw;
      min-height: 100vh;
      display: flex;
      align-items: center;
      flex-flow: column nowrap;
      padding-bottom: 5rem;
      padding-top: 5rem;
    }

  </style>

  <div class="slideContainer">
    <div class="innerSlide">
      <h3></h3>
      <p></p>
      <slot></slot>
    </div>
    <slot name="outer"></slot>
  </div>
`;

class contentSlide extends HTMLElement {
  constructor() {
    super();

    // Set up shadow root to isolate instance
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$slide = this._shadowRoot.querySelector(".slideContainer");
  }

  // Get attributes passed through HTML
  static get observedAttributes() {
    return ["title", "spiel", "content", "background", "textcolor"];
  }

  // Re-render on change
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal != newVal) {
      this[name] = newVal;
      this.render();
    }
  }

  // Insert attribute values from HTML in render
  render() {
    this.title
      ? (this.$slide.querySelector("h3").innerHTML = this.title)
      : null;
    this.spiel ? (this.$slide.querySelector("p").innerHTML = this.spiel) : null;
    this.background ? (this.$slide.style.background = this.background) : null;
    this.textcolor
      ? (this.$slide.querySelector("h3").style.color = this.textcolor)
      : null;
    this.textcolor
      ? (this.$slide.querySelector("h3").style.webkitTextFillColor =
          this.textcolor)
      : null;
  }
}

// Define custom element
window.customElements.define("content-slide", contentSlide);
