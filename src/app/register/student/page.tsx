import React from "react";
import RegisterStudentPage from "../../../components/auth/RegisterStudentForm";
import Navbar from "@/components/ui/NavBar";

const RegisterStudent : React.FC = () => {
  return <div>
    <Navbar />
    <RegisterStudentPage />;
  </div>
};

export default RegisterStudent;
