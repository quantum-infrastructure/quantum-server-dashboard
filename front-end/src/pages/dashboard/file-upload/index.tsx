import UploadForm from "../../../components/upload/upload";
import React from "react";

import withAuth from "../../../context/with-auth";


function FileUpload (){



    return (
        <div>
            <UploadForm/>
        </div>
    );


}
    

export default withAuth(FileUpload)


    


