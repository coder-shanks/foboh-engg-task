import {
  DashboardIcon,
  OrdersIcon,
  CustomersIcon,
  ProductsIcon,
  PricingIcon,
  FreightIcon
} from './components/Icons'

const MENU_ITEMS = [
  { name: 'Dashboard', icon: <DashboardIcon /> },
  { name: 'Orders', icon: <OrdersIcon /> },
  { name: 'Customers', icon: <CustomersIcon /> },
  { name: 'Products', icon: <ProductsIcon /> },
  { name: 'Pricing', icon: <PricingIcon />, isNew: true },
  { name: 'Freight', icon: <FreightIcon />, isNew: true }
]

export default MENU_ITEMS
