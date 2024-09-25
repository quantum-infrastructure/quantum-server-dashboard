import { Field, InputType, ObjectType } from "type-graphql";
import { Stream } from "stream";

@InputType("FileTypeDto")
@ObjectType("FileType")
export class FileType {
	@Field(type => String)
	path: string;

	@Field(type => String)
	key: string;
}





// export interface Upload {
//   filename: string;
//   mimetype: string;
//   encoding: string;
//   createReadStream: () => Stream;
// }