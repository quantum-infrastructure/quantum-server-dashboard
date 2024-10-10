import React, { ChangeEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  FileType,
  UploadFileDocument,
  UploadFileMutation,
  UploadFileMutationVariables,
} from "../../graphql/graphql";

function UploadForm() {
  const [uploadFileMutation, uploadFileResult] = useMutation<
    UploadFileMutation,
    UploadFileMutationVariables
  >(UploadFileDocument);

  const [uploadedFileData, setUploadedFileData] = useState<{
    key: string;
    path: string;
  } | null>(null);

  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];



    if (file) {
      setFileName(file.name);
    }

    if (file) {
      try {
        const { data } = await uploadFileMutation({
          variables: { file },
          context: {
            headers: { "apollo-require-preflight": "true" },
          },
        });

        if (data?.uploadFile?.data) {
          setUploadedFileData({
            key: data.uploadFile.data.key,
            path: data.uploadFile.data.path,
          });
        } else {
          console.error("No data returned from server.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

 

  return (
    <div>
      {/* <input type="file" onChange={handleFileChange} /> */}
      <div className="flex items-center justify-center w-full " >
        <label
          htmlFor="dropzone-file"
          className=" pt-[100px] pr-[100px] pb-[100px] pl-[100px] flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> 
            </p>


          

            {uploadFileResult.data?.uploadFile.success && (
              <p className="mt-2 text-sm text-green-500">
                File uploaded: {fileName}
              </p>
            )}
           
          </div>
          <input onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
}

export default UploadForm;

// const [uploadFileMutation] = useMutation<
// UploadFileMutation,
// UploadFileMutationVariables
//   >(UploadFileDocument);

///old one

// headers: { 'Content-Type': 'multipart/form-data', 'apollo-require-preflight': 'true' },
