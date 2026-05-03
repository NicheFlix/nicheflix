# Nicheflix

Your personal local media streaming service. Stream your movies and videos over your local WiFi network with a Netflix-like interface.

## Features

- 🎬 **Modern UI**: Clean, Netflix-inspired interface
- 🔍 **Search**: Quickly find movies in your library
- 📺 **Video Player**: Built-in HTML5 video player
- 🌐 **Local Network**: Access from any device on your WiFi
- � **Auto-Discovery**: Automatically scans your media folder
- 📱 **Responsive**: Works on desktop, tablet, and mobile

## Project Structure

```
nicheflix/
├── index.html      # Main HTML page
├── styles.css      # Styling and UI
├── app.js          # Frontend JavaScript
├── server.js       # Node.js server
├── package.json    # Dependencies
├── media/          # Put your video files here
└── README.md       # This file
```

## Setup Instructions

### Prerequisites

- Node.js installed on your computer
- Video files you want to stream

### Installation

1. **Navigate to the project directory**
   ```bash
   cd C:\Users\nuvii\CascadeProjects\nicheflix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your media files**
   - Place your video files in the `media` folder
   - Supported formats: MP4, MKV, WebM, AVI, MOV, WMV, FLV, M4V

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   - Go to: `http://localhost:3000`
   - Or access from other devices on your WiFi using your computer's IP address

## Accessing from Other Devices

To watch on other devices (phone, tablet, smart TV) on your WiFi:

1. Find your computer's local IP address:
   - Windows: Open Command Prompt and run `ipconfig`
   - Look for "IPv4 Address" (e.g., 192.168.1.100)

2. On your other device, open a browser and go to:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   Example: `http://192.168.1.100:3000`

## Supported Video Formats

- MP4
- MKV
- WebM
- AVI
- MOV
- WMV
- FLV
- M4V

## Usage

- **Browse**: Scroll through your media library
- **Search**: Use the search bar to find specific movies
- **Play**: Click on any movie to start watching
- **Close**: Press Escape or click outside the video to close the player

## Troubleshooting

**Videos not appearing?**
- Make sure video files are in the `media` folder
- Check that the file extensions are supported
- Refresh the page after adding new files

**Can't access from other devices?**
- Make sure your device is on the same WiFi network
- Check that Windows Firewall allows Node.js
- Try temporarily disabling firewall to test

**Server won't start?**
- Make sure port 3000 is not in use
- Check that Node.js is installed: `node --version`
- Try running with a different port by editing `server.js`

## Customization

**Change the port:**
Edit `server.js` and change `const PORT = 3000;` to your desired port.

**Change the media folder:**
Edit `server.js` and change `const MEDIA_DIR = path.join(__dirname, 'media');` to your preferred path.

## License

MIT

## Enjoy your personal streaming service! 🍿
