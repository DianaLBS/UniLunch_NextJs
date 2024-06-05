"use client";
import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import Navbar from "@/components/ui/NavBar";

const LoginPage: React.FC = () => {

  return (

    <div>
      <Navbar />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
