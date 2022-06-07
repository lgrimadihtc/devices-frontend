import { Menu } from './menu.model';

export const verticalMenuItems = [ 
    new Menu (1, 'ADMIN_NAV.DASHBOARD', '/', null, 'tachometer', null, false, 0),
    new Menu (40, 'Devices', null, null, 'file-text-o', null, true, 0),
   new Menu (43, 'Devices', '/device', null, 'asterisk', null, false, 40),    
   new Menu (44, 'Load Status', '/loadstatus', null, 'file', null, false, 40),    
]

export const horizontalMenuItems = [ 
    new Menu (1, 'ADMIN_NAV.DASHBOARD', '/', null, 'tachometer', null, false, 0),
    new Menu (40, 'ADMIN_NAV.PAGES', null, null, 'file-text-o', null, true, 0),
   new Menu (43, 'Devices', '/device', null, 'asterisk', null, false, 40), 
]