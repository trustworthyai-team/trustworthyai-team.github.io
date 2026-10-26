import fs from 'node:fs/promises';
import path from 'node:path';
import * as cheerio from 'cheerio';
const files=(await fs.readdir('.')).filter(f=>f.endsWith('.html'));
const errors=[],external=new Set();let local=0;
for(const file of files){const $=cheerio.load(await fs.readFile(file,'utf8'));for(const el of $('a[href],img[src],link[href],script[src]').toArray()){
 const ref=$(el).attr('href')||$(el).attr('src');if(/^https?:/.test(ref)){external.add(ref);continue;}if(/^(mailto:|tel:)/.test(ref))continue;
 const [target,fragment]=ref.split('#');const name=target||file;
 try{await fs.access(path.resolve(name));local++;if(fragment&&name.endsWith('.html')){const doc=cheerio.load(await fs.readFile(name,'utf8'));if(!doc(`[id="${fragment}"]`).length)errors.push(`${file}: missing anchor ${ref}`);}}catch{errors.push(`${file}: missing ${ref}`);}
 }
 for(const el of $('img[srcset]').toArray())for(const v of $(el).attr('srcset').split(',')){const name=v.trim().split(' ')[0];try{await fs.access(name);}catch{errors.push(`${file}: missing responsive image ${name}`);}}
 if($('h1').length!==1)errors.push(`${file}: expected one h1`);
 for(const row of $('.publication,.news-row,.funding-entry').toArray())if(!$(row).find('.brand-logo img[src]').length)errors.push(`${file}: missing logo for ${$(row).find('h3').text()||$(row).text().slice(0,90)}`);
}
console.log(`${files.length} pages, ${local} local links and resources, ${external.size} external URLs. Internal errors: ${errors.length}`);
if(errors.length){console.log(errors);process.exitCode=1;}
await fs.mkdir('reports',{recursive:true});
if(process.argv.includes('--external')){
 const urls=[...external];const results=[];let next=0;
 async function worker(){while(next<urls.length){const url=urls[next++];try{const r=await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(25000),headers:{'User-Agent':'Mozilla/5.0 (compatible; LabWebsiteLinkCheck/1.0)'}});const type=r.headers.get('content-type');await r.body?.cancel();results.push({url,status:r.status,final:r.url,type});console.log(r.status,url);}catch(e){results.push({url,status:'unverified',reason:e.message});console.log('UNVERIFIED',url);}}}
 await Promise.all(Array.from({length:5},worker));
 await fs.writeFile('reports/external-links.json',JSON.stringify({checkedAt:new Date().toISOString(),results},null,2));
}
