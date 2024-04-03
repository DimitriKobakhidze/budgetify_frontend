import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./loginPage.css";
import { emailRegExp } from "../../utils/utils";
import { login } from "../../services/apiService";
import Toast from "../../components/UI/Toast/Toast";
import AppInputWrapper from "../../components/AppInputWrapper/AppInputWrapper";
import { useStore } from "../../store/store";

const Login = () => {
  const navigate = useNavigate();
  const updateUserData = useStore((state) => state.updateUserData);
  const [toast, setToast] = useState({ show: false, text: "" });
  const [showEmailCaption, setShowEmailCaption] = useState(false);
  const [showPasswordCaption, setShowPasswordCaption] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;
    setUserCredentials((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleUnfocus = (e, showCaption) => {
    const { name: fieldName, value } = e.target;

    if (value === "") {
      showCaption(false);
      return setErrors((prev) => ({
        ...prev,
        [fieldName]: "Required field is empty",
      }));
    }

    if (fieldName === "email" && value !== "") {
      if (!value.match(emailRegExp))
        return setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
    }
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const getButtonClassName = (isEnabled) => {
    return isEnabled ? "form-button activated-button" : "form-button";
  };

  const handleLogin = async () => {
    try {
      const response = await login(userCredentials);
      const { userData } = response;

      updateUserData(userData);
      navigate("/");
    } catch (err) {
      const message = err.response.data.msg || err.response.data.message;
      setToast({ show: true, text: message });
    }
  };

  useEffect(() => {
    const haveUserCredentials =
      userCredentials.email && userCredentials.password;
    const noErrors = !errors.email && !errors.password;
    if (haveUserCredentials && noErrors) setEnableButton(true);
  }, [
    userCredentials.email,
    userCredentials.password,
    errors.email,
    errors.password,
  ]);

  return (
    <main className="auth-page-main">
      <div className="form">
        <h3 className="form-heading">Budgetify</h3>
        {toast.show && (
          <Toast
            tooltipText={toast.text}
            closeToast={() => setToast({ show: false, text: "" })}
          />
        )}
        <div className="input-container">
          <AppInputWrapper
            error={errors.email}
            captionText="Email"
            showCaption={showEmailCaption}
          >
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="email-input"
              onInput={handleChange}
              onFocus={() => setShowEmailCaption(true)}
              onBlur={(e) => handleUnfocus(e, setShowEmailCaption)}
            />
          </AppInputWrapper>
          {errors.email && (
            <span className="input-error-span">{errors.email}</span>
          )}
        </div>
        <div className="input-container">
          <AppInputWrapper
            error={errors.password}
            captionText="Password"
            showCaption={showPasswordCaption}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="password-input"
              onInput={handleChange}
              onFocus={() => setShowPasswordCaption(true)}
              onBlur={(e) => handleUnfocus(e, setShowPasswordCaption)}
            />
            <img
              onMouseEnter={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}
              src="/Eye-Icon-wsj93-300x300.svg"
              className="password-icon"
              alt="password"
            />
          </AppInputWrapper>
          {errors.password && (
            <span className="input-error-span">{errors.password}</span>
          )}
        </div>
        <button
          className={getButtonClassName(enableButton)}
          onClick={enableButton ? handleLogin : () => {}}
        >
          Login
        </button>
        <div className="login-options-ctn">
          <span className="login-no-account-span">
            Don't have account?{" "}
            <Link className="login-register-link" to="/register">
              Register
            </Link>
          </span>
          <span>Or you can use test user:</span>
          <span className="login-default-user-span">user@example.com </span>
          <span className="login-default-user-span">password </span>
        </div>
      </div>
    </main>
  );
};

export default Login;
