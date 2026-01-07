'use client'

import { useState } from 'react'
import { Metadata } from 'next'

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-5 px-6 text-left flex items-start justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{ minHeight: '44px' }}
      >
        <span className="text-lg font-semibold text-gray-900 pr-4">{question}</span>
        <svg
          className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      id: '1',
      question: 'How often do you publish new blog posts?',
      answer: 'We publish new blog posts 2-3 times per week, covering the latest trends in web development, design, and technology. Subscribe to our newsletter to get notified when new posts are published.',
    },
    {
      id: '2',
      question: 'Can I suggest topics for future blog posts?',
      answer: 'Absolutely! We love hearing from our readers. You can suggest topics by contacting us through our About page or by leaving comments on existing blog posts. We review all suggestions and prioritize topics based on community interest.',
    },
    {
      id: '3',
      question: 'Are the code examples in your posts production-ready?',
      answer: 'Yes, all code examples are tested and follow current best practices. However, we recommend reviewing and adapting the code to your specific use case and security requirements before deploying to production.',
    },
    {
      id: '4',
      question: 'How can I share blog posts on social media?',
      answer: 'Each blog post includes social sharing buttons for easy sharing on Twitter, LinkedIn, and Facebook. You can also copy the post URL and share it anywhere you\'d like.',
    },
    {
      id: '5',
      question: 'Do you offer RSS feeds for blog updates?',
      answer: 'Yes, we provide an RSS feed so you can stay updated with our latest posts using your favorite RSS reader. The feed URL is available at /feed.xml.',
    },
    {
      id: '6',
      question: 'Can I republish or translate your blog posts?',
      answer: 'We appreciate your interest in sharing our content! Please contact us for permission before republishing or translating posts. We typically grant permission with proper attribution and a link back to the original post.',
    },
    {
      id: '7',
      question: 'Are there any prerequisites for following your tutorials?',
      answer: 'Each tutorial specifies its prerequisites at the beginning. Generally, we assume basic knowledge of HTML, CSS, and JavaScript. For advanced topics, we\'ll indicate if you need experience with specific frameworks or tools.',
    },
    {
      id: '8',
      question: 'How do I report errors or typos in blog posts?',
      answer: 'We strive for accuracy, but mistakes happen! Please report any errors, typos, or technical issues by contacting us through the About page. We review and correct issues promptly and appreciate your help in maintaining quality content.',
    },
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about BlogSite, our content, and how to make the most of our resources.
          </p>
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-primary-50 rounded-lg border border-primary-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Still have questions?</h2>
          <p className="text-gray-700 mb-4">
            If you couldn't find the answer you were looking for, feel free to reach out through our About page or leave a comment on any blog post.
          </p>
          <a
            href="/about"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            style={{ minHeight: '44px' }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
