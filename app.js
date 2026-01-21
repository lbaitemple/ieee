const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const showAllBtn = document.getElementById('showAllBtn');
const positionsList = document.getElementById('positionsList');
const positionDetails = document.getElementById('positionDetails');
const positionTitle = document.getElementById('positionTitle');
const closeBtn = document.getElementById('closeBtn');
const resetBtn = document.getElementById('resetBtn');
const orgTypeSelect = document.getElementById('orgType');

let currentPositions = [];
let currentPositionTitle = '';
let currentOrgType = 'section';

// Event listeners
searchBtn.addEventListener('click', performSearch);
showAllBtn.addEventListener('click', showAllPositions);
closeBtn.addEventListener('click', closeDetails);
resetBtn.addEventListener('click', resetProgress);
orgTypeSelect.addEventListener('change', handleOrgTypeChange);
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
        (pos.shortDescription && pos.shortDescription.toLowerCase().includes(query)) ||
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
            <p>${pos.shortDescription || pos.description}</p>
        </div>
    `).join('');
}

function showPositionDetails(index) {
    const position = currentPositions[index];
    if (!position) return;

    currentPositionTitle = position.title;
    positionTitle.textContent = position.title;
    
    // Populate tabs
    document.getElementById('tab-description').innerHTML = formatDescription(position);
    document.getElementById('tab-first30').innerHTML = formatContent(position.first30Days, position.title, 'first30');
    document.getElementById('tab-keyAdmin').innerHTML = formatContent(position.keyAdmin, position.title, 'keyAdmin');
    document.getElementById('tab-yearly').innerHTML = formatContent(position.yearly, position.title, 'yearly');

    // Show details panel
    positionDetails.style.display = 'block';
    
    // Switch to first tab
    switchTab('description');
    
    // Attach checkbox event listeners
    attachCheckboxListeners(position.title);
}

function resetProgress() {
    if (!currentPositionTitle) return;
    
    // Get the active tab name
    const activeTabBtn = document.querySelector('.tab-btn.active');
    const activeTabName = activeTabBtn ? activeTabBtn.dataset.tab : '';
    const activeTab = document.querySelector('.tab-pane.active');
    
    if (!activeTab) return;
    
    // Get tab display name
    const tabNames = {
        'description': 'Description',
        'first30': 'First 30 Days',
        'keyAdmin': 'Key Admin Functions',
        'yearly': 'Yearly Actions'
    };
    const tabDisplayName = tabNames[activeTabName] || 'this tab';
    
    if (confirm(`Are you sure you want to clear all checkboxes in "${tabDisplayName}"? This cannot be undone.`)) {
        // Clear only checkboxes in the active tab
        const checkboxes = activeTab.querySelectorAll('.task-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            localStorage.removeItem(checkbox.dataset.taskId);
        });
        // Update the progress display
        updateProgress();
    }
}

function formatDescription(position) {
    return `
        <div class="description-content">
            ${position.shortDescription ? `
                <div class="short-description-section">
                    <h3>Quick Summary</h3>
                    <p class="short-description">${position.shortDescription}</p>
                </div>
            ` : ''}
            <h3>Full Description</h3>
            <p class="long-description">${position.description}</p>
            <div class="keywords-section">
                <h3>Key Areas</h3>
                <p><strong>Keywords:</strong> ${position.keywords}</p>
            </div>
        </div>
    `;
}

function formatContent(content, positionTitle, tabName) {
    if (!content || content === 'Information not available') {
        return '<p>Information not available for this section.</p>';
    }
    
    // Convert list items to checkboxes
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Find all <li> elements and convert them to checkboxes
    const listItems = tempDiv.querySelectorAll('li');
    listItems.forEach((li, index) => {
        const taskId = `${positionTitle}-${tabName}-${index}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.id = taskId;
        checkbox.dataset.taskId = taskId;
        
        // Load saved state from localStorage
        const savedState = localStorage.getItem(taskId);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
        
        const label = document.createElement('label');
        label.htmlFor = taskId;
        label.innerHTML = li.innerHTML;
        
        li.innerHTML = '';
        li.appendChild(checkbox);
        li.appendChild(label);
        li.className = 'task-item';
    });
    
    return tempDiv.innerHTML;
}

function attachCheckboxListeners(positionTitle) {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Save state to localStorage
            localStorage.setItem(this.dataset.taskId, this.checked);
            updateProgress();
        });
    });
    updateProgress();
}

