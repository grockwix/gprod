type TVideo = {
  src: string
  href: string
}

type TWork = {
  id: number
} & TVideo

type TWorks = TWork[]

export type { TVideo, TWorks }
