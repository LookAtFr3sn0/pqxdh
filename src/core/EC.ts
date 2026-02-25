import type { curve } from "../types/parameters.js";

export function EncodeEC(curve: curve, publicKey: Uint8Array): Uint8Array {
    if (curve === 'curve25519' && publicKey.length === 32) {
        let bytes = new Uint8Array([0x01, ...publicKey]);
        return bytes;
    } else if (curve === 'curve448' && publicKey.length === 56) {
        let bytes = new Uint8Array([0x02, ...publicKey]);
        return bytes;
    } else {
        throw new Error("Invalid curve or public key length");
    }
}

export function DecodeEC(encoded: Uint8Array): { curve: curve, publicKey: Uint8Array } {
    if (encoded.length === 33 && encoded[0] === 0x01) {
        return { curve: 'curve25519', publicKey: encoded.slice(1) };
    } else if (encoded.length === 57 && encoded[0] === 0x02) {
        return { curve: 'curve448', publicKey: encoded.slice(1) };
    } else {
        throw new Error("Invalid encoded EC public key");
    }
}