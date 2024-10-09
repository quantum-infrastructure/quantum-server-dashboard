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
		console.log(uploadedFile,"uploadedFile")
		console.log(file,"file")



		return {
			// key :uploadedFile.key,
			// path : uploadedFile.path
			success : true,
			key : uploadedFile.key,
			path : uploadedFile.path
			
		}
	}
}
