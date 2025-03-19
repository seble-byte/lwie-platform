"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Camera, Loader2 } from "lucide-react"
import Image from "next/image"

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type RegisterData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showBiometric, setShowBiometric] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterData) => {
    try {
      setIsLoading(true)
      setError("")

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      router.push("/")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBiometricRegistration = async () => {
    try {
      setIsLoading(true)
      setError("")

      await new Promise((resolve) => setTimeout(resolve, 1500))

      router.push("/")
    } catch (err) {
      setError("Biometric registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Content Box */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {/* Logo and Title */}
          <div className="text-center">
            <Link href="/" className="inline-block">
              <Image src="/placeholder.svg" alt="LWIE Logo" width={48} height={48} className="mx-auto" />
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Join our community and start swapping!</p>
          </div>

          {/* Registration Options */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowBiometric(false)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                !showBiometric
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setShowBiometric(true)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                showBiometric ? "bg-teal-600 text-white hover:bg-teal-700" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Biometric
            </button>
          </div>

          {showBiometric ? (
            // Biometric Registration UI
            <div className="mt-8 space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-48 h-48 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                  <Camera className="w-16 h-16 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Position your face in the center</p>
                <button
                  onClick={handleBiometricRegistration}
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register with Face ID"}
                </button>
              </div>
            </div>
          ) : (
            // Standard Registration Form
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="full-name" className="sr-only">Full Name</label>
                  <input
                    {...register("fullName")}
                    id="full-name"
                    type="text"
                    autoComplete="name"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800 mb-4"
                    placeholder="Full Name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    {...register("email")}
                    id="email-address"
                    type="email"
                    autoComplete="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800 mb-4"
                    placeholder="Email address"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>}
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800 mb-4"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                  <input
                    {...register("confirmPassword")}
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign up"}
                </button>
              </div>
            </form>
          )}

          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-teal-600 hover:text-teal-500">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}