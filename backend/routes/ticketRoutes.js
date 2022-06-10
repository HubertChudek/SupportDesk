const express = require('express')
const router = express.Router()
const noteRouter = require('./noteRoutes')
const protect = require('../middleware/authMiddleware')
const {
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  createTicket,
} = require('../controllers/ticketController')

// Re-route into router
router.use('/:ticketId/notes', noteRouter)

router.route('/').get(protect, getTickets).post(protect, createTicket)
router
  .route('/:id')
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket)

module.exports = router
