// import React, { useState } from "react";
// import { gql, useMutation } from "@apollo/client";
// import {
//   GeneratePresignedUrlDocument,
//   GeneratePresignedUrlMutation,
//   GeneratePresignedUrlMutationVariables,
// } from "../../graphql/graphql";

// const UploadForm: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploadStatus, setUploadStatus] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState<boolean>(false);
//   const [isDragging, setIsDragging] = useState<boolean>(false);

//   const [generatePresignedUrlMutation, generatePresignedUrlResult] =
//     useMutation<
//       GeneratePresignedUrlMutation,
//       GeneratePresignedUrlMutationVariables
//     >(GeneratePresignedUrlDocument);

//   const handleFileAndUpload = async (selectedFile: File | null) => {
//     if (!selectedFile) {
//       setUploadStatus("Please select a file.");
//       return;
//     }

//     setFile(selectedFile);
//     setIsUploading(true);

//     try {
//       const { data } = await generatePresignedUrlMutation();
//       const presignedUrl = data?.generatePresignedUrl;
//       if (!presignedUrl) {
//         setUploadStatus("Failed to generate presigned URL.");
//         setIsUploading(false);
//         return;
//       }

//       const response = await fetch(presignedUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/zip",
//         },
//         body: selectedFile,
//       });

//       if (response.ok) {
//         setUploadStatus("File uploaded successfully!");
//       } else {
//         setUploadStatus(`Upload failed: ${response.statusText}`);
//       }
//     } catch (error) {
//       console.error("Error during upload:", error);
//       setUploadStatus("An error occurred during upload.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0] || null;
//     handleFileAndUpload(selectedFile);
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
//     event.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
//     event.preventDefault();
//     setIsDragging(false);

//     const droppedFile = event.dataTransfer.files?.[0] || null;
//     handleFileAndUpload(droppedFile);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center max-w-md mx-auto w-[500px]">
//       <label
//         htmlFor="file-input"
//         className={`flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 transition ${
//           isDragging ? "bg-gray-200 border-blue-500" : "hover:bg-gray-100"
//         } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//           <svg
//             className="w-8 h-8 mb-4 text-gray-500"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 20 16"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//             />
//           </svg>

//           {isUploading ? (
//             <div className="flex items-center justify-center">
//               <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
//             </div>
//           ) : (
//             <p className="mb-2 text-sm text-gray-500">
//               <span className="font-semibold">Click or drag to upload file</span>
//             </p>
//           )}

//           {uploadStatus && (
//             <p className="mt-2 text-sm text-green-500">{uploadStatus}</p>
//           )}
//         </div>
//         <input
//           id="file-input"
//           type="file"
//           onChange={handleFileChange}
//           className="hidden"
//           disabled={isUploading || generatePresignedUrlResult.loading}
//         />
//       </label>
//     </div>
//   );
// };

// export default UploadForm;



// import React, { useState } from "react";
// import { gql, useMutation } from "@apollo/client";
// import {
//   GeneratePresignedUrlDocument,
//   GeneratePresignedUrlMutation,
//   GeneratePresignedUrlMutationVariables,
// } from "../../graphql/graphql";

// const UploadForm: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploadStatus, setUploadStatus] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState<boolean>(false);
//   const [isDragging, setIsDragging] = useState<boolean>(false);

//   const [generatePresignedUrlMutation, generatePresignedUrlResult] =
//     useMutation<
//       GeneratePresignedUrlMutation,
//       GeneratePresignedUrlMutationVariables
//     >(GeneratePresignedUrlDocument);

//   const handleFileAndUpload = async (selectedFile: File | null) => {
//     if (!selectedFile) {
//       setUploadStatus("Please select a file.");
//       return;
//     }

//     // Validate file type (only allow zip files)
//     if (selectedFile.type !== "application/zip") {
//       setUploadStatus("Upload only zip file.");
//       return;
//     }

//     setFile(selectedFile);
//     setIsUploading(true);

//     try {
//       const { data } = await generatePresignedUrlMutation();
//       const presignedUrl = data?.generatePresignedUrl;
//       if (!presignedUrl) {
//         setUploadStatus("Failed to generate presigned URL.");
//         setIsUploading(false);
//         return;
//       }

