import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function PublicRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading type="fullscreen" text="Loading..." />;

  // if user is logged in → redirect to todos
  if (user) return <Navigate replace to="/todos" />;

  return children;
}
