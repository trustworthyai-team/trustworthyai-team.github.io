import fs from 'node:fs/promises';
import sharp from 'sharp';
const c=JSON.parse(await fs.readFile('source/content.json'));
for(const [p,d] of Object.entries(c))console.log('\nPAGE',p,JSON.stringify(d.sections.map((s,i)=>({i,blocks:s.map(b=>({t:b.text.slice(0,130),im:b.images,l:b.links}))})),null,1));
const a=JSON.parse(await fs.readFile('source/asset-manifest.json'));
const width=1000, cellW=200, cellH=160;
const tiles=[];
for(let i=0;i<a.length;i++){
 const x=(i%5)*cellW,y=Math.floor(i/5)*cellH;
 const tile=await sharp(a[i].local).resize(190,125,{fit:'contain',background:'#eee'}).png().toBuffer();
 tiles.push({input:tile,left:x,top:y});
 const label=Buffer.from(`<svg width="200" height="30"><text x="4" y="14" font-size="11">${i}: ${a[i].local.split('/').pop()}</text></svg>`);
 tiles.push({input:label,left:x,top:y+126});
}
await sharp({create:{width,height:Math.ceil(a.length/5)*cellH,channels:3,background:'#fff'}}).composite(tiles).png().toFile('source/contact-sheet.png');
