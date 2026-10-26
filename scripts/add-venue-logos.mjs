import fs from 'node:fs/promises';
import sharp from 'sharp';
const sources=[
 {key:'MICCAI',name:'MICCAI Society',page:'https://www.miccai.org/',url:'https://miccai.org/wp-content/themes/miccai/images/miccai-logo.png'},
 {key:'IJCAI',name:'International Joint Conferences on Artificial Intelligence',page:'https://ijcai.org/',url:'https://ijcai.org/wp-content/themes/ijcai/assets/img/logo.svg',tone:'ink',note:'Official reversed mark rendered in monochrome for the light page background.'},
 {key:'IJCNN-2025',name:'International Joint Conference on Neural Networks 2025',page:'https://2025.ijcnn.org/',url:'https://confcats-siteplex.s3.us-east-1.amazonaws.com/ijcnn25/thumbnail_ijcnn25_logo_color_02_639e9da0d2.png'},
 {key:'IJCNN',name:'International Neural Network Society, IJCNN co-organizer',page:'https://www.inns.org/past-ijcnn-conferences',url:'https://www.inns.org/assets/site/logo.png',note:'The 2022 conference site blocks retrieval. Use the official co-organizer mark, explicitly identified, rather than a different conference year.'},
 {key:'ECCV',name:'European Conference on Computer Vision 2024',page:'https://www.amazon.science/conferences-and-events/eccv-2024',url:"https://cdn.amazon.science/dims4/default/e11a30d/2147483647/strip/true/crop/602x308+0+0/resize/326x167!/quality/90/?url=https%3A%2F%2Famzn-science-production-science.s3.us-east-1.amazonaws.com%2Fscience%2Fdf%2Fd5%2F9e41923e49b0a8ebfd7f78bfd780%2Feccv-2024.png",note:'2024 mark from conference participant Amazon Science. The current conference archive navigation incorrectly serves a 2026 image, which is not used.'},
 {key:'CHI',name:'ACM CHI Conference on Human Factors in Computing Systems 2024',page:'https://chi2024.acm.org/',url:'https://chi2024.acm.org/wp-content/uploads/2023/10/cropped-cropped-chi24_favicon-192x192.png'},
 {key:'TheWebConf',name:'ACM The Web Conference 2024',page:'https://www2024.thewebconf.org/',url:'https://www2024.thewebconf.org/img/logos/theWebConf2024-logo.png'},
 {key:'ECML',name:'European Conference on Machine Learning and Principles and Practice of Knowledge Discovery in Databases',page:'https://ecmlpkdd.org/',url:'https://ecmlpkdd.org/_next/static/media/ecml-pkdd.93f4d432.svg'},
 {key:'AdvML@ICML',name:'ICML, host conference for the AdvML workshop',page:'https://icml.cc/Conferences/2022',url:'https://icml.cc/static/core/img/ICML-logo.svg',note:'Official host-conference mark for the AdvML workshop publication.'},
 {key:'DMKD',name:'Springer, publisher of Data Mining and Knowledge Discovery',page:'https://link.springer.com/journal/10618',url:'https://link.springer.com/oscar-static/images/logo-springer-white-960529c121.svg',tone:'ink',note:'Publisher mark, explicitly identified; the journal does not expose a separate logo. Reversed mark rendered in monochrome for the light background.'},
 {key:'ISBI',name:'IEEE International Symposium on Biomedical Imaging 2021',page:'https://biomedicalimaging.org/2021/',url:'https://biomedicalimaging.org/2021/wp-content/uploads/sites/61/2020/04/LogoIEEE.2021.112.png',tone:'ink',note:'Official reversed header mark rendered in monochrome for the light page background.'}
];
const brands=JSON.parse(await fs.readFile('source/brands.json'));
const manifest=JSON.parse(await fs.readFile('source/asset-manifest.json'));
for(const source of sources){
 const slug=source.key.toLowerCase().replaceAll('@','-');const image=`assets/images/venue-${slug}.webp`;
 const r=await fetch(source.url,{signal:AbortSignal.timeout(25000)});if(!r.ok)throw Error(`${source.key}: ${r.status}`);
 const bytes=Buffer.from(await r.arrayBuffer());const meta=await sharp(bytes).metadata();
 const original=`assets/originals/venue-${slug}.${meta.format==='jpeg'?'jpg':meta.format}`;
 await fs.writeFile(original,bytes);
 await sharp(bytes,{density:192}).resize({width:640,withoutEnlargement:meta.format!=='svg'}).webp({quality:94}).toFile(image);
 await fs.copyFile(image,image.replace('.webp','-640.webp'));
 const output=await sharp(image).metadata();
 brands[source.key]={name:source.name,image,sourcePage:source.page,sourceAsset:source.url,...(source.tone?{tone:source.tone}:{}),...(source.note?{note:source.note}:{})};
 const record={source:source.url,local:image,original,width:output.width,height:output.height,page:source.page};
 const index=manifest.findIndex(m=>m.local===image);if(index<0)manifest.push(record);else manifest[index]=record;
 console.log(source.key,output.width,output.height);
}
await fs.writeFile('source/brands.json',JSON.stringify(brands,null,2)+'\n');
await fs.writeFile('source/asset-manifest.json',JSON.stringify(manifest,null,2)+'\n');
