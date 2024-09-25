import { Encoding } from 'crypto';
import { Algorithm } from './Algorithm';
import { DecryptionStream } from './DecryptionStream';
import { EncryptionStream } from './EncryptionStream';
import { Transform } from 'stream';

export class CryptoStreamFactory {
  constructor(
    private key: Buffer,
    private algorithm: Algorithm = Algorithm.AES256CTR,
    private encoding: Encoding = 'binary',
  ) {}

  public get encryptionStream() {
    // Create encryption stream
    return new EncryptionStream(this.algorithm, this.key, this.encoding);
  }

  public get decryptionStream() {
    return new DecryptionStream(this.algorithm, this.key);
  }
}
