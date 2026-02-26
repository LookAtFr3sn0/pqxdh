import { expect, test } from 'vitest';
import { DecodeKEM, EncodeKEM } from '../src/core/KEM.ts';
import { ml_kem512, ml_kem768, ml_kem1024 } from '@noble/post-quantum/ml-kem.js';

test('EncodeKEM should encode the KEM into a byte array', () => {
    {
        const keyPair = ml_kem512.keygen();
        const publicKey = keyPair.publicKey;
        expect(EncodeKEM('ML-KEM-512', publicKey)).toEqual(new Uint8Array([0x03, ...publicKey]));
    }
    {
        const keyPair = ml_kem768.keygen();
        const publicKey = keyPair.publicKey;
        expect(EncodeKEM('ML-KEM-768', publicKey)).toEqual(new Uint8Array([0x04, ...publicKey]));
        
    }
    {
        const keyPair = ml_kem1024.keygen();
        const publicKey = keyPair.publicKey;
        expect(EncodeKEM('ML-KEM-1024', publicKey)).toEqual(new Uint8Array([0x05, ...publicKey]));
        
    }
});

test('EncodeKEM should throw an error for invalid KEM type or public key length', () => {
    expect(() => EncodeKEM('ML-KEM-512', new Uint8Array(799))).toThrow('Invalid KEM type or public key length');
    expect(() => EncodeKEM('ML-KEM-768', new Uint8Array(1183))).toThrow('Invalid KEM type or public key length');
    expect(() => EncodeKEM('ML-KEM-1024', new Uint8Array(1567))).toThrow('Invalid KEM type or public key length');
    expect(() => EncodeKEM('invalid-KEM' as any, new Uint8Array(800))).toThrow('Invalid KEM type or public key length');
});

test('DecodeKEM should decode the byte array into the KEM type and public key', () => {
    {
        const keyPair = ml_kem512.keygen();
        const publicKey = keyPair.publicKey;
        const encoded = EncodeKEM('ML-KEM-512', publicKey);
        expect(DecodeKEM(encoded)).toEqual({ type: 'ML-KEM-512', publicKey });
    }
    {
        const keyPair = ml_kem768.keygen();
        const publicKey = keyPair.publicKey;
        const encoded = EncodeKEM('ML-KEM-768', publicKey);
        expect(DecodeKEM(encoded)).toEqual({ type: 'ML-KEM-768', publicKey });
    }
    {
        const keyPair = ml_kem1024.keygen();
        const publicKey = keyPair.publicKey;
        const encoded = EncodeKEM('ML-KEM-1024', publicKey);
        expect(DecodeKEM(encoded)).toEqual({ type: 'ML-KEM-1024', publicKey });
    }
});

test('DecodeKEM should throw an error for invalid KEM encoding', () => {
    expect(() => DecodeKEM(new Uint8Array(801))).toThrow('Invalid KEM encoding');
    expect(() => DecodeKEM(new Uint8Array(1185))).toThrow('Invalid KEM encoding');
});
