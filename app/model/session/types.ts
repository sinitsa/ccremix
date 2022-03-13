
export type IRefreshSession = {
  login: string,
  refreshToken: string
}

export type ISession = {
  login: string,
  token: SessionToken,
  themeDark?: boolean
}

export type SessionToken = {
  access: string,
  refresh: string,
} | null