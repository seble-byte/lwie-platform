"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2, Upload } from "lucide-react"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  productDescription: z
    .string()
    .min(20, {
      message: "Product description must be at least 20 characters.",
    })
    .max(500, {
      message: "Product description cannot exceed 500 characters.",
    }),
  productImage: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Please upload at least one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size should be less than 5MB.`,
    })
    .optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function AdvertisementForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      email: "",
      phoneNumber: "",
      productDescription: "",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      console.log(data)

      // For file handling, you would typically use FormData
      if (data.productImage && data.productImage.length > 0) {
        const formData = new FormData()
        formData.append("companyName", data.companyName)
        formData.append("email", data.email)
        formData.append("phoneNumber", data.phoneNumber)
        formData.append("productDescription", data.productDescription)
        formData.append("productImage", data.productImage[0])

        // You would send formData to your API
        console.log("Form data with file ready to be sent")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Advertisement submitted",
        description: "We'll review your submission and get back to you soon.",
      })

      form.reset()
      setSelectedFileName(null)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your advertisement couldn't be submitted. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setSelectedFileName(files[0].name)
    } else {
      setSelectedFileName(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advertisement Submission</CardTitle>
        <CardDescription>Provide details about your company and product to create an advertisement</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@company.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your product in detail..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormDescription>Provide a clear description of the product you want to advertise.</FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productImage"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="productImage"
                          className="flex items-center gap-2 px-4 py-2 border border-teal-600 rounded-md cursor-pointer hover:bg-teal-600 hover:text-white"                        >
                          <Upload className="h-4 w-4" />
                          <span>Choose file</span>
                        </label>
                        {selectedFileName && <span className="text-sm text-muted-foreground">{selectedFileName}</span>}
                      </div>
                      <Input
                        id="productImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          onChange(e.target.files)
                          handleFileChange(e)
                        }}
                        {...rest}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Upload an image of your product (max 5MB).</FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                className={`px-8 ${isSubmitting ? "bg-gray-400 text-white" : "bg-teal-600 text-white hover:bg-teal-700"}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Advertisement"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">Our team will review your submission within 2-3 business days</p>
      </CardFooter>
    </Card>
  )
}

