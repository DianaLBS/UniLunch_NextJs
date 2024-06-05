import React from "react";
import RegisterRestaurantPage from "../../../components/auth/RegisterRestaurantForm";
import Navbar from "@/components/ui/NavBar";

const RegisterRestaurant : React.FC = () => {
  return <div>
    <Navbar />
    <RegisterRestaurantPage />;
  </div>
};

export default RegisterRestaurant;
