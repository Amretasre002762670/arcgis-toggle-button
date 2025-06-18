import { LitElement, h, property, type JsxNode } from "@arcgis/lumina";
import { styles } from "./emoji-rain.scss";

declare global {
    interface DeclareElements {
        "arcgis-emoji-rain": EmojiRain;
    }
}

type Circle = {
    x: number;
    y: number;
    v: { x: number; y: number };
    range: [number, number];
    el: HTMLSpanElement;
}

export class EmojiRain extends LitElement {
    //#region Static Properties

    static override styles = styles;

    //#endregion

    //#region Private Properties

    @property({
        converter: {
            fromAttribute(value: string) {
                return value.split(",").map(e => e.trim());
            },
            toAttribute(value: string[]) {
                return value.join(", ");
            }
        }
    }) emoji: string[] = ["🌽", "🍇", "🍌", "🍒"];

    //#endregion

    //#region Private Properties

    // private emoji: string[] = ['🌽', '🍇', '🍌', '🍒', '🍕', '🍷', '🍭', '💖', '💩', '🐷', '🐸', '🐳', '🎃', '🎾', '🌈', '🍦', '💁', '🔥', '😁', '😱', '🌴', '👏', '💃'];

    private container!: HTMLDivElement;

    private circles: Circle[] = [];

    //#region Rendering

    override render(): JsxNode {
        console.log(this.emoji);
        return (
            <div id="container"></div>
        );
    }

    //#endregion

    //#region Lifecycle

    override updated(): void {
        setTimeout(() => {
            const container = this.el.shadowRoot?.querySelector('#container');
            if (container) {
                this.container = container as HTMLDivElement;
                this.setCircles();
                this.animateCircles();
            }
        });
    }

    //#endregion

    //#region Private Methods

    private randomEmoji(): string {
        console.log(this.emoji[3])
        return this.emoji[Math.floor(Math.random() * this.emoji.length)];
    }

    private addCircle (delay: number, range: [number, number]) : void {
        setTimeout(() => {
            const x = range[0] + Math.random() * range[1];
            const y = 80 + Math.random() * 4;

            const el = document.createElement('span');
            el.className = "emoji";
            el.textContent = this.randomEmoji();
            el.style.color = `hsl(${(Math.random()*360)},80%,50%)`;
            this.container.appendChild(el);
            this.circles.push({ x, y, v : { x: -0.15 + Math.random() * 0.3, y: 1 + Math.random() * 1 }, range, el});
        }, delay);
    }

    private setCircles(): void {
        const cols = 15;
        for (let i = 0; i < cols; i++) {
            this.addCircle(i * 150, [10, 300]);
            this.addCircle(i * 150, [10, -300]);
            this.addCircle(i * 150, [10 + 0, 300]);
            this.addCircle(i * 150, [10 + 0, -300]);
            this.addCircle(i * 150, [10 - 200, -300]);
            this.addCircle(i * 150, [10 + 200, 300]);
            this.addCircle(i * 150, [10 - 400, -300]);
            this.addCircle(i * 150, [10 + 400, 300]);
            this.addCircle(i * 150, [10 - 600, -300]);
            this.addCircle(i * 150, [10 + 600, 300]);
        }
    }

    private animateCircles(): void {
        this.circles.forEach((circle) => {
            circle.y += circle.v.y;
            circle.x += circle.v.x;

            if (circle.y > 800) {
                circle.y = 80 + Math.random() * 4;
                circle.x = circle.range[0] + Math.random() * circle.range[1];
            }
            circle.el.style.opacity = '1';
            circle.el.style.transform = `translate3d(${circle.x}px, ${circle.y}px, 0px)`;

        });
        requestAnimationFrame(() => this.animateCircles());
    }

    //#endregion
}