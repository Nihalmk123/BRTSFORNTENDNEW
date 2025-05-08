import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useAxiosWithInterceptor } from "../.././Components/Api/Axios";
import { useAuth } from "../Context/Context";

const EmailVerification = () => {
  const { id, token } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
 
  const api = useAxiosWithInterceptor()

  const confirmEmailVerification = async (id, token) => {
    try {
      const response = await api.put(
        `/tsn/v1/email/confirm/${id}/${token}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.accessToken
          },
        }
      );

      if (response?.data?.success) { // Assuming `success` indicates API success
        emailConfirmPopUp();
      } else {
        emailConfirmErrorPopUp();
      }
    } catch (error) {
      console.error("Error in email verification:", error);
      emailConfirmErrorPopUp();
    }
  };

  const emailConfirmPopUp = () => {
    Swal.fire({
      title: "Email Verified Successfully!",
      text: "Redirecting to Home...",
      icon: "success",
      timer: 3000,
      showConfirmButton: true,
    }).then(() => {
      navigate("/"); // Redirect to homepage
    });
  };

  const emailConfirmErrorPopUp = () => {
    Swal.fire({
      title: "Error in Verifying Email!",
      text: "Please try again after some time.",
      icon: "error",
      showConfirmButton: true,
      
    });
  };

  useEffect(() => {
    if (id && token) {
      console.log(id, token)
      confirmEmailVerification(id, token);
    }
  }, [id, token]);

  return null; // No need for additional UI here
};

export default EmailVerification;
