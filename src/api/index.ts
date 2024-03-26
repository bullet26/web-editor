import ky from 'ky'
import { LessonType, LessonFromAPIType } from 'types'
import { preparedDataAfterGETRequest, preparedDataForPOSTRequest } from './utils'

const baseURL = import.meta.env.VITE_API_BASE_URL

const $request = (accessToken: string) => {
  return ky.create({
    prefixUrl: `${baseURL}/api`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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
}

export const getLessonByVersionId = async (
  accessToken: string,
  versionId: string,
): Promise<LessonType> => {
  try {
    const res: LessonFromAPIType = await $request(accessToken)
      .get(`lessons/versions/${versionId}`)
      .json()
    return preparedDataAfterGETRequest(res)
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

export const saveLesson = async (accessToken: string, data: LessonType): Promise<string> => {
  try {
    const dataForPOST = preparedDataForPOSTRequest(data)

    const res: string = await $request(accessToken)
      .post(`lessons`, {
        json: dataForPOST,
      })
      .json()
    return res
  } catch (error: any) {
    console.log(error)
    if (error?.name === 'HTTPError') {
      const { message } = await error.response.json()
      error.message = message
      throw error
    }
    error.message = 'На жаль щось пішло не так'
    throw error
  }
}

export const updateLessonByVersionId = async (
  accessToken: string,
  data: LessonType,
  versionId: string,
): Promise<string> => {
  try {
    const dataForPUT = preparedDataForPOSTRequest(data).chapters

    const res: string = await $request(accessToken)
      .put(`lessons/versions/${versionId}`, {
        json: dataForPUT,
      })
      .json()
    return res
  } catch (error: any) {
    console.log(error)
    if (error?.name === 'HTTPError') {
      const { message } = await error.response.json()
      error.message = message
      throw error
    }
    error.message = 'На жаль щось пішло не так'
    throw error
  }
}
