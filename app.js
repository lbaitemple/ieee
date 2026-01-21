const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const showAllBtn = document.getElementById('showAllBtn');
const positionsList = document.getElementById('positionsList');
const positionDetails = document.getElementById('positionDetails');
const positionTitle = document.getElementById('positionTitle');
const closeBtn = document.getElementById('closeBtn');
const resetBtn = document.getElementById('resetBtn');
const jobCardBtn = document.getElementById('jobCardBtn');
const orgTypeSelect = document.getElementById('orgType');

let currentPositions = [];
let currentPositionTitle = '';
let currentOrgType = 'section';
let currentPosition = null;

// Event listeners
searchBtn.addEventListener('click', performSearch);
showAllBtn.addEventListener('click', showAllPositions);
closeBtn.addEventListener('click', closeDetails);
resetBtn.addEventListener('click', resetProgress);
jobCardBtn.addEventListener('click', openJobCardModal);
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

    const dataSource = window.POSITIONS_DATA || POSITIONS_DATA;
    const results = dataSource.filter(pos => 
        pos.title.toLowerCase().includes(query) ||
        pos.description.toLowerCase().includes(query) ||
        (pos.shortDescription && pos.shortDescription.toLowerCase().includes(query)) ||
        pos.keywords.toLowerCase().includes(query)
    );
    
    displayPositions(results);
}

function showAllPositions() {
    displayPositions(window.POSITIONS_DATA || POSITIONS_DATA);
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

    currentPosition = position;
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
    
    // Update header based on organization type
    const headerTitles = {
        'section': 'IEEE Section Positions',
        'chapter': 'IEEE Chapter Positions',
        'region': 'IEEE Region Positions',
        'student-branch': 'IEEE Student Branch Positions',
        'affinity-group': 'IEEE Affinity Group Positions'
    };
    
    const headerDescriptions = {
        'section': 'Search and explore available positions in IEEE sections',
        'chapter': 'Search and explore available positions in IEEE chapters',
        'region': 'Search and explore available positions in IEEE regions',
        'student-branch': 'Search and explore available positions in IEEE student branches',
        'affinity-group': 'Search and explore available positions in IEEE affinity groups'
    };
    
    document.getElementById('headerTitle').textContent = headerTitles[orgType];
    document.getElementById('headerDescription').textContent = headerDescriptions[orgType];
    document.title = headerTitles[orgType];
    
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
            console.log(`Fetched ${yamlFile}, parsing...`);
            const yamlData = parseYAML(yamlText);
            console.log(`Parsed YAML data:`, yamlData);
            window.POSITIONS_DATA = convertToHTML(yamlData);
            console.log(`Loaded ${window.POSITIONS_DATA.length} positions from ${yamlFile}`);
        } else {
            throw new Error(`YAML file not found: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error loading ${yamlFile}:`, error);
        console.log(`Could not load ${yamlFile}, using default data.js`);
        // Fallback: Filter data.js by org type if available
        // For now, just show all positions
    }
    
    // Show all positions for the selected org type
    showAllPositions();
}

