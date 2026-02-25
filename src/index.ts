import type { aead, curve, hash, info, pqkem } from "./types/parameters.js";

export class PQXDH {
    readonly curve: curve;
    readonly hash: hash;
    readonly info: info;
    readonly pqkem: pqkem;
    readonly aead: aead;
    constructor(curve: curve, hash: hash, info: info, pqkem: pqkem, aead: aead) {
        this.curve = curve;
        this.hash = hash;
        this.info = info;
        this.pqkem = pqkem;
        this.aead = aead;
    }

    public getCurve(): curve { return this.curve; }
    public getHash(): hash { return this.hash; }
    public getInfo(): info { return this.info; }
    public getPQKEM(): pqkem { return this.pqkem; }
    public getAEAD(): aead { return this.aead; }
}