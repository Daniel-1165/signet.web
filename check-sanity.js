const { createClient } = require('@sanity/client');
require('dotenv').config({ path: 'c:/users/Daniel/signet-web/.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-04-07',
  useCdn: false,
});

async function main() {
  const data = await client.fetch(`*[_type == "resourceCard"] { _id, title, category, _type }`);
  console.log('Sanity data:', data);
}

main().catch(console.error);
