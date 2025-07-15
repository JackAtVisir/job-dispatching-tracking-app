import { atom } from 'jotai'

interface Asset {

  id: string
  category: string
  number: number
  region?: string

}

export const selectedAssetsAtom = atom<Asset[]>([])