// Nicheflix - Local Media Streaming App

const mediaGrid = document.getElementById('mediaGrid');
const searchInput = document.getElementById('searchInput');
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');
const closeModal = document.getElementById('closeModal');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');
const heroPlayBtn = document.getElementById('heroPlayBtn');

// Supported video extensions
const videoExtensions = ['.mp4', '.mkv', '.webm', '.avi', '.mov', '.wmv', '.flv', '.m4v'];

// Media library (will be populated from media folder)
let mediaLibrary = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadMediaLibrary();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    closeModal.addEventListener('click', closeVideoModal);
    heroPlayBtn.addEventListener('click', () => {
        document.querySelector('.media-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
    });
    
    // Close modal when clicking outside
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
}

// Load media library from the media folder
async function loadMediaLibrary() {
    try {
        // Try to fetch media files from the server
        const response = await fetch('/api/media');
        if (response.ok) {
            mediaLibrary = await response.json();
        } else {
            // Fallback: try to scan media folder
            mediaLibrary = await scanMediaFolder();
        }
    } catch (error) {
        console.log('Using client-side media detection');
        mediaLibrary = await scanMediaFolder();
    }
    
    renderMediaGrid(mediaLibrary);
}

// Scan media folder (client-side fallback)
async function scanMediaFolder() {
    // This is a fallback for when there's no backend
    // In a real implementation, you'd have a server endpoint
    // For now, we'll return an empty array and show instructions
    return [];
}

// Render media grid
function renderMediaGrid(mediaItems) {
    if (mediaItems.length === 0) {
        mediaGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <h3>No media found</h3>
                <p>Add your video files to the "media" folder and refresh the page.</p>
                <p>Supported formats: MP4, MKV, WebM, AVI, MOV, WMV, FLV, M4V</p>
            </div>
        `;
        return;
    }
    
    mediaGrid.innerHTML = mediaItems.map(item => `
        <div class="media-item" data-title="${item.title.toLowerCase()}" onclick="playVideo('${item.path}', '${item.title}', '${item.description || ''}')">
            <div class="media-thumbnail">
                ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;">` : '🎬'}
            </div>
            <div class="media-info">
                <div class="media-title">${item.title}</div>
                <div class="media-meta">${item.year || 'Unknown'} • ${item.duration || 'Unknown'}</div>
            </div>
        </div>
    `).join('');
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMedia = mediaLibrary.filter(item => 
        item.title.toLowerCase().includes(searchTerm)
    );
    renderMediaGrid(filteredMedia);
}

// Play video
function playVideo(path, title, description) {
    videoPlayer.src = path;
    videoTitle.textContent = title;
    videoDescription.textContent = description || 'No description available';
    videoModal.classList.add('active');
    videoPlayer.play();
}

// Close video modal
function closeVideoModal() {
    videoModal.classList.remove('active');
    videoPlayer.pause();
    videoPlayer.src = '';
}
