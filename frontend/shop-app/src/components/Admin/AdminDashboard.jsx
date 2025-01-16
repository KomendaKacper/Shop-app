import { useContext } from "react";
import AuthContext from "../../store/AuthContext";

export default function AdminDashboard() {
  const authCtx = useContext(AuthContext);

  // Sprawdzanie, czy użytkownik ma rolę admina
  const isAdmin = authCtx.roles && authCtx.roles.includes("ROLE_ADMIN");

  return (
    <div>
      <h1>Dashboard</h1>
      {isAdmin ? (
        <p>Cześć Admin, witaj w panelu zarządzania!</p>
      ) : (
        <p>Nie masz uprawnień do przeglądania tej strony.</p>
      )}
    </div>
  );
}
