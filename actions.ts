"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SELLER_ID } from "@/lib/data"


const MOCK_EMAIL = "seller@lumenbooks.com"
const MOCK_PASSWORD = "lumen123"

export async function loginAction(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase()
  const password = formData.get("password") as string

  const isValid = email === MOCK_EMAIL && password === MOCK_PASSWORD

  if (!isValid) {
    redirect("/login?error=1")
  }

  const cookieStore = await cookies()
  cookieStore.set("lumen_session", SELLER_ID, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  redirect("/dashboard")
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("lumen_session")
  redirect("/login")
}