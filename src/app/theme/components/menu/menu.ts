import { Menu } from './menu.model';

export const verticalMenuItems = [ 
    new Menu (1, 'Product', '/', null, 'file-text-o', null, false, 0),
    new Menu (40, 'Sales', null, null, 'file-text-o', null, false, 0),

]

export const horizontalMenuItems = [ 
    new Menu (1, 'ADMIN_NAV.DASHBOARD', '/', null, 'tachometer', null, false, 0),
    new Menu (40, 'ADMIN_NAV.PAGES', null, null, 'file-text-o', null, true, 0),
   new Menu (43, 'Devices', '/device', null, 'asterisk', null, false, 40), 
]