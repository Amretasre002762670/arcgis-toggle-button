import { LitElement, state, h, type JsxNode } from "@arcgis/lumina";

declare global {
  interface DeclareElements {
    "arcgis-toggle-button": ToggleButton;
  }
}

export class ToggleButton extends LitElement {
  //#region State Properties
    @state()
    on = false;

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
        <button
            
            onClick={() => {
            this.on = !this.on;
            }}
        >
            {this.on ? "On" : "Off"}
        </button>
    );
  }

  //#endregion
}
