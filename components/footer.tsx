import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
          <div className="flex justify-center mb-4">
          <Image 
            src="/images/logo.jpg"
            alt="Logo"
            width={150} 
            height={50} 
            className="object-contain" 
          />
        </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 dark:text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-teal-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-teal-600">
                  Safety Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-teal-600">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 dark:text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-teal-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-teal-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-teal-600">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 dark:text-white">Connect</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Facebook className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-teal-600" />
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-teal-600">
                  Facebook
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-teal-600" />
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-teal-600">
                  Twitter
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Instagram className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-teal-600" />
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-teal-600">
                  Instagram
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-teal-600" />
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-teal-600">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} LWIE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

