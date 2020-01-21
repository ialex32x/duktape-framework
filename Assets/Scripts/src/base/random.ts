
// https://github.com/davidbau/seedrandom

function Mash() {
    var n = 0xefc8249d;
    var mash = function (data) {
        data = String(data);
        for (var i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            var h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000; // 2^32
        }
        return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };
    return mash;
}

function copy(f, t) {
    t.c = f.c;
    t.s0 = f.s0;
    t.s1 = f.s1;
    t.s2 = f.s2;
    return t;
}

function Alea(seed) {
    var me = this, mash = Mash();
    me.next = function () {
        var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
        me.s0 = me.s1;
        me.s1 = me.s2;
        return me.s2 = t - (me.c = t | 0);
    };

    // Apply the seeding algorithm from Baagoe.
    me.c = 1;
    me.s0 = mash(' ');
    me.s1 = mash(' ');
    me.s2 = mash(' ');
    me.s0 -= mash(seed);
    if (me.s0 < 0) { me.s0 += 1; }
    me.s1 -= mash(seed);
    if (me.s1 < 0) { me.s1 += 1; }
    me.s2 -= mash(seed);
    if (me.s2 < 0) { me.s2 += 1; }
    mash = null;
}

// function impl(seed, opts) {
//     var xg = new Alea(seed),
//         state = opts && opts.state,
//         prng = xg.next;
//     prng.int32 = function () { return (xg.next() * 0x100000000) | 0; }
//     prng.double = function () {
//         return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
//     };
//     if (state) {
//         if (typeof (state) == 'object') { copy(state, xg); }
//         prng.state = function () { return copy(xg, {}); }
//     }
//     return prng;
// }

export class Random {
    private xg: any;
    readonly next: () => number;

    constructor(seed?: number | string, state?: any) {
        this.xg = new Alea(seed || Date.now());
        this.next = this.xg.next;
        if (state && typeof (state) == 'object') {
            copy(state, this.xg);
        }
    }

    get value() {
        return this.next() + (this.next() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    }

    double() {
        return this.next() + (this.next() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    }

    int32() {
        return (this.next() * 0x100000000) | 0;
    }

    rangeDouble(min: number, max: number) {
        let r = this.double();
        return r * (max - min) + min;
    }

    range32(min: number, max: number) {
        let r = this.next() * 0x100000000;
        return r % (max - min) + min;
    }

    state() {
        return copy(this.xg, {});
    }
}