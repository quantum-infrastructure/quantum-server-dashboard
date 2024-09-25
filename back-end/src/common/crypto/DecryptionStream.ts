import { createDecipheriv, Decipher, Encoding } from 'crypto';
import { Transform } from 'stream';

import { Algorithm } from './Algorithm';

export class DecryptionStream extends Transform {
  private decipher: Decipher;
  private ivChunks: Buffer[] = [];

  constructor(
    private algorithm: Algorithm,
    private key: Buffer,
  ) {
    super();
  }

  public _transform(
    chunk: Buffer,
    encoding: Encoding,
    callback: (err?: Error) => void,
  ) {
    if (this.decipher) {
      this.push(this.decipher.update(chunk));
      return callback();
    }

    // Process the chunk to try to extract the IV
    const ivBoundary = chunk.indexOf(':');

    if (ivBoundary > 64) {
      // IV is larger than 256 bits, we should reject it
      return callback(new Error('IV boundary not found in first 260 bits'));
    }

    if (ivBoundary >= 0) {
      // We've got the end of our IV
      this.ivChunks.push(chunk.slice(0, ivBoundary));
      const iv = Buffer.concat(this.ivChunks as any);

      this.decipher = createDecipheriv(this.algorithm, this.key, iv);

      const input = chunk.slice(ivBoundary + 1);

      this.push(this.decipher.update(input));

      return callback();
    }

    // The IV boundary character isn't in this chunk
    this.ivChunks.push(chunk);

    if (this.ivChunks.join().length > 64) {
      return callback(new Error('IV boundary not found in first 260 bits'));
    }

    callback();
  }

  public _flush(callback: (err?: Error) => void) {
    if (!this.decipher) {
      return callback(
        new Error('Could not resolve IV boundary ":" in input stream'),
      );
    }

    // Accepts plaintext and passes to the cipher
    this.push(this.decipher.final());
    callback();
  }
}
