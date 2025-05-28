class Input {
    static THRESHOLD = 64;
    #queue = [];
    #start = null;
    #moved = false;
    constructor() {
        ['mousedown', 'touchstart'].forEach(e => addEventListener(e, this.#onStart.bind(this)));
        ['mousemove', 'touchmove'].forEach(e => addEventListener(e, this.#onMove.bind(this)));
        ['mouseup', 'touchend'].forEach(e => addEventListener(e, this.#onEnd.bind(this)));
    }
    #onStart(e) {
        e.preventDefault?.();
        this.#start = this.#getPos(e);
        this.#moved = false;
    }
    #onMove(e) {
        if (!this.#start) return;
        e.preventDefault?.();
        const p = this.#getPos(e), dx = p.x - this.#start.x, dy = p.y - this.#start.y;
        if (Math.abs(dx) > Input.THRESHOLD || Math.abs(dy) > Input.THRESHOLD) {
            this.#moved = true;
            this.#queue.push(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 6 : 4) : (dy > 0 ? 2 : 8));
            Math.abs(dx) > Math.abs(dy) ? this.#start.x += dx > 0 ? Input.THRESHOLD : -Input.THRESHOLD : this.#start.y += dy > 0 ? Input.THRESHOLD : -Input.THRESHOLD;
        }
    }
    #onEnd(e) {
        e.preventDefault?.();
        if (!this.#moved) this.#queue.push(5);
        this.#start = null;
    }
    #getPos(e) {
        return e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };
    }
    getInput() {
        return this.#queue.shift() || null;
    }
}
