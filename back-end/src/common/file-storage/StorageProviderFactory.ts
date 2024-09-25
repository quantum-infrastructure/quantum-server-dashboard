import { IStorageProvider } from './IStorageProvider';
import { IS3Config } from './S3/IS3Config';
import { Algorithm } from '../crypto/Algorithm';

import createS3Provider from './S3/S3Factory';

const factories: {
  [key in StorageProviderName]: (
    config: StorageProviderConfig,
    cryptoFactoryConfiguration?: ICryptoFactoryConfiguration,
  ) => IStorageProvider;
} = {
  S3: createS3Provider,
};

export type StorageProviderName = 'S3';
type StorageProviderConfig = IS3Config;

export interface IStorageProviderConfiguration {
  provider: StorageProviderName;
  providerOptions: StorageProviderConfig;
}

export interface ICryptoFactoryConfiguration {
  key: Buffer;
  //Algorithm.AES256CTR
  algorithm: Algorithm;
}

export class StorageProviderFactory {
  constructor(
    private defaultProviderConfiguration?: IStorageProviderConfiguration,
    private cryptoFactoryConfiguration?: ICryptoFactoryConfiguration,
  ) {}

  public getStorageProvider(
    config?: IStorageProviderConfiguration,
  ): IStorageProvider {
    if (!config && !this.defaultProviderConfiguration) {
      throw new Error('Unable to resolve storage provider config');
    }

    if (!config) {
      return this.getStorageProvider(this.defaultProviderConfiguration);
    }

    const { provider, providerOptions } = config;
    return factories[provider](
      providerOptions,
      this.cryptoFactoryConfiguration,
    );
  }
}
