import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://detect-rice-leaf-disease.onrender.com'

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

/**
 * Friendly, user-facing error messages. We never surface raw
 * network/HTTP internals to the UI.
 */
function toFriendlyError(error) {
  if (error.response) {
    // Backend responded with a handled error (validation, bad image, etc.)
    const detail = error.response.data?.detail
    if (detail) return new Error(detail)
    if (error.response.status === 500) {
      return new Error('Something went wrong while analyzing the image. Please try again.')
    }
    return new Error('Unable to analyze this image. Please upload a clear photo of a rice leaf.')
  }
  if (error.request) {
    // Request was made but no response received — backend likely down
    return new Error(
      'Could not reach the Crop Dekho server. Please make sure the backend is running and try again.'
    )
  }
  return new Error('Unexpected error. Please try again.')
}

/**
 * Upload a rice leaf image and get back the AI diagnosis + remedy info.
 * @param {File} file
 * @returns {Promise<object>} prediction response from the backend
 */
export async function predictDisease(file) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    // Do not set Content-Type manually — the browser must add the multipart boundary.
    const response = await client.post('/predict', formData)
    return response.data
  } catch (error) {
    throw toFriendlyError(error)
  }
}

export default client
