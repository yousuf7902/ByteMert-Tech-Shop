import React, { useEffect, useState } from "react";
import UserSideBar from "../../components/UserSideBar/UserSideBar";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchGetAllUsers, logoutUser } from "../../Redux/slices/userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const AdminUserListPage = () => {
    const {allUsers} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate= useNavigate();

    useEffect(() => {
        dispatch(fetchGetAllUsers())
    }, [allUsers]);


    const [searchTerm, setSearchTerm] = useState("");
    const [filterData, setFilterData] = useState([]);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        const filteredUsers = allUsers.filter(
            (user) =>
                user.name.toLowerCase().includes(term.toLowerCase()) ||
                user.email.toLowerCase().includes(term.toLowerCase())
        );
        setFilterData(filteredUsers);
    };

    const deleteHandler = (user_id) => {
        dispatch(deleteUser(user_id));
    };

    const userOrderHandler = (userId) => {
        navigate(`/admin/orderslist?id=${userId}`);
    }


    return (
        <div className="bg-gray-100 grid grid-cols-5 gap-5 min-h-screen">
            <div className="col-span-1">
                <UserSideBar />
            </div>
            <div className="col-span-4 my-8 mr-5">
                <h1 className="text-3xl font-bold mb-6 text-blue-900">User Management</h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="p-2 border rounded-md w-64"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-blue-900 text-white text-center">
                                <th className="p-3">ID</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Mobile No.</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Actions</th>
                                <th className="p-3">User Orders</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchTerm === ""
                                ? allUsers?.map((user, index) => (
                                      <tr
                                          key={user.id}
                                          className="border-b hover:bg-gray-50 text-blue-900 font-semibold text-center"
                                      >
                                          <td className="p-3">{index + 1}</td>
                                          <td className="p-3">{user.name}</td>
                                          <td className="p-3">{user.email}</td>
                                          <td className="p-3">
                                              {user.phoneNumber ? (
                                                  <span>
                                                      {"0"}
                                                      {user.phoneNumber}
                                                  </span>
                                              ) : (
                                                  <span>-</span>
                                              )}
                                          </td>
                                          <td className="p-3">
                                              {user.isAdmin ? (
                                                  <span>Admin</span>
                                              ) : (
                                                  <span>User</span>
                                              )}
                                          </td>
                                          <td className="p-3">
                                              {user.isAdmin ? (
                                                  <span>-</span>
                                              ) : (
                                                  <button
                                                      className="text-red-500 hover:underline"
                                                      onClick={() => deleteHandler(user._id)}
                                                  >
                                                      Delete
                                                  </button>
                                              )}
                                          </td>
                                          <td className="p-3">
                                              {user.isAdmin ? (
                                                  <span>-</span>
                                              ) : (
                                                  <button
                                                      className="bg-blue-800 text-white font-semibold p-2 rounded-md"
                                                      onClick={() => userOrderHandler(user._id)}
                                                  >
                                                      View
                                                  </button>
                                              )}
                                          </td>
                                      </tr>
                                  ))
                                : filterData.map((user, index) => (
                                      <tr
                                          key={user.id}
                                          className="border-b hover:bg-gray-50 text-blue-900 font-semibold text-center"
                                      >
                                          <td className="p-3">{index + 1}</td>
                                          <td className="p-3">{user.name}</td>
                                          <td className="p-3">{user.email}</td>
                                          <td className="p-3">
                                              {user.phoneNumber ? (
                                                  <span>
                                                      {"0"}
                                                      {user.phoneNumber}
                                                  </span>
                                              ) : (
                                                  <span>-</span>
                                              )}
                                          </td>
                                          <td className="p-3">
                                              {user.isAdmin ? (
                                                  <span>Admin</span>
                                              ) : (
                                                  <span>User</span>
                                              )}
                                          </td>
                                          <td className="p-3">
                                              {user.isAdmin ? (
                                                  <span>-</span>
                                              ) : (
                                                  <button
                                                      className="text-red-500 hover:underline"
                                                      onClick={() => deleteHandler(user._id)}
                                                  >
                                                      Delete
                                                  </button>
                                              )}
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUserListPage;
