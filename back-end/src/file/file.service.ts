// import { S3Client,ObjectCannedACL } from "@aws-sdk/client-s3"; // AWS SDK v3
// import { FileUpload } from "graphql-upload-ts";
// import { Service } from "typedi";
// import { v4 as uuidv4 } from "uuid";
// import { Upload } from "@aws-sdk/lib-storage"; // Import Upload from lib-storage
// import { ConfigService } from "../config/config-service";

// @Service()
// export class FileService {
//     private s3Client: S3Client;

//     constructor(private readonly configService: ConfigService) {

// 		const isLocal = process.env.NODE_ENV === 'local';

       


// 		if (isLocal) {
//             const awsAccessKey = this.configService.fileService.awsAccessKey || "";
//             const awsSecretKey = this.configService.fileService.awsSecretKey || "";
//             const awsRegion = this.configService.fileService.awsRegion || "eu-central-1"; // Default region if not provided

//             this.s3Client = new S3Client({
//                 region: awsRegion,
//                 credentials: {
//                     accessKeyId: awsAccessKey,
//                     secretAccessKey: awsSecretKey,
//                 },
//             });
//         } else {
//             // Use default credentials from environment variables for production
//             this.s3Client = new S3Client({ region: this.configService.fileService.awsRegion || ""  }); // Replace with your production region
//         }
//     }
    


//     async uploadFileStream(file: FileUpload): Promise<any> {
//         const awsBucket = "simple-app-stack-1-dashboardsimpleappstack1gamebui-c2cwi5xtphke";
//         // const awsBucket = this.configService.fileService.awsBucket || "";

//         const fileKey = `uploads/${uuidv4()}/${file.filename}`;

//         const uploadParams = {
//             Bucket: awsBucket,
//             Key: fileKey,
//             Body: file.createReadStream(), 
//             ContentType: file.mimetype, 

            
//         };

//         const upload = new Upload({
//             client: this.s3Client,
//             params: uploadParams,
//             leavePartsOnError: false, 
            
//         });

//         try {
//             const data = await upload.done(); 
//             console.log("Successfully uploaded file to S3:", data);

//             return {
//                 success: true,
//                 data,
//             };
//         } catch (error) {
//             console.error("Error uploading file to S3:", error);
//         }
//     }
// }



// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"; // AWS SDK v3
// import { FileUpload } from "graphql-upload-ts";
// import { Service } from "typedi";
// import { v4 as uuidv4 } from "uuid";
// import { ConfigService } from "../config/config-service";
// import { GetSignedUrlCommand } from "@aws-sdk/s3-request-presigner"; // for generating presigned URLs

// @Service()
// export class FileService {
//     private s3Client: S3Client;

//     constructor(private readonly configService: ConfigService) {
//         const isLocal = process.env.NODE_ENV === 'local';

//         if (isLocal) {
//             const awsAccessKey = this.configService.fileService.awsAccessKey || "";
//             const awsSecretKey = this.configService.fileService.awsSecretKey || "";
//             const awsRegion = this.configService.fileService.awsRegion || "eu-central-1"; // Default region if not provided

//             this.s3Client = new S3Client({
//                 region: awsRegion,
//                 credentials: {
//                     accessKeyId: awsAccessKey,
//                     secretAccessKey: awsSecretKey,
//                 },
//             });
//         } else {
//             // Use default credentials from environment variables for production
//             this.s3Client = new S3Client({ region: this.configService.fileService.awsRegion || ""  }); // Replace with your production region
//         }
//     }

//     // Generate the pre-signed URL for file upload to S3
//     async generatePresignedUrl(file: FileUpload): Promise<string> {
//         const awsBucket = "simple-app-stack-1-dashboardsimpleappstack1gamebui-c2cwi5xtphke"; // your bucket name
//         const fileKey = `uploads/${uuidv4()}/${file.filename}`;

//         // Parameters for the pre-signed URL
//         const params = {
//             Bucket: awsBucket,
//             Key: fileKey,
//             Expires: 60 * 5, // URL valid for 5 minutes
//             ContentType: file.mimetype, // the MIME type of the file
//         };

//         // Generate the pre-signed URL
//         const command = new GetSignedUrlCommand(params);
//         const url = await this.s3Client.send(command);

//         return url;
//     }
// }



// @Service()
// export class FileService {
//     private s3Client: S3Client;

//     constructor(private readonly configService: ConfigService) {
//         const isLocal = process.env.NODE_ENV === 'local';

