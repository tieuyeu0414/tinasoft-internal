const express = require('express');
const router = express();
const auth = require('../models/login')

const event = require('./../controllers/event/route')
router.use('/event', event)

const staff = require('../controllers/staffs/route')
router.use('/staff', auth.checkLogin, staff)

const onsite_salary = require('../controllers/onsite_salary/route')
router.use('/onsite_salary', onsite_salary)

const overtime_salary = require('../controllers/overtime_salary/route')
router.use('/overtime_salary', overtime_salary)

const bonus_salary = require('../controllers/bonus_salary/route')
router.use('/bonus_salary', bonus_salary)

const project_salary = require('../controllers/project_salary/route')
router.use('/project_salary', project_salary)

const deduction_hour_late = require('../controllers/deduction_hour_late/route')
router.use('/deduction_hour_late', deduction_hour_late)

const deduction_day_off = require('../controllers/deduction_day_off/route')
router.use('/deduction_day_off', deduction_day_off)

const letterLeave = require('../controllers/letter_leave/route')
router.use('/letter_leave', letterLeave)

const login = require('../controllers/login/route')
router.use('/login', login)

module.exports = router;
