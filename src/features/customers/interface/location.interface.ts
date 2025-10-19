export interface District {
  id: string
  name: string
  province_id: number
  createdAt: string
  updatedAt: string
  province: Province | undefined
}

export interface Province {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}
