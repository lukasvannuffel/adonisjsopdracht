import vine from '@vinejs/vine'

export const createSensorValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1),
    type: vine.string().trim().minLength(1),
    thresholdValue: vine.number(),
    isActive: vine.boolean().optional()
  })
)

export const updateSensorValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).optional(),
    type: vine.string().trim().minLength(1).optional(),
    thresholdValue: vine.number().optional(),
    isActive: vine.boolean().optional()
  })
)