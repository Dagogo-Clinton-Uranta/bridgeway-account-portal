import express from 'express'

import {protect,admin} from '../Middleware/authMiddleware.js'

import getAccountByAccountNumber from '../controllers/accountControllers.js'

import allTransactionsForOneUser from '../controllers/transactionControllers.js'

const router = express.Router()

//@ Fetch all users
//@ /api/accounts
//@access Public


router.route('/transactions').get(allTransactionsForOneUser)
//the transactions route must be above the :accountId route otherwise , transactions will be taken as an id

router.route('/:accountId').get(getAccountByAccountNumber)

export default router