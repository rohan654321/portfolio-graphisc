"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
// import { signIn } from "@/lib/auth" // Removed signIn import

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
//   const { toast } = useToast()
  const router = useRouter()

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check localStorage for admin login status
        const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"
        if (isAdminLoggedIn) {
          router.push("/admin/dashboard")
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // Not authenticated, stay on login page
      }
    }

    checkAuth()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Hardcoded credentials for demo purposes
      // In a real app, you would validate against a database
      if (email === "admin@example.com" && password === "admin123") {
        // Set a simple flag in localStorage to indicate the user is logged in
        // In a real app, you would use a proper authentication system
        localStorage.setItem("isAdminLoggedIn", "true")

        toast(
       
      "Redirecting to dashboard...",
        )

        // Redirect to dashboard
        router.push("/admin/dashboard")
      } else {
        toast(
         
           "Invalid email or password",
          
        )
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast(
     
   "Something went wrong. Please try again.",
       
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Sign in to manage your portfolio projects</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
