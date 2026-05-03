const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000

const MEDIA_DIR = path.join(__dirname, 'media');

// Middleware
app.use(express.static(__dirname));
app.use('/media', express.static(MEDIA_DIR));

// API endpoint to get media files
app.get('/api/media', (req, res) => {
    try {
        if (!fs.existsSync(MEDIA_DIR)) {
            return res.json([]);
        }

        const files = fs.readdirSync(MEDIA_DIR);
        const videoExtensions = ['.mp4', '.mkv', '.webm', '.avi', '.mov', '.wmv', '.flv', '.m4v'];
        
        const mediaFiles = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return videoExtensions.includes(ext);
            })
            .map(file => {
                const stats = fs.statSync(path.join(MEDIA_DIR, file));
                const title = path.basename(file, path.extname(file));
                
                return {
                    title: title.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    path: `/media/${file}`,
                    description: `File size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`,
                    year: new Date(stats.mtime).getFullYear().toString(),
                    duration: 'Unknown'
                };
            });

        res.json(mediaFiles);
    } catch (error) {
        console.error('Error reading media directory:', error);
        res.status(500).json({ error: 'Failed to read media directory' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🎬 Nicheflix is running!`);
    console.log(`📡 Access it at: http://localhost:${PORT}`);
    console.log(`� Media folder: ${MEDIA_DIR}`);
    console.log(`\nAdd your video files to the 'media' folder and they'll appear in the library.\n`);
});
