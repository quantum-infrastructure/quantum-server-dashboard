// import { FileService } from "./file.service";
// import { FileUpload, GraphQLUpload } from "graphql-upload-ts";
// import { Arg, Args, Resolver } from "type-graphql";
// import { FileType } from "./file.type";
// import { MutationReturnType } from "../basic-respones/basic-response";
// import { Service } from "typedi";


// @Service()
// @Resolver(() => FileType)
// export class FileResolver {
// 	constructor(private fileService: FileService) {}

// 	@MutationReturnType(() => FileType)
// 	async uploadFile(
// 		@Arg("file", () => GraphQLUpload)
// 		filePromise: FileUpload,
// 	) {

// 		const file = await filePromise;
// 		const uploadedFile = await this.fileService.uploadFileStream(file);



// 		return {
// 			// key :uploadedFile.key,
// 			// path : uploadedFile.path
// 			success : true,
// 			key : uploadedFile.key,
// 			path : uploadedFile.path
			
// 		}
// 	}
// }



// import { FileService } from "./file.service";
// import { FileUpload, GraphQLUpload } from "graphql-upload-ts";
// import { Arg, Resolver, Mutation } from "type-graphql";
// import { FileType } from "./file.type";
// import { Service } from "typedi";

// @Service()
// @Resolver(() => FileType)
// export class FileResolver {
//     constructor(private fileService: FileService) {}

//     @Mutation(() => FileType)
//     async uploadFile(
//         @Arg("file", () => GraphQLUpload)
//         filePromise: FileUpload,
//     ) {
//         const file = await filePromise;

//         // Get the pre-signed URL from the FileService
//         const preSignedUrl = await this.fileService.generatePresignedUrl(file);

//         // Return the pre-signed URL to the client
//         return {
//             success: true,
//             url: preSignedUrl, // This is the URL for the client to upload the file directly to S3
//         };
//     }
// }



// import { FileService } from "./file.service";
// import { FileUpload, GraphQLUpload } from "graphql-upload-ts";
// import { Arg, Resolver, Mutation, ObjectType, Field } from "type-graphql";
// import { Service } from "typedi";
// import { FileType } from "./file.type";  // Assuming this is your GraphQL file type for the response
// // import { MutationReturnType } from "../basic-respones/basic-response";




// @ObjectType()
// export class FileTypeMutation {
//   @Field()
//   success: boolean;

//   @Field()
//   presignedUrl: string;
// }

// @Service()
// @Resolver(() => FileType)  // Assuming you have a file type for GraphQL response
// export class FileResolver {
//   constructor(private fileService: FileService) {}

//   @Mutation(() => FileType)
//   async generatePresignedUrl(
//     @Arg("file", () => GraphQLUpload) file: FileUpload
//   ): Promise<{ success: boolean; presignedUrl: string }> {
//     try {
//       const presignedUrl = await this.fileService.generatePresignedUrl(file);
      
//       return {
//         success: true,
//         presignedUrl, // Return the pre-signed URL
//       };
//     } catch (error) {
//       console.error("Error generating pre-signed URL:", error);
      
//       return {
//         success: false,
//         presignedUrl: "",
//       };
//     }
//   }
// }




import { FileService } from "./file.service";
import { FileUpload, GraphQLUpload } from "graphql-upload-ts";
import { Arg, Resolver, Mutation } from "type-graphql";
import { Service } from "typedi";
import { FileType } from "./file.type";  

@Service()
@Resolver(() => FileType)  
export class FileResolver {
  constructor(private fileService: FileService) {}



  @Mutation(() => String)
  async generatePresignedUrl(): Promise<string> {
    return this.fileService.generatePresignedUrl();
  }

  // @Mutation(() => FileType)
  // async generatePresignedUrl(){
  //   try {
  //     // Generate the pre-signed URL using the FileService
  //     const presignedUrl = await this.fileService.generatePresignedUrl(file);

  //     // Assuming the FileService returns an object with key and path
  //     const { key, path } = presignedUrl; // Destructure the response from the service

  //     return {
		
  //       key,    // Return the S3 key of the uploaded file
  //       path,   // Return the URL or path where the file can be accessed
  //     };
  //   } catch (error) {
  //     console.error("Error generating pre-signed URL:", error);
      
  //     return {
  //       key: "",  // Returning empty string in case of an error
  //       path: "", // Returning empty string in case of an error
  //     };
  //   }
  // }
}
