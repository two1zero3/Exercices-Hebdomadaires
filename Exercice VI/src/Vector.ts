class Vector {
    constructor(public x: number, public y: number) {
        this.x = x;
        this.y = y;
    }

    heading(): number {
        return Math.atan2(this.y, this.x);
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    sub(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    mult(n: number): Vector {
        return new Vector(this.x * n, this.y * n);
    }

    div(n: number): Vector {
        return new Vector(this.x / n, this.y / n);
    }

    normalize(): Vector {
        return this.div(this.magnitude());
    }

    limit(max: number): Vector {
        if (this.magnitude() > max) {
            return this.normalize().mult(max);
        } else {
            return this;
        }
    }

    setMag(n: number): Vector {
        return this.normalize().mult(n);
    }

}