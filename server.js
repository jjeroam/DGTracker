import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import url from 'url';

const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {

})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})