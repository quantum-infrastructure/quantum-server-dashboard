import withAuth from "../../../../context/with-auth";
import CreateGameInstanceComponent from "../../../../components/create-game-instance";
import React from "react";

function CreateGameInstance() {
  return (
    <div className="h-full min-h-screen p-5" >
      <CreateGameInstanceComponent />
    </div>
  );
}


export default withAuth(CreateGameInstance)