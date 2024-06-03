"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterRestaurantPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("test");
  const [email, setEmail] = useState<string>("test@test.com");
  const [password, setPassword] = useState<string>("123123");
  const [nit, setNit] = useState<string>("1111111111");
  const [manager, setManager] = useState<string>("Gloria");
  const [phone, setPhone] = useState<string>("123456789");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            nit,
            manager,
            phone,
          }),
        }
      );

      const responseAPI = await res.json();

      if (!res.ok) {
        setErrors([responseAPI.message || "Failed to register"]);
        return;
      }

      const responseNextAuth = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        setErrors(responseNextAuth.error.split(","));
        return;
      }

      router.push("/dashboard");
    } catch (error: any) {
      setErrors([error.message || "An unexpected error occurred"]);
    }
  };

  return (
    <div>
      <h1>Register Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="form-control mb-2"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="form-control mb-2"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="form-control mb-2"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="text"
          placeholder="NIT"
          name="nit"
          className="form-control mb-2"
          value={nit}
          onChange={(event) => setNit(event.target.value)}
        />
        <input
          type="text"
          placeholder="Manager"
          name="manager"
          className="form-control mb-2"
          value={manager}
          onChange={(event) => setManager(event.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          className="form-control mb-2"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
        >
          Register
        </button>
      </form>

      {errors.length > 0 && (
        <div className="alert alert-danger mt-2">
          <ul className="mb-0">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RegisterRestaurantPage;
