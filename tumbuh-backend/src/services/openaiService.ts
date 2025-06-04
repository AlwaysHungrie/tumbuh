import { config } from '../config'
import OpenAI from 'openai'
import fs from 'fs'

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
})

export const getImageDescription = async (imagePath: string, mimetype: string) => {
  const imageBuffer = fs.readFileSync(imagePath)
  const base64Image = imageBuffer.toString('base64')
  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Check if the image if of a plant getting watered.',
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:${mimetype};base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    tools: [
      {
        type: 'function',
        function: {
          name: 'checkWater',
          description:
            'Check if the image if of a plant getting watered.',
          parameters: {
            type: 'object',
            properties: {
              isWatering: {
                type: 'boolean',
                description:
                  'Whether the image contains a plant getting watered.',
              },
            },
            required: ['isWatering'],
          },
        },
      },
    ],
    tool_choice: {
      type: 'function',
      function: { name: 'checkWater' },
    },
    temperature: 0.2,
    max_tokens: 500,
  })

  const result = response.choices[0].message
  return result
}