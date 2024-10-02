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

  console.log(amount);

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
          Enter your game instance id
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter your game instance id"
          value={id}
          onChange={(e: any) => {
           setId(e.target.value)
          }}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Create
      </button>
    </form>
  );
}
