import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import BackArrow from "../UI/BackArrow";
import { MdDelete } from "react-icons/md";
import { VscPerson } from "react-icons/vsc";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8765/auth-service/api/admin/get-users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new error(`Failed to fetch users ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8765/auth-service/api/admin/delete-user/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new error(`Failed to delete user ${response.status}`);
      }

      setUsers(users.filter((user) => user.userId !== userId));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <Navbar />
      <BackArrow />
      <div>
        <h1 className="text-3xl m-6 text-center text-black">Users list</h1>
        {error ? (
          <p className="text-red-500 text-center text-3xl">
            Error: {error.message}
          </p>
        ) : (
          <ul className="flex flex-wrap justify-center">
            {users.map((user) => (
              <li key={user.userId} className="flex flex-col">
                <div className="bg-[rgb(148,131,77)] w-[300px] h-[300px] m-4 flex justify-center items-center relative shadow-lg rounded-2xl ">
                  <div className="flex flex-col">
                    <VscPerson className="w-12 h-12 m-2" />

                    <p className="block">
                      <b>Username:</b> {user.username}
                    </p>
                    <p>
                      <b>Email:</b> {user.email}
                    </p>
                    <p>
                      <b>Created on:</b>{" "}
                      {new Date(user.createdDate).toLocaleString()}
                    </p>
                    <p>
                      <b>Expiry date:</b> {user.accountExpiryDate}
                    </p>

                    <p>
                      <b>Role: </b>
                      <select className="mt-1 text-white rounded-lg bg-[rgb(148,131,77)] hover:bg-[rgb(148,131,77)]">
                        <option value="option1 text-black text-sm">USER</option>
                        <option value="option2">ADMIN</option>
                      </select>
                    </p>

                    <div className="flex justify-center items-center mt-2">
                      <p>
                        <i>To delete user click:</i>{" "}
                      </p>
                      <button onClick={() => deleteUser(user.userId)}>
                        <MdDelete className="w-6 h-6 mt-1 hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
