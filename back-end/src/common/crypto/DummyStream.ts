import { Encoding } from 'crypto';
import { Transform } from 'stream';

export class DummyStream extends Transform {
  constructor() {
    super();
  }

  public _transform(
    chunk: Buffer,
    encoding: Encoding,
    callback: (err?: Error) => void,
  ) {
    this.push(chunk);
    callback();
  }
}
