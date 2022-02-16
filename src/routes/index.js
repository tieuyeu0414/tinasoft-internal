const express = require('express');
const router = express();
const auth = require('../controllers/login/loginController')

const event = require('./../controllers/event/route')
router.use('/event', auth.checkLoginController, event)

const staff = require('../controllers/staffs/route')
router.use('/staff', auth.checkLoginController, staff)

const onsite_salary = require('../controllers/onsite_salary/route')
router.use('/onsite_salary', auth.checkLoginController, onsite_salary)

const overtime_salary = require('../controllers/overtime_salary/route')
router.use('/overtime_salary', auth.checkLoginController, overtime_salary)

const bonus_salary = require('../controllers/bonus_salary/route')
router.use('/bonus_salary', auth.checkLoginController, bonus_salary)

const project_salary = require('../controllers/project_salary/route')
router.use('/project_salary', auth.checkLoginController, project_salary)

const deduction_hour_late = require('../controllers/deduction_hour_late/route')
router.use('/deduction_hour_late', auth.checkLoginController, deduction_hour_late)

const deduction_day_off = require('../controllers/deduction_day_off/route')
router.use('/deduction_day_off', auth.checkLoginController, deduction_day_off)

const letterLeave = require('../controllers/letter_leave/route')
router.use('/letter_leave', auth.checkLoginController, letterLeave)

const login = require('../controllers/login/route')
router.use('/login', login)

const total_salary_month = require('../controllers/total_salary_month/route')
router.use('/total_salary_month', total_salary_month)

module.exports = router;
