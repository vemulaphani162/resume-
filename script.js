document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('resumeForm');
    const resumePreview = document.getElementById('resumePreview');
    const addEducationBtn = document.getElementById('addEducation');
    const addExperienceBtn = document.getElementById('addExperience');
    const educationFields = document.getElementById('educationFields');
    const experienceFields = document.getElementById('experienceFields');
    const resetFormBtn = document.getElementById('resetForm');
    const downloadPDFBtn = document.getElementById('downloadPDF');
    const customSkillInput = document.getElementById('customSkill');
    const selectedSkillsContainer = document.getElementById('selectedSkills');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    // Form fields
    const formFields = [
        'name', 'email', 'phone', 'summary'
    ];
    
    // Skills handling
    const skills = new Set();
    const skillCheckboxes = document.querySelectorAll('.skill-options input[type="checkbox"]');
    
    // Initialize form fields with event listeners
    formFields.forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.addEventListener('input', updateResume);
        }
    });
    
    // Add education entry
    addEducationBtn.addEventListener('click', addEducationField);
    
    // Add experience entry
    addExperienceBtn.addEventListener('click', addExperienceField);
    
    // Reset form
    resetFormBtn.addEventListener('click', resetForm);
    
    // Download PDF
    downloadPDFBtn.addEventListener('click', generatePDF);
    
    // Custom skill input
    customSkillInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const skill = this.value.trim();
            if (skill && !skills.has(skill)) {
                skills.add(skill);
                updateSkillsDisplay();
                updateResume();
            }
            this.value = '';
        }
    });
    
    // Skill checkboxes
    skillCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const skill = this.value;
            if (this.checked) {
                skills.add(skill);
            } else {
                skills.delete(skill);
            }
            updateSkillsDisplay();
            updateResume();
        });
    });
    
    // Initial setup
    addEducationField();
    addExperienceField();
    
    // Functions
    function addEducationField() {
        const educationEntry = document.createElement('div');
        educationEntry.className = 'education-entry';
        educationEntry.innerHTML = `
            <div class="input-group">
                <label>Institution</label>
                <input type="text" class="institution" placeholder="University Name" required>
            </div>
            <div class="input-group">
                <label>Degree</label>
                <input type="text" class="degree" placeholder="Bachelor of Science">
            </div>
            <div class="input-group">
                <label>Field of Study</label>
                <input type="text" class="field" placeholder="Computer Science">
            </div>
            <div class="input-group">
                <label>Graduation Year</label>
                <input type="text" class="year" placeholder="2020">
            </div>
            <button type="button" class="remove-btn">×</button>
        `;
        
        educationFields.appendChild(educationEntry);
        
        // Add event listeners to new inputs
        const inputs = educationEntry.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', updateResume);
        });
        
        // Add remove button functionality
        const removeBtn = educationEntry.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            educationEntry.remove();
            updateResume();
        });
        
        updateResume();
    }
    
    function addExperienceField() {
        const experienceEntry = document.createElement('div');
        experienceEntry.className = 'experience-entry';
        experienceEntry.innerHTML = `
            <div class="input-group">
                <label>Job Title</label>
                <input type="text" class="jobTitle" placeholder="Software Developer" required>
            </div>
            <div class="input-group">
                <label>Company</label>
                <input type="text" class="company" placeholder="Tech Corp Inc.">
            </div>
            <div class="input-group">
                <label>Duration</label>
                <input type="text" class="duration" placeholder="Jan 2020 - Present">
            </div>
            <div class="input-group">
                <label>Description</label>
                <textarea class="description" rows="3" placeholder="Describe your responsibilities and achievements..."></textarea>
            </div>
            <button type="button" class="remove-btn">×</button>
        `;
        
        experienceFields.appendChild(experienceEntry);
        
        // Add event listeners to new inputs
        const inputs = experienceEntry.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updateResume);
        });
        
        // Add remove button functionality
        const removeBtn = experienceEntry.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            experienceEntry.remove();
            updateResume();
        });
        
        updateResume();
    }
    
    function updateSkillsDisplay() {
        selectedSkillsContainer.innerHTML = '';
        skills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            selectedSkillsContainer.appendChild(skillTag);
        });
    }
    
    function updateResume() {
        // Update personal info
        document.getElementById('previewName').textContent = document.getElementById('name').value || 'Your Name';
        document.getElementById('previewEmail').textContent = document.getElementById('email').value || 'email@example.com';
        document.getElementById('previewPhone').textContent = document.getElementById('phone').value || '(123) 456-7890';
        document.getElementById('previewSummary').textContent = document.getElementById('summary').value || 'Brief summary about yourself and your professional background.';
        
        // Update education
        const educationEntries = document.querySelectorAll('.education-entry');
        const previewEducation = document.getElementById('previewEducation');
        previewEducation.innerHTML = '';
        
        if (educationEntries.length === 0) {
            previewEducation.innerHTML = '<div class="education-item"><h3>University Name</h3><p class="degree">Degree in Field of Study</p><p class="year">Graduation Year</p></div>';
        } else {
            educationEntries.forEach(entry => {
                const institution = entry.querySelector('.institution').value || 'University Name';
                const degree = entry.querySelector('.degree').value || 'Degree';
                const field = entry.querySelector('.field').value || 'Field of Study';
                const year = entry.querySelector('.year').value || 'Graduation Year';
                
                const educationItem = document.createElement('div');
                educationItem.className = 'education-item';
                educationItem.innerHTML = `
                    <h3>${institution}</h3>
                    <p class="degree">${degree} in ${field}</p>
                    <p class="year">${year}</p>
                `;
                previewEducation.appendChild(educationItem);
            });
        }
        
        // Update skills
        const previewSkills = document.getElementById('previewSkills');
        previewSkills.innerHTML = '';
        
        if (skills.size === 0) {
            previewSkills.innerHTML = `
                <span class="skill-tag">HTML</span>
                <span class="skill-tag">CSS</span>
                <span class="skill-tag">JavaScript</span>
            `;
        } else {
            skills.forEach(skill => {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.textContent = skill;
                previewSkills.appendChild(skillTag);
            });
        }
        
        // Update experience
        const experienceEntries = document.querySelectorAll('.experience-entry');
        const previewExperience = document.getElementById('previewExperience');
        previewExperience.innerHTML = '';
        
        if (experienceEntries.length === 0) {
            previewExperience.innerHTML = `
                <div class="experience-item">
                    <h3>Job Title</h3>
                    <p class="company-duration">Company Name | Duration</p>
                    <p class="description">Job description and responsibilities.</p>
                </div>
            `;
        } else {
            experienceEntries.forEach(entry => {
                const jobTitle = entry.querySelector('.jobTitle').value || 'Job Title';
                const company = entry.querySelector('.company').value || 'Company Name';
                const duration = entry.querySelector('.duration').value || 'Duration';
                const description = entry.querySelector('.description').value || 'Job description and responsibilities.';
                
                const experienceItem = document.createElement('div');
                experienceItem.className = 'experience-item';
                experienceItem.innerHTML = `
                    <h3>${jobTitle}</h3>
                    <p class="company-duration">${company} | ${duration}</p>
                    <p class="description">${description}</p>
                `;
                previewExperience.appendChild(experienceItem);
            });
        }
        
        // Update progress
        updateProgress();
    }
    
    function updateProgress() {
        let filledFields = 0;
        const totalFields = calculateTotalFields();
        
        // Check personal info
        if (document.getElementById('name').value) filledFields++;
        if (document.getElementById('email').value) filledFields++;
        if (document.getElementById('phone').value) filledFields++;
        if (document.getElementById('summary').value) filledFields++;
        
        // Check education
        const educationEntries = document.querySelectorAll('.education-entry');
        educationEntries.forEach(entry => {
            if (entry.querySelector('.institution').value) filledFields++;
            if (entry.querySelector('.degree').value) filledFields++;
        });
        
        // Check skills
        if (skills.size > 0) filledFields += 2;
        
        // Check experience
        const experienceEntries = document.querySelectorAll('.experience-entry');
        experienceEntries.forEach(entry => {
            if (entry.querySelector('.jobTitle').value) filledFields++;
            if (entry.querySelector('.company').value) filledFields++;
            if (entry.querySelector('.description').value) filledFields++;
        });
        
        const progress = Math.min(Math.round((filledFields / totalFields) * 100), 100);
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}% Complete`;
        
        // Change color based on progress
        if (progress < 30) {
            progressBar.style.backgroundColor = '#e74c3c';
        } else if (progress < 70) {
            progressBar.style.backgroundColor = '#f39c12';
        } else {
            progressBar.style.backgroundColor = '#2ecc71';
        }
    }
    
    function calculateTotalFields() {
        let total = 4; // name, email, phone, summary
        
        // Education fields (institution and degree count as required)
        const educationEntries = document.querySelectorAll('.education-entry');
        total += educationEntries.length * 2;
        
        // Skills (count as 2 fields)
        total += 2;
        
        // Experience (job title and description count as required)
        const experienceEntries = document.querySelectorAll('.experience-entry');
        total += experienceEntries.length * 2;
        
        return Math.max(total, 1); // Ensure we don't divide by zero
    }
    
    function resetForm() {
        // Clear form fields
        formFields.forEach(field => {
            document.getElementById(field).value = '';
        });
        
        // Clear education fields (keep one)
        while (educationFields.children.length > 1) {
            educationFields.removeChild(educationFields.lastChild);
        }
        const firstEducation = educationFields.firstElementChild;
        firstEducation.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
        
        // Clear experience fields (keep one)
        while (experienceFields.children.length > 1) {
            experienceFields.removeChild(experienceFields.lastChild);
        }
        const firstExperience = experienceFields.firstElementChild;
        firstExperience.querySelectorAll('input, textarea').forEach(input => {
            input.value = '';
        });
        
        // Clear skills
        skills.clear();
        skillCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        updateSkillsDisplay();
        
        // Update resume preview
        updateResume();
    }
    
    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'pt', 'a4');
        
        // Get the resume element
        const element = document.getElementById('resumePreview');
        
        // Use html2canvas to capture the resume
        html2canvas(element, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = doc.internal.pageSize.getWidth() - 40;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            doc.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
            doc.save('resume.pdf');
        });
    }
});