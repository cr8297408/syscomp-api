const ClientComponent = require('./client');
const UserComponent = require('../shared/modules/user');
const AuthComponent = require('../shared/modules/auth');
const CostCenterComponent = require('./cost-center');
const NodeComponent = require('./node');
const LicenseComponent = require('./license');
const FactureComponent = require('./facture');
const PaymentComponent = require('./payment');
const ItemComponent = require('./item');
const EventComponent = require('../shared/modules/event');


module.exports = {
  ClientComponent,
  UserComponent,
  AuthComponent,
  CostCenterComponent,
  NodeComponent,
  LicenseComponent,
  FactureComponent,
  PaymentComponent,
  ItemComponent,
  EventComponent
}