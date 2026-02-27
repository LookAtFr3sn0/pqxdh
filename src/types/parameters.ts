export type curve = 'curve25519' | 'curve448';
export type hash = 'sha256' | 'sha512';
export type info = string;
export type pqkem = 'ML-KEM-512' | 'ML-KEM-768' | 'ML-KEM-1024';
export type aead = 'AES-128-GCM' | 'AES-256-GCM' | 'ChaCha20-Poly1305';

export type signature = {
    type: 'Ed25519' | 'Ed448';
    signature: Uint8Array;
}

export type bundle = {
    IK: {
        type: curve;
        publicKey: Uint8Array;
    },
    SPK: {
        id: number;
        type: curve;
        publicKey: Uint8Array;
        signature: signature;
    },
    PQSPK: {
        id: number;
        type: pqkem;
        publicKey: Uint8Array;
        signature: signature;
    },
    OPK: Array<{
        id: number;
        type: curve;
        publicKey: Uint8Array;
    }>,
    PQOPK: Array<{
        id: number;
        type: pqkem;
        publicKey: Uint8Array;
        signature: signature;
    }>
}
