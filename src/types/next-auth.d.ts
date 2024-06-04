// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      role: string; // Agrega el campo role
      token: string;
    };
  }

  interface User {
    role: string; // Agrega el campo role
    token: string;
  }
}
