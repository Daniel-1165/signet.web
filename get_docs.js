const https = require('https');

const projectId = 'et3ud76d';
const dataset = 'production';
const query = encodeURIComponent('*[_type in ["resourceCard", "resource", "post"]]');
const url = `https://${projectId}.api.sanity.io/vX/data/query/${dataset}?query=${query}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
        const json = JSON.parse(data);
        if (json.result) {
            console.log(JSON.stringify(json.result.map(d => ({ _id: d._id, _type: d._type, title: d.title, category: d.category, slug: d.slug })), null, 2));
        } else {
            console.log(json);
        }
    } catch(e) { console.error('Parse error', e, data); }
  });
}).on('error', console.error);
