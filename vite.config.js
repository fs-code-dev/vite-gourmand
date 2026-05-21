import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'src/pages/home.html'),
        menus: resolve(__dirname, 'src/pages/menus.html'),
        menusDetail: resolve(__dirname, 'src/pages/menus-detail.html'),
        order: resolve(__dirname, 'src/pages/order.html'),
        contact: resolve(__dirname, 'src/pages/contact.html'),
        cgv: resolve(__dirname, 'src/pages/cgv.html'),
        mentions: resolve(__dirname, 'src/pages/mentions.html'),
        404: resolve(__dirname, 'src/pages/404.html'),
        
        // Dossier : users
        signin: resolve(__dirname, 'src/pages/users/signin.html'),
        signup: resolve(__dirname, 'src/pages/users/signup.html'),
        userSpace: resolve(__dirname, 'src/pages/users/userSpace.html'),
        editPassword: resolve(__dirname, 'src/pages/users/editPassword.html'),
        modifyUserinfo: resolve(__dirname, 'src/pages/users/modifyUserinfo.html'),
        
        // Dossier : admin
        adminSpace: resolve(__dirname, 'src/pages/admin/adminSpace.html'),
        stats: resolve(__dirname, 'src/pages/admin/stats.html'),
        users: resolve(__dirname, 'src/pages/admin/users.html'),
        
        // Dossier : employe
        employeSpace: resolve(__dirname, 'src/pages/employe/employeSpace.html'),
      }
    }
  }
});