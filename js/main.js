const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadingDiv = document.getElementById('loadingDiv');
const errorDiv = document.getElementById('errorDiv');
const resultsContainer = document.getElementById('resultsContainer');
const errorMessage = document.getElementById('errorMessage')

// Giphy API configuration
const GIPHY_API_KEY = 'lfDWTShdTZFf7nYHuIzOEUsQlgdrnEwY' // Replace with your actual API key
const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/search';

// For demo purposes, we'll use mock data with static placeholder images
const mockWatchData = [
    {
        id: '1',
        images: { fixed_height: { url: 'https://via.placeholder.com/300x250/1a1a2e/ffd700?text=Luxury+Gold+Watch' } },
        title: 'Luxury gold watch with leather strap',
        username: 'Designer Collection',
        alt_text: 'Elegant luxury timepiece with premium gold finish'
    },
    {
        id: '2',
        images: { fixed_height: { url: 'https://via.placeholder.com/300x250/2c3e50/ecf0f1?text=Smart+Watch' } },
        title: 'Modern smartwatch with digital display',
        username: 'Tech Watches',
        alt_text: 'State-of-the-art smartwatch with premium materials'
    },
    {
        id: '3',
        images: { fixed_height: { url: 'https://via.placeholder.com/300x250/34495e/bdc3c7?text=Classic+Vintage' } },
        title: 'Classic vintage watch with metal bracelet',
        username: 'Vintage Timepieces',
        alt_text: 'Timeless classic with sophisticated design'
    },
    {
        id: '4',
        images: { fixed_height: { url: 'https://via.placeholder.com/300x250/c0392b/ffffff?text=Sport+Chronograph' } },
        title: 'Sporty chronograph watch',
        username: 'Sports Collection',
        alt_text: 'Professional chronograph for active lifestyles'
    },
    {
        id: '5',
        images: { fixed_height: { url: 'https://via.placeholder.com/300x250/8e44ad/ffffff?text=Dress+Watch' } },
        title: 'Elegant dress watch with leather band',
        username: 'Formal Collection',
        alt_text: 'Sophisticated dress watch for special occasions'
    },
    {
        id: '6',
        images: { fixed_height: { url: 'https://via.placeholder.com/300x250/27ae60/ffffff?text=Minimalist+Design' } },
        title: 'Minimalist modern watch design',
        username: 'Modern Designs',
        alt_text: 'Clean, minimalist design for contemporary style'
    }
];

async function searchWatches(query) {
    showLoading();
    hideError();
    
    try {
        let results;
        
        if (GIPHY_API_KEY && GIPHY_API_KEY !== 'YOUR_GIPHY_API_KEY') {
            // Use real Giphy API
            const response = await fetch(
                `${GIPHY_API_URL}?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query + ' watch luxury timepiece')}&limit=12&rating=g`
            );
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            results = data.data;
        } else {
            // Use mock data for demo
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
            results = mockWatchData.filter(watch => 
                watch.title.toLowerCase().includes(query.toLowerCase()) ||
                watch.alt_text.toLowerCase().includes(query.toLowerCase())
            );
            
            // If no matches found, show all mock data
            if (results.length === 0) {
                results = mockWatchData;
            }
        }
        
        displayResults(results);
        
    } catch (error) {
        showError(`Failed to search watches: ${error.message}`);
    } finally {
        hideLoading();
    }
}

function displayResults(watches) {
    resultsContainer.innerHTML = '';
    
    if (watches.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <h3>No watches found</h3>
                <p>Try searching for different watch brands or styles</p>
            </div>
        `;
        return;
    }

    watches.forEach(watch => {
        const watchCard = document.createElement('div');
        watchCard.className = 'watch-card';
        
        const title = watch.title || 'Designer Watch';
        const description = watch.alt_text || `Beautiful timepiece by ${watch.username}`;
        const imageUrl = watch.images.fixed_height.url;
        
        watchCard.innerHTML = `
            <img src="${imageUrl}" alt="${title}" class="watch-image" loading="lazy">
            <div class="watch-info">
                <div class="watch-title">${title}</div>
                <div class="watch-description">${description}</div>
            </div>
        `;
        
        resultsContainer.appendChild(watchCard);
    });
}

function showLoading() {
    loadingDiv.style.display = 'block';
    resultsContainer.innerHTML = '';
}

function hideLoading() {
    loadingDiv.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorDiv.style.display = 'block';
    resultsContainer.innerHTML = '';
}

function hideError() {
    errorDiv.style.display = 'none';
}

function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        searchWatches(query);
    }
}

// Event listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Load default watches on page load
window.addEventListener('load', () => {
    searchWatches('luxury watch');
});
