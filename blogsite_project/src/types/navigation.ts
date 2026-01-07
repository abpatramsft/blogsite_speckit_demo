export interface NavigationItem {
  label: string
  href: string
  order: number
  external?: boolean
}

export interface SiteMetadata {
  siteName: string
  siteDescription: string
  siteUrl: string
  author: string
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}
