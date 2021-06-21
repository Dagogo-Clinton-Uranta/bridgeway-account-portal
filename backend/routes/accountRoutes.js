import express from 'express'

import {protect,admin} from '../Middleware/authMiddleware.js'

import getAccountByAccountNumber from '../controllers/accountControllers.js'

const router = express.Router()

//@ Fetch all users
//@ /api/accounts
//@access Public

router.route('/:accountId').get(getAccountByAccountNumber)


export default router