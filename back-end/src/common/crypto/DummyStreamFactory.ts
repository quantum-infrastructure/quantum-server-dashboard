import { DummyStream } from './DummyStream';

export class DummyStreamFactory {
  constructor() {}

  public get encryptionStream() {
    // Create encryption stream
    return new DummyStream();
  }

  public get decryptionStream() {
    return new DummyStream();
  }
}
