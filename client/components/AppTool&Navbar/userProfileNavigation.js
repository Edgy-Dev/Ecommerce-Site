import {logout} from '../../store/actions/user'

export default [
  {
    id: 1,
    label: 'Orders',
    icon: 'shopping_cart',
    to: '/account/orders'
  },
  {
    id: 2,
    label: 'Account Settings',
    icon: 'account_circle',
    to: '/account'
  },
  {
    id: 5,
    label: 'Logout',
    icon: 'power_settings_new',
    to: '',
    dispatcher: logout
  }
]

// OB/JD
/*
<NavItem
  id={5}
  label={'Logout'}
  icon={'power_settings_new'}
  to={''} />
*/
