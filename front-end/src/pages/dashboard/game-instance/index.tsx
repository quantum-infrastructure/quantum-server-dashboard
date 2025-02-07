import React, { useContext, useEffect, useState } from "react";
import { PopupContext } from "../../../components/popup/popup";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  useDeleteGameInstanceMutation,
  useGetAllGameInstancesQuery,
} from "../../../graphql/graphql";
import withAuth from "../../../context/with-auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../../components/pagination/pagination";

const PAGE_SIZE = 5;

function GameInstance() {
  const { yesNo } = useContext(PopupContext);
  const [page, setPage] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const skip = parseInt(params.get("skip") || "0", 10);
    const take = parseInt(params.get("take") || `${PAGE_SIZE}`, 10);
    setPage(skip / take);
  }, [location]);

  const { data, loading, error, refetch } = useGetAllGameInstancesQuery({
    variables: {
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
    },
    fetchPolicy: "cache-and-network",
  });

  const instances = data?.getAllGameInstances?.data;

  console.log(instances, "AAAAAA");

  // const [deleteEC2Mutation, deleteEC2MutationResult] =
  //   useDeleteInstanceMutation();

  const [deleteInstance, { loading: deleteLoading, error: deleteError }] =
    useDeleteGameInstanceMutation();

  const handlePrevious = () => {
    if (page > 0) {
      const newPage = page - 1;
      setPage(newPage);
      updateUrl(newPage);
    }
  };

  const handleNext = () => {
    if ((page + 1) * PAGE_SIZE < totalCount) {
      const newPage = page + 1;
      setPage(newPage);
      updateUrl(newPage);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
    updateUrl(pageNumber);
  };

  const updateUrl = (pageNumber: number) => {
    navigate({
      pathname: location.pathname,
      search: `?skip=${pageNumber * PAGE_SIZE}&take=${PAGE_SIZE}`,
    });
  };

  const totalCount = data?.getAllGameInstances?.totalCount || 0;
  useEffect(() => {
    console.log("Fetched data:", instances);
    console.log("Total count:", totalCount);
  }, [instances, totalCount]);

  useEffect(() => {
    console.log("skip:", page * PAGE_SIZE, "take:", PAGE_SIZE);
  }, [page]);

  useEffect(() => {
    if (!deleteLoading && !deleteError) {
      refetch();
    }
  }, [deleteLoading, deleteError, refetch]);

  if (deleteLoading) {
    return <div>Processing...</div>;
  }

  console.log(page, totalCount, "SSS");

  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="h-full min-h-screen p-5">
      <Link to="/dashboard/game-instance/create-game-instance">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Game Instance
        </button>
      </Link>

      <div className="relative overflow-x-auto sm:rounded-lg border border-gray-200 bg-gray-100 mt-5">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-600 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Game Instance ID
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
              <th scope="col" className="px-6 py-3">
                Timestamp
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {instances?.map((instance, index) => (
              <tr key={index} className="border-b border-gray-300">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {instance.id}
                </th>
                <td className="px-6 py-4">{instance.state}</td>
                <td className="px-6 py-4">{instance.updated}</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded"
                    onClick={async () => {
                      yesNo({
                        text: "Are you sure you want to delete this game instance?",
                        title: "DELETE",
                        yes: async () => {
                          await deleteInstance({
                            variables: {
                              gameInstanceId: instance.id,
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

      <div className="mt-5">
        <Pagination
          page={page}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onPageClick={handlePageClick}
        />
      </div>
    </div>
  );
}
export default withAuth(GameInstance);
