import { LitElement, property, h, type JsxNode } from "@arcgis/lumina";
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

  //#region Public Properties

  @property({
    converter: {
      fromAttribute(value: string | null) {
        if (typeof value === "string") {
          const normalized = value.trim().toLowerCase();
          return normalized === "true" || normalized === "1" || normalized === "on";
        }
        return false;
      },
      toAttribute(value: boolean) {
        return value ? "true" : "false";
      }
    }
  }) toggleState = false;

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    console.log("Rendering ToggleButton", this.toggleState);
    return (
        <div class={`flip-toggle${this.toggleState ? " on" : ""}`} onClick={this.handleToggle} onKeyDown={this.handleToggleKeyPress} tabIndex={0} role="switch" ariaLabel="Toggle Button" ariaChecked={this.toggleState}>
          <div class="knob"></div>
          <span class="label on-label">On</span>
          <span class="label off-label">Off</span>
        </div>
    );
  }

  //#endregion

  //#region Events

  private handleToggle(): void {
    this.toggleState = !this.toggleState;
    this.el.dispatchEvent(new CustomEvent("toggle", {
      detail: { toggleState: this.toggleState },
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
