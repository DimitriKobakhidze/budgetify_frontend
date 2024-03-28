import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { privateRoutes, publicRoutes } from "./routes";
import { useStore } from "./store/store";
import useCheckToken from "./hooks/useCheckToken";
import FullScreenSpinner from "./components/UI/Spinner/FullSreenSpinner";

const App = () => {
  const userData = useStore((state) => state.userData);

  const { isLoading } = useCheckToken();

  if (isLoading) return <FullScreenSpinner />;

  return (
    <Router>
      <Routes>
        {!userData &&
          publicRoutes.map((routeObject) => (
            <Route
              key={routeObject.path}
              path={routeObject.path}
              element={routeObject.elemement}
            />
          ))}
        {userData &&
          privateRoutes.map((routeObject) => (
            <Route
              key={routeObject.path}
              path={routeObject.path}
              element={routeObject.elemement}
            />
          ))}
      </Routes>
    </Router>
  );
};

export default App;
