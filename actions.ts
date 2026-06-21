"use server"
 
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { createBook,SELLER_ID
  ,deleteBook
 } from "@/lib/data"


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


const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"]
const MAX_SIZE = 5 * 1024 * 1024 

export async function createBookAction(formData: FormData) {
  const cookieStore = await cookies()
  const sellerId = cookieStore.get("lumen_session")?.value
 
  if (!sellerId) {
    redirect("/login")
  }
 
  const title = (formData.get("title") as string)?.trim()
  const author = (formData.get("author") as string)?.trim()
  const price = parseFloat(formData.get("price") as string)
  const description = (formData.get("description") as string)?.trim()
  const category = (formData.get("category") as string)?.trim()
  const stock = parseInt(formData.get("stock") as string, 10) || 0
  const coverFile = formData.get("cover") as File | null
 
  if (!title || !author || !category || Number.isNaN(price)) {
    redirect("/dashboard/new?error=1")
  }
 
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
 
  let coverImageUrl = "/covers/placeholder.jpg"
 
  if (coverFile && coverFile.size > 0) {
    if (!ALLOWED_TYPES.includes(coverFile.type)) {
      redirect("/dashboard/new?error=invalid-type")
    }
    if (coverFile.size > MAX_SIZE) {
      redirect("/dashboard/new?error=too-large")
    }
 
    const extension = coverFile.type.split("/")[1]
    const filename = `${slug}-${Date.now()}.${extension}`
    const uploadDir = path.join(process.cwd(), "public", "covers")
    const filePath = path.join(uploadDir, filename)
 
    await mkdir(uploadDir, { recursive: true })
    const buffer = Buffer.from(await coverFile.arrayBuffer())
    await writeFile(filePath, buffer)
 
    coverImageUrl = `/covers/${filename}`
  }
 
  await createBook({
    slug,
    title,
    author,
    price,
    description,
    category,
    coverImageUrl,
    stock,
    sellerId,
  })
 
  revalidatePath("/books")
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/books")
  revalidatePath(`/books/${slug}`)
 
  redirect("/dashboard/books")
}
 

export async function deleteBookAction(formData: FormData) {
  const id = formData.get("id") as string
  const slug = formData.get("slug") as string
 
  await deleteBook(id)
 

  revalidatePath("/books")
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/books")
  if (slug) revalidatePath(`/books/${slug}`)
}
 

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("lumen_session")
  redirect("/login")
}