
  import React, { useContext, useEffect } from "react";
  import { PopupContext } from "../../../components/popup/popup";
  import { useLazyQuery, useQuery } from "@apollo/client";
import { useDeleteGameInstanceMutation, useGetAllGameInstancesQuery } from "../../../graphql/graphql";
  




  export default function GameInstance() {
    const { yesNo } = useContext(PopupContext);
  
    const { data, loading, error, refetch } = useGetAllGameInstancesQuery();
  
    const a = data?.getAllGameInstances?.data;

    console.log(a,"AAAAAA")


  
  
    // const [deleteEC2Mutation, deleteEC2MutationResult] =
    //   useDeleteInstanceMutation();
  
    const [deleteInstance, { loading: deleteLoading, error: deleteError }] =
    useDeleteGameInstanceMutation();
  
    useEffect(() => {
      if (!deleteLoading && !deleteError) {
        refetch();
      }
    }, [deleteLoading, deleteError, refetch]);
  
    if (deleteLoading) {
      return <div>Processing...</div>;
    }
  
    // if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div>
        <a href="/dashboard/game-instance/create-game-instance">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create game instance
          </button>
        </a>
  
        <div className="overflow-x-auto pt-1.25 ">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-200 text-left">
                  Game Instance ID
                </th>
                <th className="px-4 py-2 border-b border-gray-200 text-left">
                  Game Instance State
                </th>
                <th className="px-4 py-2 border-b border-gray-200 text-left">
                  Game Intance Timestamp
                </th>
               
              </tr>
            </thead>
            <tbody>
              {a?.map((instance, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b border-gray-200  text-blue-600">
                    {instance.id}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200  text-blue-600">
                    {instance.state}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200  text-blue-600">
                    {instance.updated}
                  </td>
                  {/* <td className="px-4 py-2 border-b border-gray-200 text-blue-600">
                    {instance.instanceId}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200   text-blue-600 ">
                    {instance.groups}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200  text-blue-600">
                    {instance.keyPair}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200  text-blue-600">
                    {instance.vpc}
                  </td> */}
                  <td className="px-4 py-2 border-b border-gray-200">
                    {/* <div className="pt-1.25"> */}
                    <button
                      type="button"
                      className=" inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong bg-red-600"
                      data-twe-ripple-init
                      data-twe-ripple-color="light"
                      onClick={async () => {
  
                        yesNo({
                          text: "Are you sure you want to delete this EC2 instance?",
                          title: "DELETE",
                          yes: async () => {
                            await deleteInstance({
                              variables: {
                               gameInstanceId : instance.id
                              },
                            });
                          },
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  