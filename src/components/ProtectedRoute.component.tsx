import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

interface Props extends PropsWithChildren {
  isAllowed: boolean;
  redirectPath?: string;
}

const ProtectedRoute: FC<Props> = ({ isAllowed, redirectPath = "auth", children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
