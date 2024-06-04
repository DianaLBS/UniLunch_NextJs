"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="btn btn-primary btn-sm">
          Home
        </Link>
        {session?.user ? (
          <>
            <Link href="/dashboard" className="btn btn-primary btn-sm">
              Dashboard
            </Link>
            {session.user.role === "restaurant" && (
              <Link href="/products/add" className="btn btn-primary btn-sm">
                Add Product
              </Link>
            )}
            <button onClick={() => signOut()} className="btn btn-danger btn-sm">
              Signout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
            <Link href="/register/restaurant" className="btn btn-primary btn-sm">
              Register as Restaurant
            </Link>
            <Link href="/register/student" className="btn btn-primary btn-sm">
              Register as Student
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
