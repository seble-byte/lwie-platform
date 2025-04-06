"use client"
import { useState, useRef, useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Camera, Loader2, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Webcam from "react-webcam"

const registerSchema = z
  .object({
    Firstname: z.string().min(2, "Full name must be at least 2 characters"),
    Lastname: z.string().min(2, "Full name must be at least 2 characters"),
    Email: z.string().email("Please enter a valid email address"),
    Password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.Password === data.confirmPassword, {
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
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [faceDetected, setFaceDetected] = useState(false)
  const [blinkDetected, setBlinkDetected] = useState(false)
  const [movementDetected, setMovementDetected] = useState(false)
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [statusMessage, setStatusMessage] = useState("Click 'Start Face Scan' to begin")
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [userData, setUserData] = useState<Omit<RegisterData, "confirmPassword"> | null>(null)

  const webcamRef = useRef<Webcam>(null)
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

      const payload = {
        Firstname: data.Firstname,
        Lastname: data.Lastname,
        Email: data.Email,
        Password: data.Password,
      }

      // Store user data for later use
      setUserData(payload)

      // For testing purposes, we'll skip the actual API call to avoid 404 errors
      // In production, uncomment the following lines:
      /*
      // Use the poster function to send a POST request
      const response = await poster("users", payload)
      console.log("API Response:", response)
      */

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show biometric registration UI
      setShowBiometric(true)
    } catch (err) {
      console.error("Registration error:", err)
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true)
      setStatusMessage("Starting camera...")
      setError("")

      // Set camera as active - the useEffect will handle the actual camera initialization
      setIsCameraActive(true)
    } catch (err) {
      console.error("Error in startCamera:", err)
      setError("Failed to start camera. Please ensure camera permissions are granted.")
      setIsCameraActive(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Capture image from webcam
  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        setCapturedImage(imageSrc)
        return imageSrc
      }
    }
    return null
  }, [webcamRef])

  // Simulate face detection process
  const startFaceDetection = useCallback(() => {
    if (!isCameraActive) return

    setStatusMessage("Looking for your face...")

    // Simulate face detection (step 1)
    setTimeout(() => {
      setFaceDetected(true)
      setStatusMessage("Face detected! Please blink your eyes")

      // Simulate blink detection (step 2)
      setTimeout(() => {
        setBlinkDetected(true)
        setStatusMessage("Blink detected! Please turn your head slightly to the right and back")

        // Simulate movement detection (step 3)
        setTimeout(() => {
          setMovementDetected(true)
          setStatusMessage("Verification complete! You can now complete your registration")
          setVerificationComplete(true)

          // Capture the image
          captureImage()
        }, 2000)
      }, 2000)
    }, 2000)
  }, [isCameraActive, captureImage])

  // Start face detection when camera becomes active
  useEffect(() => {
    if (isCameraActive && !faceDetected) {
      const timer = setTimeout(() => {
        startFaceDetection()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isCameraActive, faceDetected, startFaceDetection])

  const handleBiometricRegistration = async () => {
    try {
      setIsLoading(true)
      setError("")

      if (!verificationComplete) {
        throw new Error("Face verification incomplete. Please complete all verification steps.")
      }

      if (!capturedImage) {
        throw new Error("No face image captured. Please try again.")
      }

      // Here you would typically send the captured image to your backend
      // for processing and storage along with the user data

      // For example:
      /*
      await poster("users/biometric", {
        userId: userData?.id, // You would get this from the initial registration
        faceImage: capturedImage
      })
      */

      // Simulate API call for biometric registration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setRegistrationComplete(true)

      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push("/") // Navigate to home after successful registration
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Biometric registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const resetBiometricScan = () => {
    setIsCameraActive(false)
    setFaceDetected(false)
    setBlinkDetected(false)
    setMovementDetected(false)
    setVerificationComplete(false)
    setCapturedImage(null)
    setStatusMessage("Click 'Start Face Scan' to begin")
    setError("")
  }

  const cancelBiometric = () => {
    setShowBiometric(false)
    resetBiometricScan()
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

          {showBiometric ? (
            // Biometric Registration UI
            <div className="mt-8 space-y-6">
              <div className="flex flex-col items-center space-y-4">
                {registrationComplete ? (
                  <div className="text-center space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                    <p className="text-lg font-medium text-gray-900 dark:text-white">Registration Successful!</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Redirecting you to the homepage...</p>
                  </div>
                ) : (
                  <>
                    {/* Camera/Face Container */}
                    <div
                      className="relative w-48 h-48 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 
                      bg-gray-50 dark:bg-gray-800 overflow-hidden"
                    >
                      {capturedImage ? (
                        // Show captured image if available
                        <Image
                          src={capturedImage || "/placeholder.svg"}
                          alt="Captured face"
                          width={192}
                          height={192}
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        <>
                          {!isCameraActive ? (
                            // Show camera icon when camera is not active
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                              <Camera className="w-16 h-16 text-gray-400" />
                            </div>
                          ) : (
                            // Show webcam when camera is active
                            <div className="absolute inset-0 w-full h-full">
                              <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{
                                  width: 300,
                                  height: 300,
                                  facingMode: "user",
                                }}
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{
                                  transform: "scaleX(-1)", // Mirror the video
                                  borderRadius: "50%", // Ensure it's circular
                                }}
                                onUserMediaError={(err) => {
                                  console.error("Webcam error:", err)
                                  setError("Could not access camera. Please ensure camera permissions are granted.")
                                  setIsCameraActive(false)
                                }}
                              />

                              {/* Face detection overlay */}
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                                <div
                                  className={`w-36 h-36 border-2 rounded-full ${
                                    verificationComplete
                                      ? "border-green-500 border-solid"
                                      : faceDetected
                                        ? "border-yellow-500 border-solid"
                                        : "border-gray-400 border-dashed"
                                  }`}
                                ></div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400">{statusMessage}</p>

                    {/* Verification status indicators */}
                    <div className="flex justify-center space-x-4">
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-1 ${faceDetected ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Face</span>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-1 ${blinkDetected ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Blink</span>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-1 ${movementDetected ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Movement</span>
                      </div>
                    </div>

                    {error && (
                      <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4 w-full">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    )}

                    {!isCameraActive ? (
                      // Start camera button
                      <button
                        onClick={startCamera}
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full 
                        shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none 
                        focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Start Face Scan"}
                      </button>
                    ) : (
                      // Complete registration button
                      <button
                        onClick={handleBiometricRegistration}
                        disabled={isLoading || !verificationComplete}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full 
                        shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none 
                        focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Registration"}
                      </button>
                    )}

                    <div className="flex space-x-4 w-full">
                      {isCameraActive && !isLoading && (
                        <button onClick={resetBiometricScan} className="text-sm text-teal-600 hover:text-teal-500">
                          Reset Scan
                        </button>
                      )}
                      <button onClick={cancelBiometric} className="text-sm text-gray-600 hover:text-gray-500 ml-auto">
                        Back to Form
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            // Standard Registration Form
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="f-name" className="sr-only">
                    First Name
                  </label>
                  <input
                    {...register("Firstname")}
                    id="f-name"
                    type="text"
                    autoComplete="name"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border
                     border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400
                      text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-teal-500
                       focus:border-teal-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800 mb-4"
                    placeholder="First Name"
                  />
                  {errors.Firstname && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.Firstname.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="l-name" className="sr-only">
                    Last Name
                  </label>
                  <input
                    {...register("Lastname")}
                    id="l-name"
                    type="text"
                    autoComplete="name"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                     dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900
                      dark:text-white rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 
                      focus:z-10 sm:text-sm bg-white dark:bg-gray-800 mb-4"
                    placeholder="Last Name"
                  />
                  {errors.Lastname && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.Lastname.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    {...register("Email")}
                    id="email-address"
                    type="email"
                    autoComplete="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                     dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900
                      dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 
                      sm:text-sm bg-white dark:bg-gray-800 mb-4"
                    placeholder="Email address"
                  />
                  {errors.Email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.Email.message}</p>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    {...register("Password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                     dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900
                      dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 
                      sm:text-sm bg-white dark:bg-gray-800 mb-4"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {errors.Password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.Password.message}</p>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    {...register("confirmPassword")}
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                     dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900
                     dark:text-white rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 
                     focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
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
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent
                   text-sm font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50
                    disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Next"}
                </button>
              </div>
            </form>
          )}

          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-teal-600 hover:text-teal-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

