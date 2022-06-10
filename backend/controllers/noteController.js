const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)
  //TODO add validation if ticket exists
  //TODO add validation if id length is incorrect

  if (ticket.user.toString() !== req.user.id) {
    res.status(403)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)
})

// @desc Create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)
  //TODO add validation if ticket exists
  //TODO add validation if id length is incorrect

  if (ticket.user.toString() !== req.user.id) {
    res.status(403)
    throw new Error('User not authorized')
  }

  const note = await Note.create({
    user: req.user.id,
    ticket: req.params.ticketId,
    text: req.body.text,
    isStaff: false,
  })

  res.status(200).json(note)
})

module.exports = { getNotes, addNote }
