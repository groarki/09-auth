import { ServerBoolResponse, User } from '@/types/note'
import { cookies } from 'next/headers'
import nextServer from './api'

export const checkServerSession = async () => {
  const cookieData = await cookies()
  const response = await nextServer<ServerBoolResponse>(`/auth/session`, {
    headers: { Cookie: cookieData.toString() },
  })
  return response
}

export const getServerMe = async () => {
  const cookieData = await cookies()
  const { data } = await nextServer<User>(`/auth/me`, {
    headers: { Cookie: cookieData.toString() },
  })
  return data
}