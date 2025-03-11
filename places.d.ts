interface Place {
  id: number
  name: string
  description?: string
  website?: string
  phone?: string
  type?: string
  lngLat: [number, number]
  verified?: string
  accepts: {
    ln?: true
    lnNfc?: true
    onchain?: true
  }
}
