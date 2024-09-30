import { getPublicStorageProvider } from "../common/file-storage/storage-provider";
import { IStorageProvider } from "../common/file-storage/IStorageProvider";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { FileUpload } from "graphql-upload-ts";
// import { DataSourceService } from "../db/data-source";
import { ConfigService } from "../config/config-service";
import fs from "fs-extra";
import { buffer } from "stream/consumers";


@Service()
export class FileService {
	storageProvider: IStorageProvider;
	constructor(
		// private readonly configService: ConfigurationService,
		// private dataSourceService: DataSourceService,
		private readonly configService: ConfigService
	) {
		const  awsAccessKey = this.configService.fileService.awsAccessKey || "";
		const  awsSecretKey = this.configService.fileService.awsSecretKey || "";
		const  awsBucket = this.configService.fileService.awsBucket || "";
		const  awsRegion = this.configService.fileService.awsRegion || "";
	
			this.storageProvider = getPublicStorageProvider().getStorageProvider({
			provider: "S3",
			providerOptions: {
				accessKeyId: awsAccessKey,
				secretAccessKey: awsSecretKey,
				region: awsRegion,
				bucket: awsBucket,
			},


			
		});
	}

	async uploadFileStream(file: FileUpload) {
		// const encryptedStream = file
		// 	.createReadStream()
		// 	.pipe(this.csFactory.encryptionStream);

		// const response = await s3
		// 	.upload({
		// 		Body: encryptedStream,
		// 		Bucket: "wubge-files",
		// 		ContentType: file.mimetype,
		// 		Key:,
		// 		// ContentEncoding: file.ContentEncoding,
		// 		ACL: "public-read",
		// 		CacheControl: "immutable",
		// 	})
		// 	.promise();
		console.log("BICHuNIAAAAA")

		return await this.storageProvider.saveStream({
			id: `uploads/${uuidv4()}/${file.filename}`,
			stream: file.createReadStream(),
			headers: {
				ContentType: file.mimetype,
				CacheControl: "immutable",
				
			},
		});

		// console.log(response);
		// return response;
	}
}
