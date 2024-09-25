import { Readable, Stream } from 'stream';
import { CryptoStreamFactory } from '../crypto/CryptoStreamFactory';
import { IStorageProvider } from './IStorageProvider';

export abstract class StorageProvider implements IStorageProvider {
  constructor(protected csFactory: CryptoStreamFactory) {}

  public abstract delete(key: string): Promise<boolean>;
  public abstract deleteBulk(keys: string[]): Promise<boolean>;

  public abstract getStream(id: string): Promise<Stream>;

  public async getBuffer(id: string) {
    const stream = await this.getStream(id);

    const result = (await new Promise((resolve, reject) => {
      let buffer: Buffer = Buffer.alloc(0);

      stream.on('data', (data: Buffer) => {
        buffer = Buffer.concat([buffer, data]);
      });

      stream.on('end', () => {
        resolve(buffer);
      });

      stream.on('error', (err) => {
        reject(err);
      });
    })) as Buffer;

    return result;
  }

  public abstract saveStream(p : any): Promise<{
    key: string;
    path: string;
  }>;

  public async saveBuffer({ buffer, id, headers }:any) {
    // All we're doing is converting the buffer into a stream and
    // passing it to saveStream, so there's no need to handle
    // encryption here.

    const stream = new Readable({
      read() {
        this.push(buffer);
        buffer = null;
      },
    });

    return await this.saveStream({ stream, id, headers });
  }
}

export default StorageProvider;
