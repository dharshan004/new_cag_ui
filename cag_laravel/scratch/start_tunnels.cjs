const localtunnel = require('localtunnel');

(async () => {
  try {
    const rand = Math.floor(1000 + Math.random() * 9000);
    const frontendSub = `cag-portal-web-${rand}`;
    const backendSub = `cag-portal-api-${rand}`;

    console.log(`Starting LocalTunnels with subdomains: ${frontendSub}, ${backendSub}...`);
    const tunnel1 = await localtunnel({ port: 3000, subdomain: frontendSub });
    console.log(`Frontend Tunnel URL: ${tunnel1.url}`);

    const tunnel2 = await localtunnel({ port: 8000, subdomain: backendSub });
    console.log(`Backend Tunnel URL: ${tunnel2.url}`);

    tunnel1.on('close', () => {
      console.log('Frontend tunnel closed');
    });

    tunnel2.on('close', () => {
      console.log('Backend tunnel closed');
    });
  } catch (err) {
    console.error('Error starting tunnels:', err);
  }
})();
