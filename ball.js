class Ball {
    constructor(x, y, color) {
        this.x = (x / 32 | 0) * 32 + 16;
        this.y = y;
        this.c = color;
        this.frz = 0;
    }

    static findCollision(currentBall, allBalls) {
        for (let i = 0; i < allBalls.length; i++) {
            const otherBall = allBalls[i];
            if (currentBall !== otherBall) {
                const distance = (currentBall.x - otherBall.x) ** 2 + (currentBall.y - otherBall.y) ** 2;
                if (distance < 32 ** 2) return otherBall;
            }
        }
        return null;
    }

    put(targetX, targetY, allBalls) {
        const previousX = this.x;
        const previousY = this.y;

        this.x = (targetX / 32 | 0) * 32 + 16;
        this.y = targetY;

        const hitBall = Ball.findCollision(this, allBalls);
        if (hitBall) {
            const verticalDistance = hitBall.y - this.y;
            if (verticalDistance) {
                this.y = hitBall.y + (verticalDistance > 0 ? -32 : 32);
            }

            if (Ball.findCollision(this, allBalls)) {
                this.x = previousX;
                this.y = previousY;
            }
        }
    }

    update(allBalls) {
        const originalX = this.x;
        const originalY = this.y;
        if (this.c) {
            this.put(this.x, this.y + 5, allBalls);
        }
        if (originalX === this.x && originalY === this.y) {
            this.frz++;
        } else {
            this.frz = 0;
        }

    }
}

class BallPair {
    constructor(x, y) {
        this.primaryBall = new Ball(x, y, Math.floor(Math.random() * 4) + 1);
        this.secondaryBall = new Ball(x, y, Math.floor(Math.random() * 4) + 1);
        this.offset = { x: 0, y: -32 };
        this.secondaryBall.x = this.primaryBall.x + this.offset.x;
        this.secondaryBall.y = this.primaryBall.y + this.offset.y;
        this.frz = 0;
    }
    update(allBalls) {
        const originalX = this.primaryBall.x;
        const originalY = this.primaryBall.y;
        const orginalX2 = this.secondaryBall.x;
        const orginalY2 = this.secondaryBall.y;
        this.put(this.primaryBall.x, this.primaryBall.y + 1, allBalls);
        if (originalX === this.primaryBall.x && originalY === this.primaryBall.y &&
            orginalX2 === this.secondaryBall.x && orginalY2 === this.secondaryBall.y) {
            this.frz++;
        } else {
            this.frz = 0;
        }
    }

    move(x, y, allBalls) {

        this.put(this.primaryBall.x + x, this.primaryBall.y + y, allBalls);



    }
    rotate(allBalls) {
        const originalX = this.primaryBall.x;
        const originalY = this.primaryBall.y;
        const orginalX2 = this.secondaryBall.x;
        const orginalY2 = this.secondaryBall.y;

        if (this.offset.x === 0 && this.offset.y === -32) {
            this.offset = { x: 32, y: 0 };
        }
        else if (this.offset.x === 32 && this.offset.y === 0) {
            this.offset = { x: 0, y: 32 };
        } else if (this.offset.x === 0 && this.offset.y === 32) {
            this.offset = { x: -32, y: 0 };
        } else if (this.offset.x === -32 && this.offset.y === 0) {
            this.offset = { x: 0, y: -32 };
        }
        this.secondaryBall.x = this.primaryBall.x;
        this.secondaryBall.y = this.primaryBall.y;

        this.secondaryBall.put(this.offset.x + this.primaryBall.x, this.offset.y + this.primaryBall.y, allBalls);
        this.sync(this.secondaryBall, allBalls);

        if (!Ball.findCollision(this.primaryBall, allBalls)) return;


        // if (this.offset.x === 0 && this.offset.y === -32) {
        //     this.offset = { x: 32, y: 0 };
        // }
        // else if (this.offset.x === 32 && this.offset.y === 0) {
        //     this.offset = { x: 0, y: 32 };
        // } else if (this.offset.x === 0 && this.offset.y === 32) {
        //     this.offset = { x: -32, y: 0 };
        // } else if (this.offset.x === -32 && this.offset.y === 0) {
        //     this.offset = { x: 0, y: -32 };
        // }


        this.secondaryBall.x = originalX;
        this.secondaryBall.y = originalY;
        this.primaryBall.x = orginalX2
        this.primaryBall.y = orginalY2;

        this.offset.x = this.secondaryBall.x - this.primaryBall.x;
        this.offset.y = this.secondaryBall.y - this.primaryBall.y;




    }


    put(x, y, allBalls) {

        const orginalX = this.primaryBall.x;
        const orginalY = this.primaryBall.y;

        let b = allBalls.filter(v => v !== this.primaryBall && v !== this.secondaryBall)

        this.primaryBall.put(x, y, b);
        this.sync(this.primaryBall, b);

        if (!Ball.findCollision(this.secondaryBall, b)) return;

        this.primaryBall.x = orginalX;
        this.primaryBall.y = orginalY;

        this.secondaryBall.x = this.primaryBall.x + this.offset.x;
        this.secondaryBall.y = this.primaryBall.y + this.offset.y;


        this.secondaryBall.put(this.offset.x + x, this.offset.y + y, b);
        this.sync(this.secondaryBall, b);

        if (!Ball.findCollision(this.primaryBall, b)) return;

        this.primaryBall.put(orginalX, orginalY, b);
        this.sync(this.primaryBall, b);

    }

    sync(s, allBalls) {
        if (s === this.primaryBall) {
            this.secondaryBall.x = this.primaryBall.x + this.offset.x;
            this.secondaryBall.y = this.primaryBall.y + this.offset.y;
        } else if (s === this.secondaryBall) {
            this.primaryBall.x = this.secondaryBall.x - this.offset.x;
            this.primaryBall.y = this.secondaryBall.y - this.offset.y;
        }

    }



}

