"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Navbar from "@/components/ui/NavBar";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Evaluando si ya estás usando nuestro sistema ;)...</p>;
  }
  console.log(session?.user?.token);

/*const getRestaurants = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const data = await res.json();
    console.log(data);
  };*/

  return (
    <div>
      <h1>Dashboard</h1>

      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>
  );
};
export default Dashboard;
