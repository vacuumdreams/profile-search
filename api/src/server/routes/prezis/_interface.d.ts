export interface PreziData {
  id?: string,
  title?: string,
  thumbnail?: string,
  creator?: {
    name?: string,
    profileUrl?: string, 
  },
  createdAt?: string,
}

export interface PreziQueries {
  search?: (term: string) => PreziData[],
  sort?: (term: string) => PreziData[],
}
