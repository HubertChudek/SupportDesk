import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset } from '../features/tickets/ticketSlice'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.ticket)

  const params = useParams()
  const { ticketId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId]) // Supposedly passing dispatch here causes loop.
  //                                  Didn't happen, but went with course recommendation to silence the warning anyways.

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something went wrong. Please try again in a while.</h3>
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status} </span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-GB')}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of the Issuse</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  )
}

export default Ticket
