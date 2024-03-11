import ky from 'ky'
import { LessonType } from 'types'

const baseURL = import.meta.env.VITE_API_BASE_URL
const accessToken = localStorage.getItem('token')
const $request = ky.create({
  prefixUrl: `${baseURL}/api`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  credentials: 'include',
  hooks: {
    beforeRetry: [
      // eslint-disable-next-line consistent-return
      async ({ request, options, error, retryCount }) => {
        if (retryCount > 2) {
          return ky.stop
        }
      },
    ],
  },
})

export const getBlocks = async (state: string = ''): Promise<LessonType> => {
  try {
    const res: LessonType = await $request.get(`lesson/${state}`).json()
    return res
  } catch (error: any) {
    if (error?.name === 'HTTPError') {
      const { message } = await error.response.json()
      error.message = message
      throw error
    }
    error.message = 'На жаль щось пішло не так'
    throw error
  }
}
