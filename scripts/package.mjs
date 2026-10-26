import fs from 'node:fs/promises';
await fs.mkdir('_site/assets/images',{recursive:true});
for(const name of await fs.readdir('.'))if(/\.(html|svg|xml|txt)$/.test(name)||name==='.nojekyll')await fs.copyFile(name,`_site/${name}`);
for(const name of ['style.css','site.js'])await fs.copyFile(`assets/${name}`,`_site/assets/${name}`);
await fs.cp('assets/images','_site/assets/images',{recursive:true});
console.log('GitHub Pages artifact prepared in _site/');
