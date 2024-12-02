// import React, { ChangeEvent, useState } from "react";
// import { gql, useMutation } from "@apollo/client";
// import {
//   FileType,
//   UploadFileDocument,
//   UploadFileMutation,
//   UploadFileMutationVariables,
// } from "../../graphql/graphql";

// function UploadForm() {
//   const [uploadFileMutation, uploadFileResult] = useMutation<
//     UploadFileMutation,
//     UploadFileMutationVariables
//   >(UploadFileDocument);

//   const [uploadedFileData, setUploadedFileData] = useState<{
//     key: string;
//     path: string;
//   } | null>(null);

//   const [fileName, setFileName] = useState<string | null>(null);

//   const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];



//     if (file) {
//       setFileName(file.name);
//     }

//     if (file) {
//       try {
//         const { data } = await uploadFileMutation({
//           variables: { file },
//           context: {
//             headers: { "apollo-require-preflight": "true" },
//           },
//         });

//         if (data?.uploadFile?.data) {
//           setUploadedFileData({
//             key: data.uploadFile.data.key,
//             path: data.uploadFile.data.path,
//           });
//         } else {
//           console.error("No data returned from server.");
//         }
//       } catch (error) {
//         console.error("Error uploading file: ", error);
//       }
//     }
//   };

 

//   return (
//     <div>
//       {/* <input type="file" onChange={handleFileChange} /> */}
//       <div className="flex items-center justify-center w-full " >
//         <label
//           htmlFor="dropzone-file"
//           className=" pt-[100px] pr-[100px] pb-[100px] pl-[100px] flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//         >
          
//           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//             <svg
//               className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 16"
//             >
//               <path
//                 stroke="currentColor"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//               />
//             </svg>
//             <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//               <span className="font-semibold">Click to upload</span> 
//             </p>


          

//             {uploadFileResult.data?.uploadFile.success && (
//               <p className="mt-2 text-sm text-green-500">
//                 File uploaded: {fileName}
//               </p>
//             )}
           
//           </div>
//           <input onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
//         </label>
//       </div>
//     </div>
//   );
// }

// export default UploadForm;

// // const [uploadFileMutation] = useMutation<
// // UploadFileMutation,
// // UploadFileMutationVariables
// //   >(UploadFileDocument);

// ///old one

// // headers: { 'Content-Type': 'multipart/form-data', 'apollo-require-preflight': 'true' },





// import React, { ChangeEvent, useState } from "react";
// import { gql, useMutation } from "@apollo/client";
// import {  GeneratePresignedUrlDocument, GeneratePresignedUrlMutation, GeneratePresignedUrlMutationVariables } from "../../graphql/graphql";

// function UploadForm() {
//   const [generatePresignedUrlMutation] = useMutation<GeneratePresignedUrlMutation, GeneratePresignedUrlMutationVariables>(GeneratePresignedUrlDocument);
//   const [uploadedFileData, setUploadedFileData] = useState<{ key: string; path: string } | null>(null);
//   const [fileName, setFileName] = useState<string | null>(null);



//   const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
    
//     if (!file) return;

//     setFileName(file.name);
  
//     // Request a presigned URL from the server
//     const { data } = await generatePresignedUrlMutation({
//       context: {
//         headers: { "apollo-require-preflight": "true" },
//       },
//     });
  
//     console.log("Presigned URL response:", data); // Debug log
  
//     if (data?.generatePresignedUrl?.key && data.generatePresignedUrl?.path) {
//       const { key, path } = data.generatePresignedUrl;
  
//       // Modified fetch request with explicit CORS headers
//       const uploadResponse = await fetch(path, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/zip",
//           "Access-Control-Allow-Origin": "*",
//           // Add other headers that might be needed
//         },
//         body: `${Date.now()}.zip`,
//         mode: "cors", // Explicitly set CORS mode
//       });
  
//       console.log("Upload response status:", uploadResponse.status); // Debug log
  
     
//     } 
//   };




//   return (
//     <div>
//       <div className="flex items-center justify-center w-full">
//         <label
//           htmlFor="dropzone-file"
//           className="pt-[100px] pr-[100px] pb-[100px] pl-[100px] flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//         >
//           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//             <svg
//               className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 16"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//               />
//             </svg>
//             <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//               <span className="font-semibold">Click to upload</span>
//             </p>

//             {uploadedFileData && uploadedFileData.key && uploadedFileData.path && (
//               <p className="mt-2 text-sm text-green-500">
//                 File uploaded: {fileName}
//               </p>
//             )}
//           </div>

//           <input onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
//         </label>
//       </div>
//     </div>
//   );
// }

// export default UploadForm;




import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {  GeneratePresignedUrlDocument, GeneratePresignedUrlMutation, GeneratePresignedUrlMutationVariables } from "../../graphql/graphql";


const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const [generatePresignedUrlMutation] = useMutation<GeneratePresignedUrlMutation, GeneratePresignedUrlMutationVariables>(GeneratePresignedUrlDocument);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files?.[0] || null;
  //   setFile(selectedFile);
  // };

  // const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {


  //   const selectedFile = event.target.files?.[0] || null;
  //   setFile(selectedFile);

  //   if (!file) {
  //     setUploadStatus("Please select a file.");
  //     return;
  //   }

  //   try {
  //     // Request the presigned URL
  //     const { data } = await generatePresignedUrlMutation();

  //     const presignedUrl = data?.generatePresignedUrl;
  //     if (!presignedUrl) {
  //       setUploadStatus("Failed to generate presigned URL.");
  //       return;
  //     }

  //     // Upload the file using the presigned URL
  //     const response = await fetch(presignedUrl, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/zip',
  //       },
  //       body: file,
  //     });

  //     if (response.ok) {
  //       setUploadStatus("File uploaded successfully!");
  //     } else {
  //       setUploadStatus(`Upload failed: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     console.error("Error during upload:", error);
  //     setUploadStatus("An error occurred during upload.");
  //   }
  // };


  const handleFileAndUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the selected file
    const selectedFile = event.target.files?.[0] || null;
    
    if (selectedFile) {
      // Set the file to the state
      setFile(selectedFile);
    }
  
    if (!selectedFile) {
      setUploadStatus("Please select a file.");
      return;
    }
  
    try {
      // Request the presigned URL
      const { data } = await generatePresignedUrlMutation();
  
      const presignedUrl = data?.generatePresignedUrl;
      if (!presignedUrl) {
        setUploadStatus("Failed to generate presigned URL.");
        return;
      }
  
      // Upload the file using the presigned URL
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/zip',
        },
        body: selectedFile, // Use the selected file here
      });
  
      if (response.ok) {
        setUploadStatus("File uploaded successfully!");
      } else {
        setUploadStatus(`Upload failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during upload:", error);
      setUploadStatus("An error occurred during upload.");
    }
  };
  

  return (
    // <div>
    //   <h2>File Uploader</h2>
    //   <input type="file" onChange={handleUpload} />
    //   {/* <button onClick={handleUpload} disabled={!file}>
    //     Upload
    //   </button> */}
    //   {uploadStatus && <p>{uploadStatus}</p>}
    // </div>
    <div className="flex flex-col items-center justify-center max-w-md mx-auto w-[500px]" >
  
  <label
    htmlFor="file-input"
    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
  >
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <svg
        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
      </p>
      {uploadStatus && <p className="mt-2 text-sm text-green-500">{uploadStatus}</p>}
    </div>
    <input
      id="file-input"
      type="file"
      onChange={handleFileAndUpload}
      className="hidden"
    />
  </label>
</div>


  );
};

export default UploadForm;
