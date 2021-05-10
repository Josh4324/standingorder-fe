import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const StandingOrderForm = React.lazy(() => import('./views/standingorderform/StandingOrderForm'));
const StandingOrder = React.lazy(() => import('./views/standingorder/StandingOrder'));
const AllTransactions = React.lazy(() => import('./views/transaction/AllTransactions'));
const Transactions = React.lazy(() => import('./views/transaction/Transaction'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const PendingStandingOrder = React.lazy(() => import('./views/standingorder/PendingStandingOrder'));
const ApprovedStandingOrder = React.lazy(() => import('./views/standingorder/ApprovedStandingOrder'));
const DeclinedStandingOrder = React.lazy(() => import('./views/standingorder/DeclinedStandingOrder'));
const DeactivatedStandingOrder = React.lazy(() => import('./views/standingorder/DeactivatedStandingOrder'));
const CancelledStandingOrder = React.lazy(() => import('./views/standingorder/CancelledStandingOrder'));

const AllPendingStandingOrder = React.lazy(() => import('./views/standingorder/AllPendingStandingOrder'));
const AllApprovedStandingOrder = React.lazy(() => import('./views/standingorder/AllApprovedStandingOrder'));
const AllDeclinedStandingOrder = React.lazy(() => import('./views/standingorder/AllDeclinedStandingOrder'));
const AllDeactivatedStandingOrder = React.lazy(() => import('./views/standingorder/AllDeactivatedStandingOrder'));
const AllCancelledStandingOrder = React.lazy(() => import('./views/standingorder/AllCancelledStandingOrder'));

const AdminPendingStandingOrder = React.lazy(() => import('./views/standingorder/AdminPendingStandingOrder'));
const AdminApprovedStandingOrder = React.lazy(() => import('./views/standingorder/AdminApprovedStandingOrder'));
const AdminDeclinedStandingOrder = React.lazy(() => import('./views/standingorder/AdminDeclinedStandingOrder'));
const AdminCancelledStandingOrder = React.lazy(() => import('./views/standingorder/AdminCancelledStandingOrder'));
const AdminStandingOrder = React.lazy(() => import('./views/standingorder/AdminStandingOrder'));
const AdminTransactions = React.lazy(() => import('./views/transaction/AdminTransactions'));






const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/standingorder/pending', name: 'Pending Standing Order', component: PendingStandingOrder },
  {path: '/standingorder/approved', name: 'Approved Standing order', component: ApprovedStandingOrder },
  {path: '/standingorder/declined', name: 'Declined Standing order', component: DeclinedStandingOrder },
  {path: '/standingorder/deactivated', name: 'Deactivated Standing order', component: DeactivatedStandingOrder },
  {path: '/standingorder/cancelled', name: 'Cancelled Standing order', component: CancelledStandingOrder },

  { path: '/standingorder/adminpending', name: 'All Pending Standing Order', component: AdminPendingStandingOrder },
  {path: '/standingorder/adminapproved', name: 'All Approved Standing order', component: AdminApprovedStandingOrder },
  {path: '/standingorder/admindeclined', name: 'All Declined Standing order', component: AdminDeclinedStandingOrder },
  {path: '/standingorder/admincancelled', name: 'All Cancelled Standing order', component: AdminCancelledStandingOrder },
  {path: '/standingorder/admin', name: 'All Standing order', component: AdminStandingOrder },
  {path: '/transactions/admin', name: 'All Transactions', component: AdminTransactions },

  { path: '/standingorder/allpending', name: 'All Pending Standing Order', component: AllPendingStandingOrder },
  {path: '/standingorder/allapproved', name: 'All Approved Standing order', component: AllApprovedStandingOrder },
  {path: '/standingorder/alldeclined', name: 'All Declined Standing order', component: AllDeclinedStandingOrder },
  {path: '/standingorder/alldeactivated', name: 'All Deactivated Standing order', component: AllDeactivatedStandingOrder },
  {path: '/standingorder/allcancelled', name: 'All Cancelled Standing order', component: AllCancelledStandingOrder },

  { path: '/standorder', name: 'Standing Order Form', component: StandingOrderForm },
  { path: '/standingorder', name: 'Standing Order', component: StandingOrder },
  { path: '/transactions', name: 'Transactions', component: Transactions },
  { path: '/alltransactions', name: 'All Transactions', component: AllTransactions },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
