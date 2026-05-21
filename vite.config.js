import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // PAGES HTML
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'src/pages/home.html'),
        menus: resolve(__dirname, 'src/pages/menus.html'),
        menusDetail: resolve(__dirname, 'src/pages/menus-detail.html'),
        order: resolve(__dirname, 'src/pages/order.html'),
        contact: resolve(__dirname, 'src/pages/contact.html'),
        cgv: resolve(__dirname, 'src/pages/cgv.html'),
        mentions: resolve(__dirname, 'src/pages/mentions.html'),
        404: resolve(__dirname, 'src/pages/404.html'),
        signin: resolve(__dirname, 'src/pages/users/signin.html'),
        signup: resolve(__dirname, 'src/pages/users/signup.html'),
        userSpace: resolve(__dirname, 'src/pages/users/userSpace.html'),
        editPassword: resolve(__dirname, 'src/pages/users/editPassword.html'),
        modifyUserinfo: resolve(__dirname, 'src/pages/users/modifyUserinfo.html'),
        adminSpace: resolve(__dirname, 'src/pages/admin/adminSpace.html'),
        stats: resolve(__dirname, 'src/pages/admin/stats.html'),
        usersHTML: resolve(__dirname, 'src/pages/admin/users.html'),
        employeSpace: resolve(__dirname, 'src/pages/employe/employeSpace.html'),

        // SCRIPTS JS
        scriptMenus: resolve(__dirname, 'src/assets/js/menus.js'),
        scriptMenusData: resolve(__dirname, 'src/assets/js/menus-data.js'),
        scriptMenusDetail: resolve(__dirname, 'src/assets/js/menus-detail.js'),
        scriptAuth: resolve(__dirname, 'src/assets/js/auth.js'),
        scriptUserSpace: resolve(__dirname, 'src/assets/js/userSpace.js'),
        scriptMateriel: resolve(__dirname, 'src/assets/js/materiel.js'),
        scriptUsers: resolve(__dirname, 'src/assets/js/users.js'),
        scriptStats: resolve(__dirname, 'src/assets/js/stats.js'),
        scriptOrder: resolve(__dirname, 'src/assets/js/order.js')
      }
    }
  }
});