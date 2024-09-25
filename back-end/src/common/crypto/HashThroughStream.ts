import { createHash, Hash, BinaryToTextEncoding } from 'crypto';
import { Transform } from 'stream';

export class HashThroughStream extends Transform {
  private hash: Hash;
  constructor(hashAlg: string) {
    super();
    this.hash = createHash(hashAlg);
  }

  public _transform(
    chunk: Buffer,
    encoding: any,
    callback: (err: Error | null, chunk?: Buffer) => void,
  ) {
    try {
      this.hash.update(chunk);
      callback(null, chunk);
    } catch (e) {
      // callback(e);
      callback(e as Error);

    }
  }

  public digest(encoding: BinaryToTextEncoding) {
    return this.hash.digest(encoding);
  }
}
