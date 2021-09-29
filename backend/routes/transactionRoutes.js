import express from 'express'

import {protect,admin} from '../Middleware/authMiddleware.js'

import allTransactionsForOneUser from '../controllers/transactionControllers.js'

const router = express.Router()

//@ Fetch all transactions for a particular user
//@ /api/transaction
//@access Public

router.route('/transaction').get(allTransactionsForOneUser)


export default router