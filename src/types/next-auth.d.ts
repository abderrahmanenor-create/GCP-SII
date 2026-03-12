import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string
      nom: string
      prenom: string
      role: string
      societeId?: string | null
    }
  }

  interface User {
    id: string
    nom: string
    prenom: string
    role: string
    societeId?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    nom: string
    prenom: string
    role: string
    societeId?: string | null
  }
}