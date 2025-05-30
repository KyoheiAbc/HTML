class Input {
    static T = 50;
    #q = []; #s = null; #m = 0;
    pnt = { x: 0, y: 0 }; // Placeholder for pointer position, not used in this code
    constructor() {
        ['mousedown', 'touchstart'].map(e => addEventListener(e, this.#st.bind(this)));
        ['mousemove', 'touchmove'].map(e => addEventListener(e, this.#mv.bind(this)));
        ['mouseup', 'touchend'].map(e => addEventListener(e, this.#ed.bind(this)));
    }
    #st(e) { e.preventDefault?.(); this.#s = this.#p(e); this.#m = 0; }
    #mv(e) {
        this.pnt = this.#p(e); // Update pointer position
        if (!this.#s) return; e.preventDefault?.();
        const p = this.#p(e), x = p.x - this.#s.x, y = p.y - this.#s.y, a = Math.abs(x), b = Math.abs(y);
        if (a > Input.T || b > Input.T) {
            this.#m = 1; this.#q.push(a > b ? (x > 0 ? 6 : 4) : (y > 0 ? 2 : 8));
            this.#s[a > b ? 'x' : 'y'] += (a > b ? x : y) > 0 ? Input.T : -Input.T;
        }
    }
    #ed(e) { e.preventDefault?.(); !this.#m && this.#q.push(5); this.#s = null; }
    #p(e) { const t = e.touches?.[0] || e; return { x: t.clientX, y: t.clientY }; }
    get() { return this.#q.shift() || null; }
}
