import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((store) => store.user);

  // useEffect(() => {
  //   if(user){
  //     connectSocketForWwebjs(user.user.id);
  //   }
  // }, []);

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}
