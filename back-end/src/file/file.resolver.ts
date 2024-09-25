import { FileService } from "./file.service";
import { FileUpload, GraphQLUpload } from "graphql-upload-ts";
import { Arg, Args, Resolver } from "type-graphql";
import { FileType } from "./file.type";
import { MutationReturnType } from "../basic-respones/basic-response";
import { Service } from "typedi";


@Service()
@Resolver(() => FileType)
export class FileResolver {
	constructor(private fileService: FileService) {}

	@MutationReturnType(() => FileType)
	async uploadFile(
		// @Arg("file")
		@Arg("file", () => GraphQLUpload)
		// @Args({ name: 'file', type: () => GraphQLUpload })
		filePromise: FileUpload,
	) {

	
		const file = await filePromise;
		console.log("HALOOO", await file)
		const uploadedFile = await this.fileService.uploadFileStream(file);

		// return uploadedFile;
		console.log(uploadedFile.key , "UPLOADED FILE")
		return {
			// key :uploadedFile.key,
			// path : uploadedFile.path
			success : true,
			data : uploadedFile

		}
	}
}
