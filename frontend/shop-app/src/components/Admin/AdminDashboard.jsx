import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import { IoPerson } from "react-icons/io5";
import { CgAddR } from "react-icons/cg";

import "../../index.css";

export default function AdminDashboard() {
  const authCtx = useContext(AuthContext);

  const isAdmin = authCtx.roles && authCtx.roles.includes("ROLE_ADMIN");

  return (
    <div className="overflow-hidden">
      <h1 className="text-3xl m-8 text-center text-black">Admin's Dashboard</h1>
      {isAdmin ? (
        <>
          <p className="text-center text-black">
            Cześć Admin, witaj w panelu zarządzania!
          </p>
          <div className="m-8 flex-row flex justify-center text-center ">
            <div className="bg-[rgb(188,58,58)] w-[400px] h-[300px] m-8 flex justify-center items-center relative shadow-lg rounded-2xl hover:bg-[rgb(153,58,58)]">
              <button className="text-white text-center text-xl w-full h-full">View users</button>
              <IoPerson className="absolute bottom-2 right-2 text-white text-8xl" />
            </div>
            <div className="bg-[rgb(54,119,167)] w-[400px] h-[300px] m-8 flex justify-center items-center relative shadow-lg rounded-2xl hover:bg-[rgb(57,103,135)]">
              <button className="text-white text-center text-xl w-full h-full">Add product</button>
              <CgAddR className="absolute bottom-2 right-2 text-white text-6xl" />
            </div>
          </div>
        </>
      ) : (
        <p>Nie masz uprawnień do przeglądania tej strony.</p>
      )}
    </div>
  );
}
