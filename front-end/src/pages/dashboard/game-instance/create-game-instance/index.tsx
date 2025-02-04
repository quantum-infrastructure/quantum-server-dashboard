import withAuth from "../../../../context/with-auth";
import CreateGameInstanceComponent from "../../../../components/create-game-instance";
import React from "react";

function CreateGameInstance() {
  return (
    <div>
      <CreateGameInstanceComponent />
    </div>
  );
}


export default withAuth(CreateGameInstance)