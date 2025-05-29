class Ball {
    constructor(x, y, colorNumber) { this.x = (x / 32 | 0) * 32 + 16; this.y = y; this.colorNumber = colorNumber; }
    static findCollision(c, o) {
        const cx = c.x, cy = c.y;
        for (let i = 0; i < o.length; i++) {
            const b = o[i];
            if (c !== b) {
                const dx = cx - b.x, dy = cy - b.y;
                if (dx * dx + dy * dy < 1024) return b;
            }
        }
        return null;
    }
    put(x, y, o) {
        const ox = this.x, oy = this.y;
        this.x = (x / 32 | 0) * 32 + 16; this.y = y;
        const c = Ball.findCollision(this, o);
        if (c) {
            const d = c.y - this.y;
            if (d) this.y = c.y + (d > 0 ? -32 : 32);
            if (Ball.findCollision(this, o)) { this.x = ox; this.y = oy; }
        }
    }
    update(o) { this.colorNumber && this.put(this.x, this.y + 1, o); }
}
