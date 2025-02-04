import { useCreateGameInstanceMutation } from "../../graphql/graphql";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGameInstanceComponent() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState<number>(1);
  const [id, setId] = useState<string>("");

  const [createGameInstanceMutation, createGameInstanceResult] =
    useCreateGameInstanceMutation();

  if (createGameInstanceResult.data?.createGameInstance.success) {
    navigate("/dashboard/game-instance", { replace: true });
  }

  if (createGameInstanceResult.loading) {
    return <div>Please wait...</div>;
  }

  // console.log(amount);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createGameInstanceMutation({
         variables:{
          id : id
         }
        });
      }}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
        </label>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-[500px]"
          type="text"
          placeholder="Enter your game instance id"
          value={id}
          onChange={(e: any) => {
           setId(e.target.value)
          }}
        />
      </div>

{ createGameInstanceResult.loading?  <div className="flex justify-center">
             <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
           </div> :  <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        disabled={createGameInstanceResult.loading}
      >
        Create
      </button>}

     
    </form>
  );
}
