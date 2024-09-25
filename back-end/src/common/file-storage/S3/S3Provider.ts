import { Readable, Stream } from 'stream';
import { Upload } from '@aws-sdk/lib-storage';

import {
  S3Client,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';

import { CryptoStreamFactory } from '../../crypto/CryptoStreamFactory';
import { IStorageProvider } from '../IStorageProvider';
import { StorageProvider } from '../StorageProvider';

export class S3Provider extends StorageProvider implements IStorageProvider {
  constructor(
    csFactory: CryptoStreamFactory,
    private client: S3Client,
    private bucket: string,
  ) {
    super(csFactory);
  }

  public async delete(id: string) {
    const command = new DeleteObjectCommand({ Bucket: this.bucket, Key: id });
    await this.client.send(command);

    return true;
  }

  public async deleteBulk(keys: string[]) {
    const deleteObjects = keys.map((key) => ({ Key: key }));
    const command = new DeleteObjectsCommand({
      Bucket: this.bucket,
      Delete: { Objects: deleteObjects },
    });
    await this.client.send(command);
    return true;
  }

  public async getStream(id: string) {
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: id });
    const s3Item: GetObjectCommandOutput = await this.client.send(command);

    const body: Readable = s3Item.Body as any;
    return body.pipe(this.csFactory.decryptionStream);
    // this was the return statement prior to changing to aws sdk v3
    // return this.client
    // 	.getObject({ Key: id, Bucket: this.bucket })
    // 	.createReadStream()
    // 	.pipe(this.csFactory.decryptionStream);
  }

  public async saveStream({ stream, id, headers } : any) {
    const encryptedStream = stream.pipe(this.csFactory.encryptionStream);

    const upload = new Upload({
      client: this.client,
      params: {
        Body: encryptedStream,
        Bucket: this.bucket,
        Key: id,
        ACL: 'public-read',
        ContentType: 'image/jpeg',
        ...headers,
      },
    });
    const a = await upload.done();

    return {
      key: id, //response.Key,
      path: `https://${this.bucket}.s3.amazonaws.com/${id}`, //response.Location,
    };
  }
}
