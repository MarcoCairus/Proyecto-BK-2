import { TicketDAO } from "../daos/tickets.dao.js";

const ticketDAO = new TicketDAO();

export class TicketRepository {
    async generateTicket(amount, purchaser) {
        return await ticketDAO.createTicket(amount, purchaser);
    }
}