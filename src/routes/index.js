const express = require('express')
const router = express.Router();
const ClientRouter = require('./client');
const UserRouter = require('./user');
const AuthRouter = require('./auth');
const PaginationRouter = require('./pagination');
const CostCenterRouter = require('./cost-center');
const NodeRouter = require('./node')

router.use('/v1/clients', ClientRouter);
router.use('/v1/users', UserRouter);
router.use('/v1/auth', AuthRouter);
router.use('/v1/pagination', PaginationRouter);
router.use('/v1/costCenters', CostCenterRouter);
router.use('/v1/nodes', NodeRouter)

module.exports = router;