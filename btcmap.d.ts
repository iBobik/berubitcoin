export interface BtcMapPlace {
  id: string
  osm_json: OsmJSON
  tags: Tags
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface OsmJSON {
  changeset?: number
  id: number
  lat?: number
  lon?: number
  tags: { [key: string]: string }
  timestamp?: string
  type: Type
  uid?: number
  user?: string
  version?: number
  bounds?: Bounds
  geometry?: Geometry[]
  nodes?: number[]
  members?: Member[]
}

export interface Bounds {
  maxlat: number
  maxlon: number
  minlat: number
  minlon: number
}

export interface Geometry {
  lat: number
  lon: number
}

export interface Member {
  geometry?: Geometry[]
  ref: number
  role: Role
  type: Type
}

export enum Role {
  Empty = "",
  Inner = "inner",
  Outer = "outer",
}

export enum Type {
  Node = "node",
  Relation = "relation",
  Way = "way",
}

export interface Tags {
  category: Category
  "icon:android": string
  "payment:coinos"?: string
  "payment:pouch"?: string
  "boost:expires"?: string
  "category:plural"?: CategoryPlural
  "payment:provider"?: string
  "payment:uri"?: string
}

export enum Category {
  ATM = "atm",
  Bar = "bar",
  Cafe = "cafe",
  Hotel = "hotel",
  Other = "other",
  Pub = "pub",
  Restaurant = "restaurant",
}

export enum CategoryPlural {
  Atms = "atms",
  Bars = "bars",
  Cafes = "cafes",
  Hotels = "hotels",
  Other = "other",
  Pubs = "pubs",
  Restaurants = "restaurants",
}
