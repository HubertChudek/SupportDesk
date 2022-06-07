const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc Get user's tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({ user: req.user.id })
  res.status(200).json(tickets)
})

// @desc Get user's particular ticket
// @route GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  // Validate if the ticket is owned by authenticated user (aka authorize user to access this ticket)
  if (ticket.user.toString() !== req.user.id) {
    res.status(403)
    throw new Error('Not authorized')
  }

  res.status(200).json(ticket)
})

// @desc Delete particular ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  // Validate if the ticket is owned by authenticated user (aka authorize user to access this ticket)
  if (ticket.user.toString() !== req.user.id) {
    res.status(403)
    throw new Error('Not authorized')
  }

  await ticket.remove()

  res.status(200).json({ success: true })
})

// @desc Update user's ticket
// @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  // Validate if the ticket is owned by authenticated user (aka authorize user to access this ticket)
  if (ticket.user.toString() !== req.user.id) {
    res.status(403)
    throw new Error('Not authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedTicket)
})

// @desc Create new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res, next) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please add product and description')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.create({
    user: req.user.id,
    product,
    description,
    status: 'new',
  })

  res.status(201).json(ticket)
})

module.exports = {
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  createTicket,
}
