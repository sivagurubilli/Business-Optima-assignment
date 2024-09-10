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
import { signup } from "../store/slices/auth";
import { RotatingLines } from "react-loader-spinner";

//------------------------------------------------------------------------------------------
//---------------------------------------IMPORT END---------------------------------------

function Signup() {
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [dateofbirth, setDateofbirth] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [address, setAddress] = useState();
  const [securityQuestion, setSecurityQuestion] = useState();
  const [securityAnswer, setSecurityAnswer] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pincode, setPincode] = useState();
  const [country, setCountry] = useState();
  const [showpassword, setShowpassword] = useState(false);
  const [showConfirmpassword, setShowConfirmpassword] = useState(false);
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
      case "confirmPassword":
        setConfirmPassword(value);
        validationErrors.confirmPassword =
          value !== password ? "Required, must match the entered password" : "";
        break;
      case "dateofbirth":
        setDateofbirth(value);
        validationErrors.dateofbirth = !isValidDate(value)
          ? "Required, must be a valid date"
          : "";
        break;
      case "phonenumber":
        setPhonenumber(value);
        validationErrors.phoneNumber = !isValidPhoneNumber(value)
          ? "Required, valid phone number format with 10 digits"
          : "";
        break;
      case "address":
        setAddress(value);
        validationErrors.address = !isValidAddress(value, 100)
          ? "Required, addrees should be maximum length of 100 characters"
          : "";
        break;
      case "city":
        setCity(value);
        validationErrors.city = !isValidCityName(value)
          ? "Required, alphabetic characters only, maximum length of 50 characters"
          : "";
        break;
      case "state":
        setState(value);
        validationErrors.state = value == "" ? "please enter state" : "";
        break;
      case "pincode":
        setPincode(value);
        validationErrors.pincode = !isValidPincode(value)
          ? "Required, pincode should be 6 digit number"
          : "";
        break;
      case "country":
        setCountry(value);
        validationErrors.country = value == "" ? "please enter country" : "";
        break;
      case "securityQuestion":
        setSecurityQuestion(value);
        validationErrors.securityQuestion =
          value == "" ? "please enter security Question" : "";
        break;
      case "securityAnswer":
        setSecurityAnswer(value);
        validationErrors.securityAnswer = !isValidSecurityAnswer(value)
          ? "Required,security answer should be maximum length of 100 characters"
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

    // Validate Confirm Password
    if (!confirmPassword) {
      validationErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (!dateofbirth) {
      validationErrors.dateofbirth = "Please select your date of birth";
    } else if (!isValidDate(dateofbirth)) {
      validationErrors.confirmPassword = "Date of birth should be valid date";
    }

    if (!dateofbirth) {
      validationErrors.dateofbirth = "Please select your date of birth";
    } else if (!isValidDate(dateofbirth)) {
      validationErrors.confirmPassword = "Date of birth should be valid date";
    }
    if (!phonenumber) {
      validationErrors.phonenumber = "Please enter  phone number";
    } else if (!isValidPhoneNumber(phonenumber)) {
      validationErrors.phonenumber =
        "Required, valid phone number format with 10 digits";
    }
    if (!address) {
      validationErrors.address = "Please enter your address";
    } else if (!isValidAddress(address)) {
      validationErrors.address =
        " address should be maximum length of 100 characters";
    }
    if (!city) {
      validationErrors.city = "Please enter your address";
    } else if (!isValidCityName(city)) {
      validationErrors.city =
        " address should be maximum length of 100 characters";
    }

    if (!state) {
      validationErrors.state = "Please enter your state";
    }
    if (!country) {
      validationErrors.country = "Please enter your country";
    }
    if (!pincode) {
      validationErrors.pincode = "Please enter your pincode";
    } else if (!isValidPincode(pincode)) {
      validationErrors.pincode = " pincode should be 6 digits only";
    }
    if (!securityQuestion) {
      validationErrors.securityQuestion = "Please select securityQuestion";
    }
    if (!securityAnswer) {
      validationErrors.securityAnswer = "Please enter your securityAnswer";
    } else if (!isValidSecurityAnswer(securityAnswer)) {
      validationErrors.securityAnswer =
        "security answer should be maximum length of 100 characters";
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
        confirmPassword: confirmPassword,
        dateOfBirth: dateofbirth,
        phoneNumber: phonenumber,
        address: address,
        city: city,
        state: state,
        zipCode: pincode,
        country: country,
        securityQuestion: securityQuestion,
        securityAnswer: securityAnswer,
      };
      setLoading(true);
      dispatch(signup(item))
        .unwrap()
        .then((data) => {
          setLoading(false);
          navigate("/login");
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
            <h2 className="h3 align-left"> Sign up</h2>
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
                  <Form.Group className="">
                    <label className="mb-1">Date of Birth </label>
                    <Form.Control
                      type="date"
                      name="dateofbirth"
                      value={dateofbirth}
                      onChange={handleChange}
                      max={today}
                      isInvalid={!!errors.dateofbirth}
                      placeholder="Enter Date of birth"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-start"
                    >
                      {errors.dateofbirth}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
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
                <Col lg={6} className="p-1">
                  <Form.Group className=" position-relative">
                    <label className="mb-1">Confirm Password</label>

                    <Form.Control
                      name="confirmPassword"
                      onChange={handleChange}
                      value={confirmPassword}
                      isInvalid={!!errors.confirmPassword}
                      type={showConfirmpassword ? "text" : "password"}
                      placeholder="confirm your Password"
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: "30px",
                        top: "60%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setShowConfirmpassword(!showConfirmpassword)
                      }
                    >
                      {showConfirmpassword ? (
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
                      {errors.confirmpassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col lg={6} className="p-1">
                  <Form.Group className="">
                    <label className="mb-1">Security Question </label>
                    <Form.Control
                      as="select"
                      name="securityQuestion"
                      value={securityQuestion}
                      onChange={handleChange}
                      isInvalid={!!errors.securityQuestion}
                      placeholder="Enter security question"
                    >
                      <option value="">Select</option>
                      <option value="What is your school name?">
                        What is your school name?
                      </option>
                      <option value="What is your fovourite tourist place?">
                        What is your fovourite tourist place?
                      </option>
                      <option value="Who is your best friend">
                        Who is your best friend?
                      </option>
                      <option value="What is your pet name?">
                        What is your pet name?
                      </option>
                    </Form.Control>
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-start"
                    >
                      {errors.securityQuestion}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col lg={6} className="p-1">
                  <Form.Group className="">
                    <label className="mb-1">Security Answer </label>
                    <Form.Control
                      type="text"
                      name="securityAnswer"
                      value={securityAnswer}
                      onChange={handleChange}
                      isInvalid={!!errors.securityAnswer}
                      placeholder="Enter security Answer"
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="text-start"
                    >
                      {errors.securityAnswer}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={12} className="p-1">
                  <Form.Group className="">
                    <label className="mb-1">Address </label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={address}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                      placeholder="Enter your address"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-start"
                    >
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Row>
                  <Col lg={3} className="p-1">
                    <Form.Group className="">
                      <label className="mb-1">city </label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                        placeholder="Enter city"
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="text-start"
                      >
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={3} className="p-1">
                    <Form.Group className="">
                      <label className="mb-1">State</label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={state}
                        onChange={handleChange}
                        isInvalid={!!errors.state}
                        placeholder="Enter State"
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="text-start"
                      >
                        {errors.state}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={3} className="p-1">
                    <Form.Group className="">
                      <label className="mb-1">Country</label>
                      <Form.Control
                        type="text"
                        name="country"
                        value={country}
                        onChange={handleChange}
                        isInvalid={!!errors.country}
                        placeholder="Enter country"
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="text-start"
                      >
                        {errors.country}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={3} className="p-1">
                    <Form.Group className="">
                      <label className="mb-1">Pincode</label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        value={pincode}
                        onChange={handleChange}
                        isInvalid={!!errors.pincode}
                        placeholder="Enter pincode"
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="text-start"
                      >
                        {errors.pincode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
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

export default Signup;
