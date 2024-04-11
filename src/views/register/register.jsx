import { useNavigate } from "react-router-dom";
import AppInputWrapper from "../../components/AppInputWrapper/AppInputWrapper";
import { register } from "../../services/apiService";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    repeatPassowrd: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;
    setUserData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleLogin = async () => {
    try {
      const { email, password, firstName, lastName } = userData;
      await register({ email, password, firstName, lastName });

      navigate("/");
    } catch (err) {
      console.log(err);
      // const message = err.response.data.msg || err.response.data.message;
      // setToast({ show: true, text: message });
    }
  };
  return (
    <main className="auth-page-main">
      <div className="form">
        <div className="input-container">
          <AppInputWrapper
            // error={errors.email}
            captionText="Firstname"
            // showCaption={showEmailCaption}
          >
            <input
              type="text"
              name="firstName"
              placeholder="Firstname"
              className="email-input"
              onInput={handleChange}
              // onFocus={() => setShowEmailCaption(true)}
              // onBlur={(e) => handleUnfocus(e, setShowEmailCaption)}
            />
          </AppInputWrapper>
          {/* {errors.email && (
            <span className="input-error-span">{errors.email}</span>
          )} */}
        </div>
        <div className="input-container">
          <AppInputWrapper
            // error={errors.email}
            captionText="Lastname"
            // showCaption={showEmailCaption}
          >
            <input
              type="text"
              name="lastName"
              placeholder="Lastname"
              className="email-input"
              onInput={handleChange}
              // onFocus={() => setShowEmailCaption(true)}
              // onBlur={(e) => handleUnfocus(e, setShowEmailCaption)}
            />
          </AppInputWrapper>
          {/* {errors.email && (
            <span className="input-error-span">{errors.email}</span>
          )} */}
        </div>
        <div className="input-container">
          <AppInputWrapper
            // error={errors.email}
            captionText="Email"
            // showCaption={showEmailCaption}
          >
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="email-input"
              onInput={handleChange}
              // onFocus={() => setShowEmailCaption(true)}
              // onBlur={(e) => handleUnfocus(e, setShowEmailCaption)}
            />
          </AppInputWrapper>
          {/* {errors.email && (
            <span className="input-error-span">{errors.email}</span>
          )} */}
        </div>
        <div className="input-container">
          <AppInputWrapper
            // error={errors.email}
            captionText="password"
            // showCaption={showEmailCaption}
          >
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="password-input"
              onInput={handleChange}
              // onFocus={() => setShowEmailCaption(true)}
              // onBlur={(e) => handleUnfocus(e, setShowEmailCaption)}
            />
          </AppInputWrapper>
          {/* {errors.email && (
            <span className="input-error-span">{errors.email}</span>
          )} */}
        </div>
        <div className="input-container">
          <AppInputWrapper
            // error={errors.email}
            captionText="password"
            // showCaption={showEmailCaption}
          >
            <input
              type="password"
              name="repeatPassword"
              placeholder="Password"
              className="password-input"
              // onInput={handleChange}
              // onFocus={() => setShowEmailCaption(true)}
              // onBlur={(e) => handleUnfocus(e, setShowEmailCaption)}
            />
          </AppInputWrapper>
          {/* {errors.email && (
            <span className="input-error-span">{errors.email}</span>
          )} */}
        </div>
        <button
          // className={getButtonClassName(enableButton)}
          // onClick={enableButton ? handleLogin : () => {}}
          className="form-button activated-button"
          onClick={handleLogin}
        >
          Register
        </button>
      </div>
    </main>
  );
};

export default Register;
