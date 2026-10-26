import fs from 'node:fs/promises';
import * as cheerio from 'cheerio';
const urls=process.argv.slice(2);
const results=await Promise.all(urls.map(async url=>{
 try{const r=await fetch(url,{signal:AbortSignal.timeout(20000)});const html=await r.text();const $=cheerio.load(html);const images=$('img').map((i,e)=>({alt:$(e).attr('alt')||'',src:$(e).attr('src')})).get().filter(x=>x.src).map(x=>({...x,src:new URL(x.src,r.url).href}));const links=$('link[rel="icon"],link[rel="shortcut icon"]').map((i,e)=>({rel:$(e).attr('rel'),href:new URL($(e).attr('href'),r.url).href})).get();return{url,final:r.url,status:r.status,images:images.filter(x=>/logo|brand|miccai|eccv|ecml|chi2024|www2024|isbi|springer/i.test(x.src+' '+x.alt)).slice(0,20),icons:links};}catch(e){return{url,error:e.message};}
}));
let prior=[];try{prior=JSON.parse(await fs.readFile('source/logo-discovery.json'));}catch{}
await fs.writeFile('source/logo-discovery.json',JSON.stringify([...prior,...results],null,2));
console.log(JSON.stringify(results,null,2));
