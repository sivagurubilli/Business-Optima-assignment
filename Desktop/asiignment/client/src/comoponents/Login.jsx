//------------------------------------------------------------------------------------------
//---------------------------------------IMPORT START---------------------------------------
import React, { useState } from "react";
import { Col, Container, Row, Image, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import navlogo from "../Assets/Images/nav-logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";
import { login } from "../store/slices/auth";
import {
  isValidAddress,
  isValidCityName,
  isValidDate,
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPhoneNumber,
  isValidPincode,
  isValidSecurityAnswer,
} from "../utils/Validation";

//------------------------------------------------------------------------------------------
//---------------------------------------IMPORT END---------------------------------------

function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const validationErrors = { ...errors };
    const { name, value, checked } = e.target;

    switch (name) {
      case "email":
        setemail(value);
        validationErrors.email =value==""
          ? "Required, enter valid email format"
          : "";
        break;
      case "password":
        setPassword(value);
        validationErrors.password = value==""
          ? "Required, minimum length of 8 characters, at least one uppercase letter, and one digit"
          : "";
        break;

      default:
        break;
    }
    setErrors(validationErrors);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate("");

  async function signIn(e) {
    e.preventDefault();
    const validationErrors = {};
    if (!email.trim()) {
      validationErrors.email = "Please enter your email";
    } else if (!isValidEmail(email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    // Validate Password
    if (!password.trim()) {
      validationErrors.password = "Please enter your password";
    } else if (!isValidPassword(password)) {
      validationErrors.password =
        "Password should be at least 8 characters long and contain at least one uppercase letter and one digit";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      const item = {
        emailAddress: email,
        password: password,
      };
      setLoading(true);
      dispatch(login(item))
        .unwrap()
        .then((data) => {
          setLoading(false);
console.log(data)
          navigate("/profile");
        })
        .catch(({ message }) => {
          setLoading(false);
          alert(message);
        });
    }
  }

  return (
    <>
      <Container className="p-5">
        {loading && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RotatingLines
              visible={true}
              height="160"
              width="160"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="4"
              wrapperStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.175)",
                padding: "200px",
              }}
            />
          </div>
        )}
        <Row
          className="mt-3"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col lg={6} className="d-none d-lg-block Loginbanner">
            <img src={navlogo} style={{ padding: "20px" }} />
          </Col>
          <Col
            className="mt-5 d-flex justify-content-left align-items-left flex-column"
            lg={5}
            xs={11}
            md={5}
            xl={5}
            style={{
              backgroundColor: "white",
              height: "70vh",
              marginLeft: "50px",
              padding: "50px",
            }}
          >
            <h9 className="align-left "> Welcome</h9>
            <h2 className="h3 align-left"> Login</h2>
            <Form
              noValidate
              autoComplete="off"
              onSubmit={signIn}
              className="text-left mt-3"
              style={{
                height: "100%",
                width: "80%",
              }}
            >
              <Form.Group className="mb-4">
                <label className="mb-2">Email </label>

                <Form.Control
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  placeholder="Enter registered email"
                />
                <Form.Control.Feedback type="invalid" className="text-start">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4 position-relative">
                <label className="mb-2">Password</label>

                <Form.Control
                  name="password"
                  onChange={handleChange}
                  value={FormData.password}
                  isInvalid={!!errors.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                />
                <span
                  style={{
                    position: "absolute",
                    right: "30px",
                    top: "45%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEye
                      style={{ fontSize: "18px", cursor: "pointer" }}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      style={{ fontSize: "18px", cursor: "pointer" }}
                    />
                  )}
                </span>

                <Form.Control.Feedback type="invalid" className="text-start">
                  {errors.password}
                </Form.Control.Feedback>
                <p className="text-end forgot_password mt-3">
                  Forgot password?
                </p>
              </Form.Group>
              <Button className="mb-2 mt-2 login_btn" type="submit">
                Login
              </Button>
              <p className="text-muted mt-2">
                Don't have an account?{" "}
                <NavLink to="/register">
                  <span className="forgot_password ml-2">Signup</span>
                </NavLink>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
