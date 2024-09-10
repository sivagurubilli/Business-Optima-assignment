//------------------------------------------------------------------------------------------
//---------------------------------------IMPORT START---------------------------------------
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Form, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import navlogo from "../Assets/Images/nav-logo.png";
import avatar from "../Assets/Images/Avatar.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getProfile, login } from "../store/slices/auth";
import NavMenu from "../navbar/NavMenu";
import { RotatingLines } from "react-loader-spinner";

//------------------------------------------------------------------------------------------
//---------------------------------------IMPORT END---------------------------------------

function Profile() {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetProfile();
  }, []);

  const GetProfile = () => {
    setLoading(true);

    dispatch(getProfile())
      .unwrap()
      .then((data) => {
        setLoading(false);

        setData(data.user.data);
      })
      .catch(({ message }) => {
        setLoading(false);

        alert(message);
      });
  };

  return (
    <>
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
      <NavMenu />
      <Container className="mt-1 pb-5">
        <Row
          className="mt-2"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col lg={5} className="d-none d-lg-block Profilebanner">
            <img
              src={avatar}
              style={{
                padding: "10px",
                marginLeft: "70%",
                height: "150px",
                width: "150px",
              }}
            />
          </Col>
          <Col
            className="mt-5 d-flex justify-content-left align-items-left flex-column"
            lg={5}
            xs={11}
            md={5}
            xl={5}
            style={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              backgroundColor: "white",
              height: "auto",
              marginLeft: "20px",
              padding: "20px",
            }}
          >
            <Row className="p-2  justify-content-left align-items-left ">
              <h2>Profile</h2>

              <Row className="p-2">
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>Name</p>
                </Col>
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>{data?.fullName}</p>
                </Col>
              </Row>
              <Row className="p-2">
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>Email</p>
                </Col>
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>{data?.emailAddress}</p>
                </Col>
              </Row>
              <Row className="p-2">
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>DOB</p>
                </Col>
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>{data?.dateOfBirth?.split("T")[0]}</p>
                </Col>
              </Row>
              <Row className="p-2">
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>Phone number</p>
                </Col>
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>{data?.phoneNumber}</p>
                </Col>
              </Row>
              <Row className="p-2">
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>Address</p>
                </Col>
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>{data?.address}</p>
                </Col>
              </Row>
              <Row className="p-2">
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>City</p>
                </Col>
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>{data?.city}</p>
                </Col>
              </Row>
              <Row className="p-2">
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>State</p>
                </Col>
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>{data?.state}</p>
                </Col>
              </Row>
              <Row className="p-2">
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>Zip code</p>
                </Col>
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>{data?.zipCode}</p>
                </Col>
              </Row>
              <Row className="p-2">
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>Country</p>
                </Col>
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>{data?.country}</p>
                </Col>
              </Row>
              <Row className="p-2">
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>Security</p>
                </Col>
                <Col lg={6} xs={6} md={6} xl={6}>
                  <p>{data?.securityQuestion}</p>
                  <p>{data?.securityAnswer}</p>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
