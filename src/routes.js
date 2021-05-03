import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const LaporanJualBeli = React.lazy(() => import('./views/laporan/LaporanJualBeli'));
const LaporanHibah = React.lazy(() => import('./views/laporan/LaporanHibah'));
const LaporanTukarMenukar = React.lazy(() => import('./views/laporan/LaporanTukarMenukar'));
const LaporanAPHB = React.lazy(() => import('./views/laporan/LaporanAPHB'));
const LaporanAPHT = React.lazy(() => import('./views/laporan/LaporanAPHT'));
const LaporanNihil = React.lazy(() => import('./views/laporan/LaporanNihil'));



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/jualbeli', name: 'Laporan Jual Beli', component: LaporanJualBeli },
  { path: '/hibah', name: 'Hibah', component: LaporanHibah },
  { path: '/tukarmenukar', name: 'Tukar Menukar', component: LaporanTukarMenukar},
  { path: '/aphb', name: 'APHB', component: LaporanAPHB},
  { path: '/apht', name: 'APHT', component: LaporanAPHT},
  { path: '/nihil', name: 'Nihil', component: LaporanNihil},

 
];

export default routes;
