import { useCreateEc2Mutation } from "../../graphql/graphql";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEC2Instance() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState<number>(1);

  const [createEC2InstanceMutation, createEC2InstanceResult] = useCreateEc2Mutation();

  if (createEC2InstanceResult.data?.createEc2.success) {
    navigate("/dashboard/instance", { replace: true });
  }


  if(createEC2InstanceResult.loading){
    return (
        <div>
            Please wait...
        </div>
    )
  }

  console.log(amount);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createEC2InstanceMutation({
          variables: {
            count: amount,
          },
        });
      }}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Enter amount EC2 Instances you want to create
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          placeholder="Enter amount EC2 Instances you want to create"
          value={amount}
          onChange={(e: any) => {
            const value = parseFloat(e.target.value);
            console.log(value, "TTT");
            setAmount(isNaN(value) ? 0 : value);
            // console.log(e.target.value , "TTT")
            // setAmount(e.target.value);
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
