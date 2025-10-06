import type { HttpContext } from '@adonisjs/core/http'
import Reading from '#models/reading'
import Sensor from '#models/sensor'
import { createReadingValidator } from '#validators/reading'
import { DateTime } from 'luxon'

export default class ReadingsController {
  // Store: voeg nieuwe reading toe
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createReadingValidator)
    
    // Controleer of sensor bestaat en actief is
    const sensor = await Sensor.findOrFail(data.sensorId)
    
    if (!sensor.isActive) {
      return response.badRequest({ error: 'Sensor is niet actief' })
    }
    
    // Maak nieuwe reading aan
    await Reading.create({
      value: data.value,
      timestamp: DateTime.now(),
      sensorId: data.sensorId
    })
    
    return response.redirect().toRoute('sensors.show', { id: data.sensorId })
  }

  // Lijst van readings per sensor
  async bySensor({ params, view }: HttpContext) {
    const sensor = await Sensor.findOrFail(params.id)
    const readings = await Reading.query()
      .where('sensor_id', params.id)
      .orderBy('timestamp', 'desc')
      .limit(50)
    
    return view.render('readings/by_sensor', { sensor, readings })
  }
}