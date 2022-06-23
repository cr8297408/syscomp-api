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
const ReportTypeComponent = require('../shared/modules/report-type');
const SupportTicketComponent = require('../shared/modules/support-ticket');


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
  EventComponent,
  ReportTypeComponent,
  SupportTicketComponent
}