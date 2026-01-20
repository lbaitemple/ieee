const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const showAllBtn = document.getElementById('showAllBtn');
const positionsList = document.getElementById('positionsList');
const positionDetails = document.getElementById('positionDetails');
const positionTitle = document.getElementById('positionTitle');
const closeBtn = document.getElementById('closeBtn');

let currentPositions = [];

// Event listeners
searchBtn.addEventListener('click', performSearch);
showAllBtn.addEventListener('click', showAllPositions);
closeBtn.addEventListener('click', closeDetails);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        switchTab(tabName);
    });
});

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        alert('Please enter a search term');
        return;
    }

    const results = POSITIONS_DATA.filter(pos => 
        pos.title.toLowerCase().includes(query) ||
        pos.description.toLowerCase().includes(query) ||
        pos.keywords.toLowerCase().includes(query)
    );
    
    displayPositions(results);
}

function showAllPositions() {
    displayPositions(POSITIONS_DATA);
}

function displayPositions(positions) {
    currentPositions = positions;
    
    if (positions.length === 0) {
        positionsList.innerHTML = '<p class="placeholder">No positions found</p>';
        return;
    }

    positionsList.innerHTML = positions.map((pos, index) => `
        <div class="position-item" onclick="showPositionDetails(${index})">
            <h3>${pos.title}</h3>
            <p>${pos.description}</p>
        </div>
    `).join('');
}

function showPositionDetails(index) {
    const position = currentPositions[index];
    if (!position) return;

    positionTitle.textContent = position.title;
    
    // Populate tabs
    document.getElementById('tab-description').innerHTML = formatDescription(position);
    document.getElementById('tab-first30').innerHTML = formatContent(position.first30Days);
    document.getElementById('tab-keyAdmin').innerHTML = formatContent(position.keyAdmin);
    document.getElementById('tab-yearly').innerHTML = formatContent(position.yearly);

    // Show details panel
    positionDetails.style.display = 'block';
    
    // Switch to first tab
    switchTab('description');
}

function formatDescription(position) {
    return `
        <h3>Position Overview</h3>
        <p>${position.description}</p>
        <h3>Key Areas</h3>
        <p><strong>Keywords:</strong> ${position.keywords}</p>
    `;
}

function formatContent(content) {
    if (!content || content === 'Information not available') {
        return '<p>Information not available for this section.</p>';
    }
    
    // Content is already formatted as HTML
    return content;
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });
    
    // Update tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

function closeDetails() {
    positionDetails.style.display = 'none';
}
