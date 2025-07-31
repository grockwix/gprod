import type { ReactNode } from 'react'

type TLink = {
  name: string
  href: string
  icon?: ReactNode
}

type TLinks = TLink[]

export type { TLink, TLinks }
