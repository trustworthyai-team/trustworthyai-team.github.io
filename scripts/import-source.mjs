import fs from 'node:fs/promises';
import * as cheerio from 'cheerio';
import sharp from 'sharp';
import crypto from 'node:crypto';
const base='https://sites.google.com/view/mlpa/mainpage';
const pages=['home','research-area','members','papers','news','activities','news/wsu23-cs-awards'];
const content={}; const assets=[]; const seen=new Map();
await fs.mkdir('assets/originals',{recursive:true});
await fs.mkdir('assets/images',{recursive:true});
function cleanLink(href){
 if(!href)return null;
 if(href.startsWith('https://www.google.com/url?')||href.includes('safelinks.protection.outlook.com')) return new URL(href).searchParams.get('url')||new URL(href).searchParams.get('q')||href;
 return href.startsWith('/')?new URL(href,'https://sites.google.com').href:href;
}
async function asset(src,page){
 if(!src||!src.startsWith('https://sites.google.com/sitesv-images'))return null;
 const key=src.replace(/=w\d+.*$/,'');
 if(seen.has(key))return seen.get(key);
 const name=`${page.replaceAll('/','-')}-${crypto.createHash('sha256').update(key).digest('hex').slice(0,10)}`;
 const local=`assets/images/${name}.webp`; seen.set(key,local);
 try{
  const r=await fetch(src); if(!r.ok)throw Error(r.status);
  const buf=Buffer.from(await r.arrayBuffer()); const meta=await sharp(buf).metadata();
  const original=`assets/originals/${name}.${meta.format==='jpeg'?'jpg':meta.format}`;
  await fs.writeFile(original,buf);
  await sharp(buf).rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:86}).toFile(local);
  await sharp(buf).rotate().resize({width:640,withoutEnlargement:true}).webp({quality:82}).toFile(local.replace('.webp','-640.webp'));
  assets.push({source:src,local,original,width:meta.width,height:meta.height,page});
  return local;
 }catch(e){seen.delete(key); console.error('Image failed',name,e.message);return null;}
}
for(const page of pages){
 const url=page==='home'?base:`${base}/${page}`;
 const filename=`source/${page.replaceAll('/','-')}.html`;
 let html; try{html=await fs.readFile(filename,'utf8');}catch{const r=await fetch(url);if(!r.ok)throw Error(`${url}: ${r.status}`);html=await r.text();await fs.writeFile(filename,html);}
 const $=cheerio.load(html); const sections=[];
 for(const s of $('section').toArray()){
  const blocks=[];
  for(const b of $(s).find('.tyJCtd').toArray()){
   const text=$(b).text().replace(/\u00a0/g,' ').trim();
   const paragraphs=$(b).find('h1,h2,h3,p,li').filter((i,e)=>!$(e).parents('li').length).map((i,e)=>({tag:e.tagName,text:$(e).text().replace(/\u00a0/g,' ').trim(),html:$(e).html()})).get().filter(x=>x.text);
   const links=$(b).find('a[href]').map((i,e)=>({text:$(e).text().trim(),url:cleanLink($(e).attr('href'))})).get().filter(x=>x.text&&x.url&&!x.url.startsWith('#'));
   const images=[];for(const img of $(b).find('img').toArray()){const local=await asset($(img).attr('src'),page);if(local)images.push(local);}
   if(text||images.length)blocks.push({text,paragraphs,links,images});
  }
  const background=$(s).find('[style*="background-image"]').attr('style')?.match(/url\(([^)]+)\)/)?.[1];
  if(background)await asset(background,page);
  if(blocks.length)sections.push(blocks);
 }
 content[page]={url,sections};
 console.log(page,sections.length,'sections');
}
await fs.writeFile('source/content.json',JSON.stringify(content,null,2));
await fs.writeFile('source/asset-manifest.json',JSON.stringify(assets,null,2));
console.log('Downloaded',assets.length,'unique originals');
