class Ball {
    constructor(x, y, c) { this.x = (x / 32 | 0) * 32 + 16; this.y = y; this.c = c; }
    static find(a, o) {
        for (let i = 0; i < o.length; i++) {
            const b = o[i];
            if (a !== b && (a.x - b.x) ** 2 + (a.y - b.y) ** 2 < 1024) return b;
        }
        return null;
    }
    put(x, y, o) {
        const px = this.x, py = this.y;
        this.x = (x / 32 | 0) * 32 + 16; this.y = y;
        const h = Ball.find(this, o);
        if (h) {
            const d = h.y - this.y;
            d && (this.y = h.y + (d > 0 ? -32 : 32));
            Ball.find(this, o) && (this.x = px, this.y = py);
        }
    }
    update(o) { this.c && this.put(this.x, this.y + 1, o); }
}
