// import React from "react";
// import { Route, Redirect, RouteProps } from "react-router-dom";
// import { useAuth } from "./AuthContext"; // Adjust the import path as necessary

// interface PrivateRouteProps extends RouteProps {
//   component: React.ComponentType<RouteProps>;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({
//   component: Component,
//   ...rest
// }) => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
//       }
//     />
//   );
// };

// export default PrivateRoute;
