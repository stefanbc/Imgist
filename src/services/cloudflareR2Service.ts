// src/services/cloudflareR2Service.ts
import axios from 'axios'

const CLOUDFLARE_ACCOUNT_ID = ''
const CLOUDFLARE_ACCESS_KEY_ID = ''
const CLOUDFLARE_SECRET_ACCESS_KEY = ''
const CLOUDFLARE_BUCKET_NAME = ''

const cloudflareR2Service = {
  async uploadFile(
    file: File
  ): Promise<{ id: string; name: string; size: number; uploadedAt: Date }> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/r2/buckets/${CLOUDFLARE_BUCKET_NAME}/objects`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Auth-Email': CLOUDFLARE_ACCESS_KEY_ID,
          'X-Auth-Key': CLOUDFLARE_SECRET_ACCESS_KEY,
        },
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to upload file')
    }

    return {
      id: response.data.result.id,
      name: file.name,
      size: file.size,
      uploadedAt: new Date(),
    }
  },
}

export default cloudflareR2Service
