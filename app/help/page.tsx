"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

// FAQ sections
const faqCategories = [
  {
    title: "Getting Started",
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "To create an account, click on the 'Login' button in the top navigation bar and then select 'Sign Up'. Fill in your details, and you're good to go!",
      },
      {
        question: "Is LWIE free to use?",
        answer:
          "Yes, LWIE is completely free for basic listings. We do offer premium listing options for a small fee, which gives your items more visibility.",
      },
      {
        question: "How do I post an item?",
        answer:
          "After logging in, click the 'Post' button in the navigation bar. Fill in your item details, upload photos, and submit!",
      },
    ],
  },
  {
    title: "Swapping & Transactions",
    faqs: [
      {
        question: "How does swapping work?",
        answer:
          "When you find an item you're interested in, click 'Swap Now' on the item page. You can then select items from your listings to offer in exchange, or propose a cash offer if the seller accepts cash.",
      },
      {
        question: "Is LWIE responsible for shipping?",
        answer:
          "No, LWIE facilitates connections between swappers, but shipping arrangements and costs are the responsibility of the users involved in the swap.",
      },
      {
        question: "What if I receive an item not as described?",
        answer:
          "We recommend thoroughly checking items upon receipt. If there's an issue, you can report it through our Resolution Center within 48 hours.",
      },
    ],
  },
  {
    title: "Account & Security",
    faqs: [
      {
        question: "How secure is my personal information?",
        answer:
          "We take security seriously. Your personal information is encrypted and we never share your details with third parties without your consent.",
      },
      {
        question: "Can I change my username or email?",
        answer:
          "Yes, you can update your profile information including username and email from your account settings page.",
      },
      {
        question: "What happens if I forget my password?",
        answer:
          "On the login page, click 'Forgot Password' and follow the instructions sent to your email to reset your password.",
      },
    ],
  },
  {
    title: "Donations & Charity",
    faqs: [
      {
        question: "How can I donate items to charity?",
        answer:
          "Navigate to the Charity section on our homepage or click 'Donate' in your item posting flow. You can select verified charities to donate your items to.",
      },
      {
        question: "Are charity donations tax-deductible?",
        answer:
          "Yes, donations to registered charities through LWIE are tax-deductible. You'll receive a donation receipt for your records.",
      },
      {
        question: "How do I know my donations reach the intended recipients?",
        answer:
          "We only partner with verified charitable organizations. Each charity reports back with impact stories and updates on how donations are being used.",
      },
    ],
  },
]

export default function HelpPage() {
  const [openCategory, setOpenCategory] = useState<string | null>("Getting Started")
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({})

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title)
  }

  const toggleFaq = (question: string) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [question]: !prev[question],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">Help Center</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Find answers to common questions about using LWIE
          </p>

          {/* Search bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for help..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white px-4 py-1 rounded-md hover:bg-teal-700 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* FAQ sections */}
          <div className="space-y-4">
            {faqCategories.map((category) => (
              <div key={category.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span>{category.title}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openCategory === category.title ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {openCategory === category.title && (
                  <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="space-y-3">
                      {category.faqs.map((faq) => (
                        <div
                          key={faq.question}
                          className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-3 last:pb-0"
                        >
                          <button
                            onClick={() => toggleFaq(faq.question)}
                            className="w-full flex justify-between items-center py-2 text-left font-medium text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown
                              className={`h-4 w-4 text-gray-500 transition-transform ${
                                openFaqs[faq.question] ? "transform rotate-180" : ""
                              }`}
                            />
                          </button>

                          {openFaqs[faq.question] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 text-gray-600 dark:text-gray-400 text-sm"
                            >
                              <p>{faq.answer}</p>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact support */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Couldn't find what you're looking for?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our support team is ready to help with any questions you may have.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

