import { Stream } from 'stream';
import { PutObjectRequest } from '@aws-sdk/client-s3';

type Headers = Omit<PutObjectRequest, 'Bucket' | 'Key'>;

export interface IStorageProvider {
  delete(key: string): Promise<boolean>;
  deleteBulk(keys: string[]): Promise<boolean>;
  getBuffer(id: string): Promise<Buffer>;
  getStream(id: string): Promise<Stream>;
  saveBuffer(p: { buffer: Buffer; id: string; headers?: Headers }): Promise<{
    key: string;
    path: string;
  }>;
  saveStream(p: { stream: Stream; id: string; headers?: Headers }): Promise<{
    key: string;
    path: string;
  }>;
}
