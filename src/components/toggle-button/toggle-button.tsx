import { LitElement, state, h, type JsxNode } from "@arcgis/lumina";
import { styles } from "./toggle-button.scss";

declare global {
  interface DeclareElements {
    "arcgis-toggle-button": ToggleButton;
  }
}

export class ToggleButton extends LitElement {

  //#region Static Properties

  static override styles = styles;

  //#endregion

  //#region State Properties

  @state()
  on = false;

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
        <div class={`flip-toggle${this.on ? " on" : ""}`} onClick={this.handleToggle} onKeyDown={this.handleToggleKeyPress} tabIndex={1} role="switch" aria-label="Toggle Button" aria-checked={this.on}>
          <div class="knob"></div>
          <span class="label on-label">On</span>
          <span class="label off-label">Off</span>
        </div>
    );
  }

  //#endregion

  //#region Events

  private handleToggle(): void {
    this.on = !this.on;
    this.el.dispatchEvent(new CustomEvent("toggle", {
      detail: { on: this.on },
      bubbles: true,
      composed: true
    }));
  }

  private handleToggleKeyPress(event: KeyboardEvent) :void {
    if (event.key === "Enter" || event.key === " ") {
      this.handleToggle();
      event.preventDefault();
    }
  }

  //#endregion
}
