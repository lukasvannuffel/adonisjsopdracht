/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const SensorsController = () => import('#controllers/sensors_controller')
const ReadingsController = () => import('#controllers/readings_controller')

// Home route - redirect to sensors
router.get('/', async ({ response }) => {
  return response.redirect().toRoute('sensors.index')
})

// Sensor routes
router.get('/sensors', [SensorsController, 'index']).as('sensors.index')
router.get('/sensors/create', [SensorsController, 'create']).as('sensors.create')
router.post('/sensors', [SensorsController, 'store']).as('sensors.store')
router.get('/sensors/:id', [SensorsController, 'show']).as('sensors.show')
router.get('/sensors/:id/edit', [SensorsController, 'edit']).as('sensors.edit')
router.post('/sensors/:id', [SensorsController, 'update']).as('sensors.update')

// Reading routes
router.post('/readings', [ReadingsController, 'store']).as('readings.store')
router.get('/sensors/:id/readings', [ReadingsController, 'bySensor']).as('readings.bySensor')