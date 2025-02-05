import UploadForm from "../../../components/upload/upload";
import React from "react";

import withAuth from "../../../context/with-auth";


function FileUpload (){



    return (
        <div className="h-full min-h-screen p-5">
            <UploadForm/>
        </div>
    );


}
    

export default withAuth(FileUpload)


    