function updateProgress() {
    // Get the active tab
    const activeTab = document.querySelector('.tab-pane.active');
    if (!activeTab) return;
    
    // Only count checkboxes in the active tab
    const checkboxes = activeTab.querySelectorAll('.task-checkbox');
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    
    // Update progress display if it exists
    const progressDisplay = document.getElementById('progressDisplay');
    if (progressDisplay && total > 0) {
        const percentage = Math.round((checked / total) * 100);
        progressDisplay.innerHTML = `
            <div class="progress-text">Progress: ${checked} / ${total} tasks (${percentage}%)</div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${percentage}%"></div>
            </div>
        `;
    } else if (progressDisplay && total === 0) {
        // Hide progress for description tab (no tasks)
        progressDisplay.innerHTML = '';
    }
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
    
    // Update progress for the new active tab
    updateProgress();
}

function closeDetails() {
    positionDetails.style.display = 'none';
}

async function handleOrgTypeChange() {
    const orgType = orgTypeSelect.value;
    currentOrgType = orgType;
    
    // Close any open position details
    closeDetails();
    
    // Clear current positions
    positionsList.innerHTML = '<p class="placeholder">Loading positions...</p>';
    
    // Map org types to YAML files
    const yamlFiles = {
        'section': 'positions-section.yaml',
        'chapter': 'positions-chapter.yaml',
        'region': 'positions-region.yaml',
        'student-branch': 'positions-student-branch.yaml',
        'affinity-group': 'positions-affinity-group.yaml'
    };
    
    const yamlFile = yamlFiles[orgType];
    
    try {
        // Try to load YAML file
        const response = await fetch(yamlFile);
        if (response.ok) {
            const yamlText = await response.text();
            const yamlData = parseYAML(yamlText);
            window.POSITIONS_DATA = convertToHTML(yamlData);
            console.log(`Loaded ${window.POSITIONS_DATA.length} positions from ${yamlFile}`);
        } else {
            throw new Error('YAML file not found');
        }
    } catch (error) {
        console.log(`Could not load ${yamlFile}, using default data.js`);
        // Fallback: Filter data.js by org type if available
        // For now, just show all positions
    }
    
    // Show all positions for the selected org type
    showAllPositions();
}

// YAML parsing functions (from yaml-loader.js)
function parseYAML(yamlText) {
    const positions = [];
    const lines = yamlText.split('\n');
    let currentPosition = null;
    let currentSection = null;
    let currentCategory = null;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        if (!trimmed || trimmed.startsWith('#')) continue;
        
        if (trimmed.startsWith('- title:')) {
            if (currentPosition) {
                positions.push(currentPosition);
            }
            currentPosition = {
                title: trimmed.substring(8).trim(),
                first30Days: [],
                keyAdmin: [],
                yearly: []
            };
            currentSection = null;
            currentCategory = null;
        }
        else if (currentPosition && trimmed.startsWith('shortDescription:')) {
            currentPosition.shortDescription = trimmed.substring(17).trim();
        }
        else if (currentPosition && trimmed.startsWith('description:')) {
            currentPosition.description = trimmed.substring(12).trim();
        }
        else if (currentPosition && trimmed.startsWith('keywords:')) {
            currentPosition.keywords = trimmed.substring(9).trim();
        }
        else if (currentPosition && trimmed === 'first30Days:') {
            currentSection = 'first30Days';
            currentCategory = null;
        }
        else if (currentPosition && trimmed === 'keyAdmin:') {
            currentSection = 'keyAdmin';
            currentCategory = null;
        }
        else if (currentPosition && trimmed === 'yearly:') {
            currentSection = 'yearly';
            currentCategory = null;
        }
        else if (currentSection && trimmed.startsWith('- category:')) {
            currentCategory = {
                name: trimmed.substring(11).trim(),
                tasks: []
            };
            currentPosition[currentSection].push(currentCategory);
        }
        else if (currentCategory && trimmed.startsWith('- ') && !trimmed.startsWith('- category:')) {
            currentCategory.tasks.push(trimmed.substring(2).trim());
        }
    }
    
    if (currentPosition) {
        positions.push(currentPosition);
    }
    
    return positions;
}

function convertToHTML(yamlData) {
    return yamlData.map(position => {
        const convertSection = (section) => {
            if (!section || section.length === 0) {
                return '<p>Information not available for this section.</p>';
            }
            
            let html = '';
            section.forEach(category => {
                html += `<h3>${category.name}</h3>\n<ul>\n`;
                category.tasks.forEach(task => {
                    html += `  <li>${task}</li>\n`;
                });
                html += '</ul>\n';
            });
            return html.trim();
        };
        
        return {
            title: position.title,
            shortDescription: position.shortDescription,
            description: position.description,
            keywords: position.keywords,
            first30Days: convertSection(position.first30Days),
            keyAdmin: convertSection(position.keyAdmin),
            yearly: convertSection(position.yearly)
        };
    });
}
