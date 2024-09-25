import { Cipher, createCipheriv, randomBytes, Encoding } from 'crypto';
import { Transform } from 'stream';

import { Algorithm } from './Algorithm';

export class EncryptionStream extends Transform {
  private iv: Buffer;
  private isFirstChunk: boolean;
  private cipher: Cipher;

  constructor(
    algorithm: Algorithm,
    key: Buffer,
    private outputEncoding: Encoding = 'binary',
    private rb = randomBytes,
  ) {
    super();

    this.iv = this.rb(16);
    if (this.iv.indexOf(':') >= 0) {
      this.iv.write('.', this.iv.indexOf(':'));
    }
    this.isFirstChunk = true;
    this.cipher = createCipheriv(algorithm, key, this.iv);
  }

  public _transform(
    chunk: Buffer,
    encoding: Encoding,
    callback: (err?: Error) => void,
  ) {
    const cipherText = this.cipher.update(
      chunk as any,
      this.outputEncoding as any,
    );
    // Returns IV and ciphertext
    if (this.isFirstChunk) {
      // Return IV and colon delimeter
      this.isFirstChunk = false;
      this.push(Buffer.concat([this.iv, Buffer.from(':'), cipherText] as any));
      return callback();
    }

    this.push(cipherText);
    callback();
  }

  public _flush(callback: (err?: Error) => void) {
    // Accepts plaintext and passes to the cipher
    this.push(this.cipher.final(this.outputEncoding));
    callback();
  }
}
