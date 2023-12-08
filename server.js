const app = require('./src/app');
const port = process.env.PORT || '8080';

app.listen(port, async () => {
  console.log('Server running. Use our API on port: 8080');
});