//         if (isLocal) {
//             const awsAccessKey = this.configService.fileService.awsAccessKey || "";
//             const awsSecretKey = this.configService.fileService.awsSecretKey || "";
//             const awsRegion = this.configService.fileService.awsRegion || "eu-central-1"; // Default region if not provided

//             this.s3Client = new S3Client({
//                 region: awsRegion,
//                 credentials: {
//                     accessKeyId: awsAccessKey,
//                     secretAccessKey: awsSecretKey,
//                 },
//             });
//         } else {
//             // Use default credentials from environment variables for production
//             this.s3Client = new S3Client({ region: this.configService.fileService.awsRegion || ""  }); // Replace with your production region
//         }
//     }

//     // Generate the pre-signed URL for file upload to S3
//     async generatePresignedUrl(file: FileUpload): Promise<string> {
//         const awsBucket = "simple-app-stack-1-dashboardsimpleappstack1gamebui-c2cwi5xtphke"; // your bucket name
//         const fileKey = `uploads/${uuidv4()}/${file.filename}`;

//         // Parameters for the pre-signed URL
//         const params = {
//             Bucket: awsBucket,
//             Key: fileKey,
//             Expires: new Date(Date.now() + 60 * 5 * 1000), // URL valid for 5 minutes
//             ContentType: file.mimetype, // the MIME type of the file
//         };

//         // Use getSignedUrl to generate the pre-signed URL
//         const command = new PutObjectCommand(params); // Creating the command to be signed
//         const presignedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 }); // Get signed URL for upload

//         return presignedUrl; // Return the pre-signed URL
//     }
// }


import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; // AWS SDK v3
import { FileUpload } from "graphql-upload-ts";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { ConfigService } from "../config/config-service";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; // Correct import for generating presigned URLs




@Service()
export class FileService {
    private s3Client: S3Client;

    constructor(private readonly configService: ConfigService) {
        const isLocal = process.env.NODE_ENV === "local";

        if (isLocal) {
            const awsAccessKey = this.configService.fileService.awsAccessKey || "";
            const awsSecretKey = this.configService.fileService.awsSecretKey || "";
            const awsRegion = this.configService.fileService.awsRegion || "eu-central-1"; 

            this.s3Client = new S3Client({
                region: awsRegion,
                credentials: {
                    accessKeyId: awsAccessKey,
                    secretAccessKey: awsSecretKey,
                },
            });
        } else {
            this.s3Client = new S3Client({ region: this.configService.fileService.awsRegion || "" });
        }
    }

    async generatePresignedUrl() {
        // const awsBucket = "nikusha-bucket";  // Ensure you have the correct bucket name
        const awsBucket = this.configService.fileService.awsBucket || ""

        const command = new PutObjectCommand({
            Bucket: awsBucket,
            Key : `${uuidv4()}.zip`,
            ContentType: 'application/zip',
        });

        const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

        return signedUrl

}}


// @Service()
// export class FileService {
//     private s3Client: S3Client;
  
//     constructor(private readonly configService: ConfigService) {
//       const isLocal = process.env.NODE_ENV === "local";
  
//       if (isLocal) {
//         const awsAccessKey = this.configService.fileService.awsAccessKey || "";
//         const awsSecretKey = this.configService.fileService.awsSecretKey || "";
//         const awsRegion = this.configService.fileService.awsRegion || "eu-central-1"; 
  
//         this.s3Client = new S3Client({
//           region: awsRegion,
//           credentials: {
//             accessKeyId: awsAccessKey,
//             secretAccessKey: awsSecretKey,
//           },
//         });
//       } else {
//         this.s3Client = new S3Client({ region: this.configService.fileService.awsRegion || "" });
//       }
//     }
  
//     async generatePresignedUrl(file: FileUpload): Promise<{ key: string; path: string }> {
//       const awsBucket = "my-test-bucket-nika";  // Ensure you have the correct bucket name
  
//       const fileKey = `uploads/${uuidv4()}/${file.filename}`;
//       const command = new PutObjectCommand({
//         Bucket: awsBucket,
//         Key: fileKey,
//         Expires: new Date(Date.now() + 60 * 5 * 1000), // Expiration time in seconds
//         ContentType:'application/zip',
//         // ContentType: file.mimetype,
//       });
  
//       // Use the pre-signed URL generation function
//       const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

//       console.log(signedUrl,"LOOO")
  
//       // Return an object containing both the `key` and `path` (the URL)
//       return {
//         key: fileKey,
//         path: signedUrl,
//       };
//     }
//   }