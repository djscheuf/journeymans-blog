#!/usr/bin/env node

const fs = require('fs');
const https = require('https');

const API_BASE = 'https://connect.mailerlite.com/api';
const API_TOKEN = process.env.MAILERLITE_API_KEY;

if (!API_TOKEN) {
  console.error('Error: MAILERLITE_API_KEY environment variable not set');
  process.exit(1);
}

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_BASE);
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(json);
          } else {
            reject(new Error(`API Error ${res.statusCode}: ${JSON.stringify(json)}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${body}`));
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function listCampaigns(limit = 10) {
  const response = await makeRequest('GET', `/campaigns?limit=${limit}`);
  return response.data;
}

async function getCampaign(campaignId) {
  const response = await makeRequest('GET', `/campaigns/${campaignId}`);
  return response.data;
}

async function createCampaign(campaignData) {
  const response = await makeRequest('POST', '/campaigns', campaignData);
  return response.data;
}

async function updateCampaign(campaignId, campaignData) {
  const response = await makeRequest('PUT', `/campaigns/${campaignId}`, campaignData);
  return response.data;
}

const command = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  try {
    switch (command) {
      case 'list':
        const limit = args[0] || 10;
        const campaigns = await listCampaigns(limit);
        campaigns.forEach(c => {
          console.log(`${c.id} | ${c.status.padEnd(8)} | ${c.name}`);
        });
        break;

      case 'get':
        if (!args[0]) {
          console.error('Usage: mailerlite-api.js get <campaign_id>');
          process.exit(1);
        }
        const campaign = await getCampaign(args[0]);
        console.log(JSON.stringify(campaign, null, 2));
        break;

      case 'create':
        if (!args[0]) {
          console.error('Usage: mailerlite-api.js create <campaign_json_file>');
          process.exit(1);
        }
        const createData = JSON.parse(fs.readFileSync(args[0], 'utf8'));
        const created = await createCampaign(createData);
        console.log('Campaign created successfully!');
        console.log(`ID: ${created.id}`);
        console.log(`Status: ${created.status}`);
        console.log(`Dashboard: https://dashboard.mailerlite.com/campaigns/${created.id}`);
        break;

      case 'extract-html':
        if (!args[0]) {
          console.error('Usage: mailerlite-api.js extract-html <campaign_id> [output_file]');
          process.exit(1);
        }
        const htmlCampaign = await getCampaign(args[0]);
        const html = htmlCampaign.emails[0].content;
        const outputFile = args[1] || 'campaign-template.html';
        fs.writeFileSync(outputFile, html);
        console.log(`HTML extracted to: ${outputFile}`);
        console.log(`Length: ${html.length} characters`);
        break;

      default:
        console.log('MailerLite API Helper');
        console.log('');
        console.log('Usage:');
        console.log('  mailerlite-api.js list [limit]');
        console.log('  mailerlite-api.js get <campaign_id>');
        console.log('  mailerlite-api.js create <campaign_json_file>');
        console.log('  mailerlite-api.js extract-html <campaign_id> [output_file]');
        console.log('');
        console.log('Environment Variables:');
        console.log('  MAILERLITE_API_KEY - Your MailerLite API token (required)');
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
