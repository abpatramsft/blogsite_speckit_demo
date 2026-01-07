export interface FAQItem {
  id: string
  question: string
  answer: string
  order: number
  category?: string
}

export interface FAQCollection {
  version: string
  lastUpdated: string
  faqs: FAQItem[]
}
