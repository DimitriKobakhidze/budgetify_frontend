import { Link, NavLink, useNavigate } from "react-router-dom";

import "./pageHeader.css";
import { useStore } from "../../store/store";
import { logoutUser } from "../../services/apiService";

const navLinks = [
  {
    path: "/categories",
    text: "Categories",
  },
  {
    path: "/subscriptions",
    text: "Subscriptions",
  },
  {
    path: "/obligatories",
    text: "Obligatory",
  },
  {
    path: "/statistic",
    text: "Statistic",
  },
  {
    path: "/admin",
    text: "Admin",
  },
];

const PageHeader = () => {
  const navigate = useNavigate();

  const userFullName = useStore((state) => state.userData.fullName);

  const logout = async () => {
    try {
      await logoutUser();
      useStore.getState().clearUserData();
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <div className="page-header">
      <Link to="/" className="header-title-link">
        Budgetify
      </Link>
      <div className="header-functionalities-wrapper">
        <nav className="header-nav">
          <ul className="header-nav-list">
            {navLinks.map((linkData) => (
              <li key={linkData.path} className="header-nav-list-item">
                <NavLink
                  to={linkData.path}
                  className={({ isActive }) =>
                    isActive
                      ? "header-nav-list-item-link active"
                      : "header-nav-list-item-link"
                  }
                >
                  {linkData.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-user-ctn">
          <img onClick={logout} src="/user-icon.png" alt="user" />
          <span className="nav-user-name">{userFullName}</span>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
