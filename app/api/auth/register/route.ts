import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { sql } from "@vercel/postgres"
import { signToken } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const { email, password, name, biometricData } = await req.json()

    // Check if user exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await sql`
      INSERT INTO users (email, password, name, biometric_data)
      VALUES (${email}, ${hashedPassword}, ${name}, ${biometricData})
      RETURNING id, email, name
    `

    // Generate token
    const token = await signToken({
      id: user.rows[0].id,
      email: user.rows[0].email,
    })

    // Set cookie
    const response = NextResponse.json({ user: user.rows[0] })
    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}

