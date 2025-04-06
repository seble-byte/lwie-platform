"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Camera, Edit, LogOut, Mail, MapPin, Phone, User } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const profileInputRef = useRef<HTMLInputElement>(null)

  // State for images
  const [profileImage, setProfileImage] = useState("/placeholder.svg")
  const [coverImage, setCoverImage] = useState("/placeholder.svg")

  // Mock user data - in a real app, this would come from your auth system
  const userData = {
    name: "John Doe",
    username: "johndoe123",
    email: "john.doe@example.com",
    phone: "+251 912 345 678",
    location: "Addis Ababa, Ethiopia",
    bio: "Passionate about swapping items and finding treasures. I love vintage cameras, books, and tech gadgets.",
    memberSince: "January 2023",
    itemsListed: 12,
    successfulSwaps: 8,
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  // Handle cover image change
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setCoverImage(imageUrl)
    }
  }

  // Handle profile image change
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hidden file inputs */}
      <input type="file" ref={coverInputRef} onChange={handleCoverImageChange} accept="image/*" className="hidden" />
      <input
        type="file"
        ref={profileInputRef}
        onChange={handleProfileImageChange}
        accept="image/*"
        className="hidden"
      />

      {/* Cover Image and Profile Section */}
      <div className="relative mb-8">
        <div className="h-48 md:h-64 w-full rounded-xl overflow-hidden">
          <Image src={coverImage || "/placeholder.svg"} alt="Cover" fill className="object-cover" />
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-4 right-4 flex items-center gap-1"
            onClick={() => coverInputRef.current?.click()}
          >
            <Camera className="h-4 w-4" />
            <span>Change Cover</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-16 md:-mt-12 px-4">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={profileImage} alt={userData.name} />
              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
              onClick={() => profileInputRef.current?.click()}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{userData.name}</h1>
                <p className="text-muted-foreground">@{userData.username}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar - User Info */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Bio</p>
                  <p className="text-sm text-muted-foreground">{userData.bio}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{userData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{userData.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Member Since</span>
                <span className="text-sm font-medium">{userData.memberSince}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm">Items Listed</span>
                <span className="text-sm font-medium">{userData.itemsListed}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm">Successful Swaps</span>
                <span className="text-sm font-medium">{userData.successfulSwaps}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2">
          <Tabs defaultValue="items">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="items">My Items</TabsTrigger>
              <TabsTrigger value="swaps">My Swaps</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="items" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Listed Items</h2>
                <Button>
                  <Camera className="h-4 w-4 mr-2" />
                  Post New Item
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src="/placeholder.svg" alt={`Item ${item}`} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">Item Title {item}</h3>
                      <p className="text-sm text-muted-foreground">Listed on: April 1, 2023</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline">For Swap</Badge>
                        <span className="text-teal-600 font-medium">5,000 ETB</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="swaps" className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">My Swap History</h2>

              <div className="space-y-4">
                {[1, 2, 3].map((swap) => (
                  <Card key={swap}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">Swap #{swap}</CardTitle>
                        <Badge className="bg-teal-600">Completed</Badge>
                      </div>
                      <CardDescription>Completed on April {swap * 3}, 2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 border rounded-lg p-3">
                          <p className="text-sm font-medium mb-2">You Swapped:</p>
                          <div className="flex items-center gap-3">
                            <div className="relative h-16 w-16 rounded overflow-hidden">
                              <Image src="/placeholder.svg" alt="Your item" fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-medium">Vintage Camera</p>
                              <p className="text-sm text-muted-foreground">Value: 3,000 ETB</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 border rounded-lg p-3">
                          <p className="text-sm font-medium mb-2">You Received:</p>
                          <div className="flex items-center gap-3">
                            <div className="relative h-16 w-16 rounded overflow-hidden">
                              <Image src="/placeholder.svg" alt="Their item" fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-medium">Bluetooth Speaker</p>
                              <p className="text-sm text-muted-foreground">Value: 2,800 ETB</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={userData.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue={userData.username} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userData.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue={userData.phone} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" defaultValue={userData.bio} rows={4} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={userData.location} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications about swaps and messages
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="swap-requests">Swap Requests</Label>
                      <p className="text-sm text-muted-foreground">Get notified when someone wants to swap with you</p>
                    </div>
                    <Switch id="swap-requests" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="messages">Messages</Label>
                      <p className="text-sm text-muted-foreground">Get notified when you receive a new message</p>
                    </div>
                    <Switch id="messages" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                    </div>
                    <Switch id="marketing" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

