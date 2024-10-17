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
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPhoneNumber,

} from "../utils/Validation";
import { EditProfile, signup } from "../store/slices/auth";
import { RotatingLines } from "react-loader-spinner";

//------------------------------------------------------------------------------------------
//---------------------------------------IMPORT END---------------------------------------

function EditProfiles() {
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState();
  const [phonenumber, setPhonenumber] = useState();

  const [showpassword, setShowpassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validationErrors = {};

    switch (name) {
      case "fullName":
        setfullName(value);
        validationErrors.fullName = !isValidName(value)
          ? "Required, alphabetic characters only, maximum length of 50 characters"
          : "";
        break;
      case "email":
        setemail(value);
        validationErrors.email = !isValidEmail(value)
          ? "Required,enter valid email format"
          : "";
        break;
      case "password":
        setPassword(value);
        validationErrors.password = !isValidPassword(value)
          ? "Required, minimum length of 8 characters, at least one uppercase letter, and one digit"
          : "";
        break;
     
      case "phonenumber":
        setPhonenumber(value);
        validationErrors.phoneNumber = !isValidPhoneNumber(value)
          ? "Required, valid phone number format with 10 digits"
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
    if (!fullName) {
      validationErrors.fullName = "Please enter your  fullName";
    } else if (!isValidName(fullName)) {
      validationErrors.fullName =
        "fullname should be alphabetic characters only, maximum length of 50 characters";
    }

    if (!email) {
      validationErrors.email = "Please enter your email";
    } else if (!isValidEmail(email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    // Validate Password
    if (!password) {
      validationErrors.password = "Please enter your password";
    } else if (!isValidPassword(password)) {
      validationErrors.password =
        "Password should be at least 8 characters long and contain at least one uppercase letter and one digit";
    }
   

 
    if (!phonenumber) {
      validationErrors.phonenumber = "Please enter  phone number";
    } else if (!isValidPhoneNumber(phonenumber)) {
      validationErrors.phonenumber =
        "Required, valid phone number format with 10 digits";
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
        fullName: fullName,
        emailAddress: email,
        password: password,
  
        phoneNumber: phonenumber,
       
      };
      setLoading(true);
      dispatch(EditProfile(item))
        .unwrap()
        .then((data) => {
          setLoading(false);
          navigate("/");
        })
        .catch(({ message }) => {
          setLoading(false);
          alert(message);
        });
    }
  }

  const today = new Date().toISOString().split("T")[0];

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
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <Col lg={4} className="d-none d-lg-block Registerbanner">
            <img src={navlogo} style={{ padding: "20px" }} />
          </Col>
          <Col
            className=" d-flex justify-content-left align-items-left flex-column"
            lg={7}
            xs={11}
            md={7}
            xl={7}
            style={{
              backgroundColor: "white",
              height: "auto",
              marginLeft: "30px",
              paddingLeft: "20px",
            }}
          >
            <h9 className="align-left "> Welcome</h9>
            <h2 className="h3 align-left"> Edit Profile</h2>
            <Form
              noValidate
              autoComplete="off"
              onSubmit={signIn}
              className="text-left mt-3"
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <Row>
                <Col lg={6} className="p-1">
                  <Form.Group>
                    <label className="mb-1">Full name </label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={fullName}
                      onChange={handleChange}
                      isInvalid={!!errors.fullName}
                      placeholder="Enter  fullName"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-start"
                    >
                      {errors.fullName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6} className="p-1">
                  <Form.Group>
                    <label className="mb-1">Email</label>

                    <Form.Control
                      name="email"
                      onChange={handleChange}
                      value={email}
                      isInvalid={!!errors.email}
                      type={"text"}
                      placeholder="Enter email"
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="text-start"
                    >
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                
                <Col lg={6} className="p-1">
                  <Form.Group className=" position-relative">
                    <label className="mb-1">Password</label>

                    <Form.Control
                      name="password"
                      onChange={handleChange}
                      value={password}
                      isInvalid={!!errors.password}
                      type={showpassword ? "text" : "password"}
                      placeholder="Enter password"
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: "30px",
                        top: "60%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowpassword(!showpassword)}
                    >
                      {showpassword ? (
                        <AiOutlineEye
                          style={{ fontSize: "18px", cursor: "pointer" }}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          style={{ fontSize: "18px", cursor: "pointer" }}
                        />
                      )}
                    </span>

                    <Form.Control.Feedback
                      type="invalid"
                      className="text-start"
                    >
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6} className="p-1">
                  <Form.Group className="">
                    <label className="mb-1">Phone Number </label>
                    <Form.Control
                      type="text"
                      name="phonenumber"
                      value={phonenumber}
                      onChange={handleChange}
                      isInvalid={!!errors.phonenumber}
                      placeholder="Enter Phone Number"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-start"
                    >
                      {errors.phonenumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
            
              </Row>
            </Form>
            <Button className="mb-1 mt-3 login_btn" onClick={signIn}>
              Sign up
            </Button>
            <p className="text-muted mt-2">
              Already have an account?{" "}
              <NavLink to="/login">
                <span className="forgot_email ml-2">Login</span>
              </NavLink>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EditProfiles;
