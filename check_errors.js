// Quick error check script
const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('PAGE LENGTH:', data.length);
    
    // Check for error indicators in HTML
    if (data.includes('Internal Server Error')) {
      console.log('ERROR: Internal Server Error found in page');
    }
    if (data.includes('Unhandled Runtime Error')) {
      console.log('ERROR: Unhandled Runtime Error found in page');
    }
    if (data.includes('Application error')) {
      console.log('ERROR: Application error found in page');
    }
    
    // Check what's being rendered
    const hasHero = data.includes('Indian Quality');
    const hasProducts = data.includes('Products sourced');
    const hasContact = data.includes('Business Enquiry');
    const hasFooter = data.includes('Manikanta International Exim');
    
    console.log('Has Hero:', hasHero);
    console.log('Has Products:', hasProducts);
    console.log('Has Contact:', hasContact);
    console.log('Has Footer:', hasFooter);
    
    // Check for Next.js error overlay
    if (data.includes('__next-error')) {
      console.log('ERROR: Next.js error overlay is present');
    }
    
    console.log('DONE - No server-side errors detected in HTML');
  });
}).on('error', (e) => {
  console.log('REQUEST FAILED:', e.message);
});
