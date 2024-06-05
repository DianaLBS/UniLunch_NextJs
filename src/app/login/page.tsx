"use client";
import React from "react";
import LoginForm from "../../components/forms/LoginForm";
import {useAuth} from "../../context/SessionAuthProvider";
import {useRouter} from "next/navigation";
import Navbar from "../../components/NavBar";

const LoginPage: React.FC = () => {

  return (

    <div>
      <Navbar />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