// Auto-load section positions on initial page load
window.addEventListener('DOMContentLoaded', () => {
    showAllPositions();
});

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
        else if (currentCategory && trimmed === 'tasks:') {
            // Skip the tasks: line, we're already in a category
            continue;
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


// Job Description Card Functions
function openJobCardModal() {
    if (!currentPosition) return;
    
    // Calculate time based on First 30 Days tasks (15 minutes each)
    const first30DaysContent = currentPosition.first30Days;
    let taskCount = 0;
    
    // Count tasks from the HTML content
    if (first30DaysContent && first30DaysContent !== 'Information not available for this section.') {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = first30DaysContent;
        taskCount = tempDiv.querySelectorAll('li').length;
    }
    
    const totalMinutes = taskCount * 15;
    const weeklyMinutes = Math.round(totalMinutes / 4); // Divide by 4 for weekly estimate
    const hours = Math.floor(weeklyMinutes / 60);
    const minutes = weeklyMinutes % 60;
    const timeCommitment = hours > 0 
        ? `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} min` : ''} / week`
        : `${minutes} min / week`;
    
    // Extract deliverables from yearly actions
    const yearlyContent = currentPosition.yearly;
    let deliverables = 'Complete assigned responsibilities';
    
    if (yearlyContent && yearlyContent !== 'Information not available for this section.') {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = yearlyContent;
        const tasks = Array.from(tempDiv.querySelectorAll('li'));
        if (tasks.length > 0) {
            // Get first 2-3 tasks as summary
            deliverables = tasks.slice(0, 3).map(li => li.textContent.trim()).join('. ');
            if (deliverables.length > 150) {
                deliverables = deliverables.substring(0, 150) + '...';
            }
        }
    }
    
    // Generate the job card image
    generateJobCardImage(currentPosition.title, timeCommitment, deliverables);
}

function generateJobCardImage(role, timeCommitment, deliverables) {
    // Create a canvas to draw the card - business card size (3.5" x 2" at 300 DPI)
    const canvas = document.createElement('canvas');
    canvas.width = 1050;  // 3.5 inches * 300 DPI
    canvas.height = 600;  // 2 inches * 300 DPI
    const ctx = canvas.getContext('2d');
    
    // Background with slight gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, '#f8f8f8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#d4a574';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // Straight horizontal accent line across the whole card
    ctx.strokeStyle = '#d4a574';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(40, 95);
    ctx.lineTo(1010, 95);
    ctx.stroke();
    
    // Title
    ctx.fillStyle = '#1a5490';
    ctx.font = 'bold 38px Arial';
    ctx.fillText('Job Description Card', 40, 65);
    
    // Content - all on same lines as in the image
    ctx.fillStyle = '#000000';
    let y = 145;
    const lineHeight = 42;
    const colonSpace = 20; // Space after colon
    
    // Volunteer Role: [Role Name]
    ctx.font = 'bold 22px Arial';
    ctx.fillText('Volunteer Role:', 40, y);
    ctx.font = '22px Arial';
    const roleX = ctx.measureText('Volunteer Role:').width + 40 + colonSpace;
    ctx.fillText(role, roleX, y);
    y += lineHeight;
    
    // Specific Task: [Task description]
    ctx.font = 'bold 22px Arial';
    ctx.fillText('Specific Task:', 40, y);
    ctx.font = '22px Arial';
    const taskX = ctx.measureText('Specific Task:').width + 40 + colonSpace;
    const taskText = `Manage ${role.toLowerCase()} responsibilities`;
    const taskLines = wrapText(ctx, taskText, 1000 - taskX);
    ctx.fillText(taskLines[0], taskX, y);
    if (taskLines.length > 1) {
        y += lineHeight;
        ctx.fillText(taskLines[1], 40, y);
    }
    y += lineHeight;
    
    // Time Commitment: [X hours/week]
    ctx.font = 'bold 22px Arial';
    ctx.fillText('Time Commitment:', 40, y);
    ctx.font = '22px Arial';
    const timeX = ctx.measureText('Time Commitment:').width + 40 + colonSpace;
    ctx.fillText(timeCommitment, timeX, y);
    y += lineHeight;
    
    // Duration: Jan 1st - Dec 31st (1 Year Term)
    ctx.font = 'bold 22px Arial';
    ctx.fillText('Duration:', 40, y);
    ctx.font = '22px Arial';
    const durationX = ctx.measureText('Duration:').width + 40 + colonSpace;
    ctx.fillText('Jan 1st - Dec 31st (1 Year Term)', durationX, y);
    y += lineHeight;
    
    // Deliverables: [Summary]
    ctx.font = 'bold 22px Arial';
    ctx.fillText('Deliverables:', 40, y);
    ctx.font = '22px Arial';
    const delivX = ctx.measureText('Deliverables:').width + 40 + colonSpace;
    const delivLines = wrapText(ctx, deliverables, 1000 - delivX);
    ctx.fillText(delivLines[0], delivX, y);
    for (let i = 1; i < delivLines.length && i < 2; i++) {
        y += lineHeight;
        ctx.fillText(delivLines[i], 40, y);
    }
    
    // Convert canvas to image and open in new window
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const newWindow = window.open('', '_blank', 'width=1070,height=650');
        newWindow.document.write(`
            <html>
            <head>
                <title>Job Description Card - ${role}</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        margin: 0;
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        background: #f0f0f0;
                        font-family: Arial, sans-serif;
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                        background: white;
                    }
                    .actions {
                        margin-top: 20px;
                        display: flex;
                        gap: 10px;
                    }
                    button {
                        padding: 12px 24px;
                        font-size: 16px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: all 0.3s;
                    }
                    .download-btn {
                        background: #1a5490;
                        color: white;
                    }
                    .download-btn:hover {
                        background: #0d3a6b;
                    }
                    .print-btn {
                        background: #d4a574;
                        color: white;
                    }
                    .print-btn:hover {
                        background: #b8895f;
                    }
                    
                    /* Print styles for business card size */
                    @media print {
                        * {
                            margin: 0 !important;
                            padding: 0 !important;
                        }
                        html, body {
                            width: 3.5in;
                            height: 2in;
                            margin: 0;
                            padding: 0;
                            background: white;
                            overflow: hidden;
                        }
                        img {
                            width: 3.5in !important;
                            height: 2in !important;
                            max-width: 3.5in !important;
                            max-height: 2in !important;
                            min-width: 3.5in !important;
                            min-height: 2in !important;
                            box-shadow: none;
                            display: block;
                            margin: 0;
                            padding: 0;
                            page-break-before: avoid;
                            page-break-after: avoid;
                            page-break-inside: avoid;
                        }
                        .actions {
                            display: none !important;
                        }
                        @page {
                            size: 3.5in 2in;
                            margin: 0;
                            padding: 0;
                        }
                    }
                </style>
            </head>
            <body>
                <img src="${url}" alt="Job Description Card">
                <div class="actions">
                    <button class="download-btn" onclick="downloadImage()">Download Image</button>
                    <button class="print-btn" onclick="window.print()">Print</button>
                </div>
                <script>
                    function downloadImage() {
                        const a = document.createElement('a');
                        a.href = '${url}';
                        a.download = 'job-card-${role.replace(/\s+/g, '-').toLowerCase()}.png';
                        a.click();
                    }
                </script>
            </body>
            </html>
        `);
        newWindow.document.close();
    });
}

function closeJobCardModal() {
    jobCardModal.style.display = 'none';
}

function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    });
    
    if (currentLine) {
        lines.push(currentLine);
    }
    
    return lines;
}
