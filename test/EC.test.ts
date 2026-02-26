import { expect, test } from 'vitest';
import { DecodeEC, EncodeEC } from '../src/core/EC.ts';
import { generateKeyPairSync } from 'crypto';

test('EncodeEC should encode the curve into a byte array', () => {
    {
        const keyPair = generateKeyPairSync('x25519');
        const jwk = keyPair.publicKey.export({ format: 'jwk' });
        const publicKey = new Uint8Array(Buffer.from(jwk.x as string, 'base64url'));
        expect(EncodeEC('curve25519', publicKey)).toEqual(new Uint8Array([0x01, ...publicKey]));
    }
    {
        const keyPair = generateKeyPairSync('x448');
        const jwk = keyPair.publicKey.export({ format: 'jwk' });
        const publicKey = new Uint8Array(Buffer.from(jwk.x as string, 'base64url'));
        expect(EncodeEC('curve448', publicKey)).toEqual(new Uint8Array([0x02, ...publicKey]));
    }
});

test('EncodeEC should throw an error for invalid curve or public key length', () => {
    expect(() => EncodeEC('curve25519', new Uint8Array(31))).toThrow("Invalid curve or public key length");
    expect(() => EncodeEC('curve448', new Uint8Array(55))).toThrow("Invalid curve or public key length");
    expect(() => EncodeEC('invalidCurve' as any, new Uint8Array(32))).toThrow("Invalid curve or public key length");
});

test('DecodeEC should decode the byte array into the curve and public key', () => {
    {
        const keyPair = generateKeyPairSync('x25519');
        const jwk = keyPair.publicKey.export({ format: 'jwk' });
        const publicKey = new Uint8Array(Buffer.from(jwk.x as string, 'base64url'));
        const encoded = EncodeEC('curve25519', publicKey);
        expect(DecodeEC(encoded)).toEqual({ curve: 'curve25519', publicKey });
    }
    {
        const keyPair = generateKeyPairSync('x448');
        const jwk = keyPair.publicKey.export({ format: 'jwk' });
        const publicKey = new Uint8Array(Buffer.from(jwk.x as string, 'base64url'));
        const encoded = EncodeEC('curve448', publicKey);
        expect(DecodeEC(encoded)).toEqual({ curve: 'curve448', publicKey });
    }
});

test('DecodeEC should throw an error for invalid encoded EC public key', () => {
    expect(() => DecodeEC(new Uint8Array(32))).toThrow("Invalid encoded EC public key");
    expect(() => DecodeEC(new Uint8Array(58))).toThrow("Invalid encoded EC public key");
});