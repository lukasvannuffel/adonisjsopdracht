import type { HttpContext } from '@adonisjs/core/http'
import Sensor from '#models/sensor'
import { createSensorValidator, updateSensorValidator } from '#validators/sensor'

export default class SensorsController {
  // Index: toon alle sensoren
  async index({ view }: HttpContext) {
    const sensors = await Sensor.query()
      .preload('readings', (query) => {
        query.orderBy('timestamp', 'desc').limit(1)
      })
      .orderBy('created_at', 'desc')
    
    return view.render('sensors/index', { sensors })
  }

  // Show: toon details van één sensor
  async show({ params, view }: HttpContext) {
    const sensor = await Sensor.query()
      .where('id', params.id)
      .preload('readings', (query) => {
        query.orderBy('timestamp', 'desc').limit(20)
      })
      .firstOrFail()
    
    return view.render('sensors/show', { sensor })
  }

  // Create form
  async create({ view }: HttpContext) {
    return view.render('sensors/create')
  }

  // Store: bewaar nieuwe sensor
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createSensorValidator)
    
    await Sensor.create({
      name: data.name,
      type: data.type,
      thresholdValue: data.thresholdValue,
      isActive: data.isActive ?? true
    })
    
    return response.redirect().toRoute('sensors.index')
  }

  // Edit form
  async edit({ params, view }: HttpContext) {
    const sensor = await Sensor.findOrFail(params.id)
    return view.render('sensors/edit', { sensor })
  }

  // Update: wijzig bestaande sensor
  async update({ params, request, response }: HttpContext) {
    const sensor = await Sensor.findOrFail(params.id)
    const data = await request.validateUsing(updateSensorValidator)
    
    sensor.merge(data)
    await sensor.save()
    
    return response.redirect().toRoute('sensors.show', { id: sensor.id })
  }
}