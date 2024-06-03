"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterStudentPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [program, setprogram] = useState<string>("");
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
            lastname,
            email,
            password,
            dni,
            code,
            program,
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
      <h1>Register Student</h1>
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
          type="text"
          placeholder="Last Name"
          name="lastName"
          className="form-control mb-2"
          value={lastname}
          onChange={(event) => setLastName(event.target.value)}
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
          placeholder="DNI"
          name="dni"
          className="form-control mb-2"
          value={dni}
          onChange={(event) => setDni(event.target.value)}
        />
        <input
          type="text"
          placeholder="Code"
          name="code"
          className="form-control mb-2"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
        <input
          type="text"
          placeholder="Program"
          name="program"
          className="form-control mb-2"
          value={program}
          onChange={(event) => setprogram(event.target.value)}
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

export default RegisterStudentPage;
