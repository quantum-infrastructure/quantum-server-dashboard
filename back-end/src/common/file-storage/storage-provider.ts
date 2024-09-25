import { StorageProviderFactory } from './StorageProviderFactory';
import { Algorithm } from '../crypto/Algorithm';

export const getPublicStorageProvider = () =>
  new StorageProviderFactory(null!, null!);

export const getPrivateStorageProvider = () =>
  new StorageProviderFactory(null!, {
    algorithm: Algorithm.AES256CTR,
    key: Buffer.from(
      '66a4b17648a761d4ba301ec35102543a66a4b17648a761d4ba301ec35102543a',
      'hex',
    ),
  });
