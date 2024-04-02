import { Navigate } from "react-router-dom";
import WithHeader from "./components/HOC/WithHeader";
import Transaction from "./views/Transaction/Transaction";
import Subscription from "./views/Subscription/Subscription";
import Obligatory from "./views/Obligatory/Obligatory";
import LoginPage from "./views/Login/LoginPage";
import Category from "./views/Category/Category";
import Statistic from "./views/Statistic/Statistic";
import Error from "./views/Error/Error";

export const publicRoutes = [
  {
    path: "/register",
    elemement: <h1>Registe page</h1>,
  },
  {
    path: "/",
    elemement: <Navigate to="/login" />,
  },
  {
    path: "/login",
    elemement: <LoginPage />,
  },
  {
    path: "*",
    elemement: <Navigate to="/login" />,
  },
];

export const privateRoutes = [
  {
    path: "/",
    elemement: <Navigate to="/transactions" />,
  },
  {
    path: "/transactions",
    elemement: (
      <WithHeader>
        <Transaction />
      </WithHeader>
    ),
  },
  {
    path: "/obligatories",
    elemement: (
      <WithHeader>
        <Obligatory />
      </WithHeader>
    ),
  },
  {
    path: "/subscriptions",
    elemement: (
      <WithHeader>
        <Subscription />
      </WithHeader>
    ),
  },
  {
    path: "/categories",
    elemement: (
      <WithHeader>
        <Category />
      </WithHeader>
    ),
  },
  {
    path: "/statistic",
    elemement: (
      <WithHeader>
        <Statistic />
      </WithHeader>
    ),
  },
  {
    path: "/error",
    elemement: (
      <WithHeader>
        <Error />
      </WithHeader>
    ),
  },
  {
    path: "*",
    elemement: (
      <WithHeader>
        <Transaction />
      </WithHeader>
    ),
  },
];
