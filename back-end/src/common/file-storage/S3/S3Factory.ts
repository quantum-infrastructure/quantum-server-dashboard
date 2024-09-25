import { S3Client } from '@aws-sdk/client-s3';

import { CryptoStreamFactory } from '../../crypto/CryptoStreamFactory';
import { IS3Config } from './IS3Config';
import { S3Provider } from './S3Provider';
import { ICryptoFactoryConfiguration } from '../StorageProviderFactory';
import { DummyStreamFactory } from '../../crypto/DummyStreamFactory';

export default (
  config: IS3Config,
  cryptoFactoryConfiguration?: ICryptoFactoryConfiguration,
) => {
  let csFactory = new DummyStreamFactory();
  if (cryptoFactoryConfiguration) {
    csFactory = new CryptoStreamFactory(
      cryptoFactoryConfiguration.key,
      cryptoFactoryConfiguration.algorithm,
    ) as any;
  }
  const client = new S3Client({
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    region: config.region,
  });

  return new S3Provider(csFactory as any, client, config.bucket);
};
