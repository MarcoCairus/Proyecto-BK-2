import  TicketModel  from "../models/ticket.model.js";
import { generateUniqueCode } from "../utils/generateCode.js";  


export class TicketDAO {
    async createTicket(amount, purchaser) {
        const code = generateUniqueCode(); 
        return await TicketModel.create({ code, amount, purchaser });
    }
}