//       const response = await fetch(presignedUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/zip",
//         },
//         body: selectedFile,
//       });

//       if (response.ok) {
//         setUploadStatus("File uploaded successfully!");
//       } else {
//         setUploadStatus(`Upload failed: ${response.statusText}`);
//       }
//     } catch (error) {
//       console.error("Error during upload:", error);
//       setUploadStatus("An error occurred during upload.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0] || null;
//     handleFileAndUpload(selectedFile);
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
//     event.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
//     event.preventDefault();
//     setIsDragging(false);

//     const droppedFile = event.dataTransfer.files?.[0] || null;
//     handleFileAndUpload(droppedFile);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center max-w-md mx-auto w-[500px]">
//       <label
//         htmlFor="file-input"
//         className={`flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 transition ${
//           isDragging ? "bg-gray-200 border-blue-500" : "hover:bg-gray-100"
//         } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//           <svg
//             className="w-8 h-8 mb-4 text-gray-500"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 20 16"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//             />
//           </svg>

//           {isUploading ? (
//             <div className="flex items-center justify-center">
//               <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
//             </div>
//           ) : (
//             <p className="mb-2 text-sm text-gray-500">
//               <span className="font-semibold">Click or drag to upload file</span>
//             </p>
//           )}

//           {uploadStatus && (
//             <p className="mt-2 text-sm text-red-500">{uploadStatus}</p>
//           )}
//         </div>
//         <input
//           id="file-input"
//           type="file"
//           onChange={handleFileChange}
//           className="hidden"
//           disabled={isUploading || generatePresignedUrlResult.loading}
//         />
//       </label>
//     </div>
//   );
// };

// export default UploadForm;




import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  GeneratePresignedUrlDocument,
  GeneratePresignedUrlMutation,
  GeneratePresignedUrlMutationVariables,
} from "../../graphql/graphql";
import clsx from "clsx";


const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [generatePresignedUrlMutation, generatePresignedUrlResult] =
    useMutation<
      GeneratePresignedUrlMutation,
      GeneratePresignedUrlMutationVariables
    >(GeneratePresignedUrlDocument);

  const handleFileAndUpload = async (selectedFile: File | null) => {
    if (!selectedFile) {
      setUploadStatus("Please select a file.");
      return;
    }

    if (selectedFile.type !== "application/zip") {
      setUploadStatus("Upload only zip file.");
      return;
    }

    setFile(selectedFile);
    setIsUploading(true);

    try {
      const { data } = await generatePresignedUrlMutation();
      const presignedUrl = data?.generatePresignedUrl;
      if (!presignedUrl) {
        setUploadStatus("Failed to generate presigned URL.");
        setIsUploading(false);
        return;
      }

      const response = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/zip",
        },
        body: selectedFile,
      });

      if (response.ok) {
        setUploadStatus("File uploaded successfully!");
      } else {
        setUploadStatus(`Upload failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during upload:", error);
      setUploadStatus("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    handleFileAndUpload(selectedFile);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0] || null;
    handleFileAndUpload(droppedFile);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto w-[500px]">
      <label
        htmlFor="file-input"
        // className={`flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 transition ${
        //   isDragging ? "bg-gray-200 border-blue-500" : "hover:bg-gray-100"
        // } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
        className={clsx(
          "flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 transition",
          {
            "bg-gray-200 border-blue-500": isDragging,
            "hover:bg-gray-100": !isDragging,
            "opacity-50 !cursor-not-allowed": isUploading,
          }
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500"
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

          {isUploading ? (
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click or drag to upload file</span>
            </p>
          )}

          {uploadStatus && (
            <p
              className={`mt-2 text-sm ${
                uploadStatus.includes("successfully") ? "text-green-500" : "text-red-500"
              }`}
            >
              {isUploading ? null :uploadStatus }
            </p>
          )}
        </div>
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading || generatePresignedUrlResult.loading}
        />
      </label>
    </div>
  );
};

export default UploadForm;
