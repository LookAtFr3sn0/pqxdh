import type { pqkem } from "../types/parameters.js";

export function EncodeKEM(type: pqkem, publicKey: Uint8Array): Uint8Array {
    if (type === 'ML-KEM-512' && publicKey.length === 800) {
        let bytes = new Uint8Array([0x03, ...publicKey]);
        return bytes;
    } else if (type === 'ML-KEM-768' && publicKey.length === 1184) {
        let bytes = new Uint8Array([0x04, ...publicKey]);
        return bytes;
    } else if (type === 'ML-KEM-1024' && publicKey.length === 1568) {
        let bytes = new Uint8Array([0x05, ...publicKey]);
        return bytes;
    }
    throw new Error('Invalid KEM type or public key length');
}

export function DecodeKEM(encoded: Uint8Array): { type: pqkem, publicKey: Uint8Array } {
    if (encoded[0] === 0x03 && encoded.length === 801) {
        return { type: 'ML-KEM-512', publicKey: encoded.slice(1) };
    } else if (encoded[0] === 0x04 && encoded.length === 1185) {
        return { type: 'ML-KEM-768', publicKey: encoded.slice(1) };
    } else if (encoded[0] === 0x05 && encoded.length === 1569) {
        return { type: 'ML-KEM-1024', publicKey: encoded.slice(1) };
    }
    throw new Error('Invalid KEM encoding');
}