import vine from '@vinejs/vine'

export const createReadingValidator = vine.compile(
  vine.object({
    value: vine.number(),
    sensorId: vine.number().positive()
  })
)