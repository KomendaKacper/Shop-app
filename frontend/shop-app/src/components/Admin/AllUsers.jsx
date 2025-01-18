import { useEffect, useState } from "react";
import { CgAddR } from "react-icons/cg";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8100/api/admin/get-users",
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
        console.log(data);
        setUsers(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl m-8 text-center text-black">Users list</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul className="flex flex-wrap justify-center">
          {users.map((user) => (
            <li key={user.userId} className="flex flex-col ">
              <div className="bg-[rgb(148,131,77)] w-[300px] h-[300px] m-8 flex justify-center items-center relative shadow-lg rounded-2xl hover:bg-[rgb(122,108,63)]">
                <div className="flex flex-col">
                  <p className="block">{user.userName}</p>
                  <p>{user.email}</p>
                  <p>{new Date(user.createdDate).toLocaleString()}</p>
                  <p>{user.accountExpiryDate}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
