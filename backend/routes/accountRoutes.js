import express from 'express'

import {protect,admin} from '../Middleware/authMiddleware.js'

import getAccountByAccountNumber from '../controllers/accountControllers.js'

import allTransactionsForOneUser from '../controllers/transactionControllers.js'
import {userSpecificMessages,allUnseenMessages,messageAlertOff} from '../controllers/messageControllers.js'

const router = express.Router()

//@ Fetch all users
//@ /api/accounts
//@access Public

// all routes must be above the :accountId route otherwise , transactions will be taken as an id
router.route('/transactions').get(allTransactionsForOneUser)
router.route('/messages').get(userSpecificMessages).post(messageAlertOff)

router.route('/newmessagelist').get(allUnseenMessages)
router.route('/:accountId').get(getAccountByAccountNumber)

export default router