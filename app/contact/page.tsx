"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Dribbble } from "lucide-react"

export default function Contact() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="contact" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Parallax decorative elements */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-50 to-transparent"
        style={{ transform: `translateX(${scrollY * 0.05}px)` }}
      />
      <div
        className="absolute left-0 bottom-0 w-1/3 h-1/2 bg-gradient-to-t from-cyan-50 to-transparent"
        style={{ transform: `translateX(${scrollY * -0.05}px)` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to discuss a potential collaboration? I&apos;d love to hear from you. Let&apos;s create
            something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div
            className="bg-white p-8 rounded-lg shadow-md"
            style={{ transform: `translateY(${(scrollY - 2500) * -0.05}px)` }}
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input id="subject" placeholder="Subject" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message" rows={5} />
              </div>

              <Button className="w-full bg-teal-500 hover:bg-teal-600">Send Message</Button>
            </form>
          </div>

          <div className="lg:pl-10" style={{ transform: `translateY(${(scrollY - 2500) * 0.05}px)` }}>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-teal-500 mt-1 mr-4" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600">hello@designstudio.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-teal-500 mt-1 mr-4" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-teal-500 mt-1 mr-4" />
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-gray-600">New York City, NY</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors"
                >
                  <Dribbble className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
