document.addEventListener('DOMContentLoaded', async () => {
    gsap.registerPlugin(ScrollTrigger);

    try {
        const [resumeRes, projectsRes] = await Promise.all([
            fetch('../data/resume_telegraph.json'),
            fetch('../data/projects.json')
        ]);
        
        const resumeData = await resumeRes.json();
        const projectsData = await projectsRes.json();

        const isCaseStudy = window.location.pathname.includes('case-study.html');

        if (isCaseStudy) {
            renderCaseStudyPage(projectsData);
            renderFooterLinks(resumeData.personal.contact);
        } else {
            renderHero(resumeData.personal);
            renderExperience(resumeData.experience);
            renderProjectsList(projectsData);
            renderEducation(resumeData.education);
            renderSkills(resumeData.skills);
            renderFooterLinks(resumeData.personal.contact);
        }

        // Wait a small tick so DOM is fully rendered before GSAP measures it
        setTimeout(() => {
            initGSAPAnimations();
            initScrollAnimations();
        }, 50);
    } catch (err) {
        console.error("Error loading portfolio data:", err);
    }
});

function renderHero(personal) {
    document.getElementById('hero-title').textContent = personal.name;
    document.getElementById('hero-subtitle').textContent = personal.title;
    document.getElementById('hero-location').textContent = personal.location;
    document.getElementById('hero-summary').innerHTML = personal.summary.replace(/\n\n/g, '<br><br>');
    
    // Set email
    const emailLink = document.getElementById('hero-email');
    if (emailLink && personal.contact.email) {
        emailLink.href = `mailto:${personal.contact.email}`;
    }
}

function renderExperience(experience) {
    const list = document.getElementById('experience-list');
    let html = '';
    
    experience.forEach((exp, index) => {
        const bulletsHtml = exp.bullets.map(b => `<li>${b}</li>`).join('');
        const isExpanded = index === 0 ? "expanded" : "";
        
        html += `
            <div class="exp-card exp-accordion fade-in ${isExpanded}">
                <div class="exp-accordion-header" onclick="this.parentElement.classList.toggle('expanded')">
                    <div class="exp-meta">
                        <p style="margin: 0;">${exp.period}</p>
                    </div>
                    <div class="exp-header-info" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                        <div>
                            <h3 style="margin: 0 0 0.25rem 0;">${exp.role}</h3>
                            <div class="company" style="font-size: 0.9rem; color: var(--text-secondary);">${exp.company}</div>
                        </div>
                        <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>
                <div class="exp-accordion-content">
                    <div class="exp-details">
                        <p style="margin-top: 1rem;">${exp.description || ''}</p>
                        <ul class="exp-bullets">
                            ${bulletsHtml}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    });

    // Append Resume Download Button
    html += `
        <div class="cv-download-wrapper fade-in" style="margin-top: 2.5rem; text-align: center;">
            <a href="assets/joetao_cv.docx" class="btn btn-outline" download style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 12px 24px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Full Resume
            </a>
        </div>
    `;

    list.innerHTML = html;
}

function renderProjectsList(projects) {
    const grid = document.getElementById('projects-grid');
    let html = '';
    
    projects.forEach(project => {
        // Build tags from properties
        const tags = [project.year, project.category].map(attr => `<span class="badge">${attr}</span>`).join('');
        
        let liveLinkHtml = '';
        if (project.links && project.links.live) {
            const linkText = project.links.live.includes('figma.com') ? 'Interactive Prototype' : 'Live Application';
            liveLinkHtml = `<a href="${project.links.live}" target="_blank" rel="noopener noreferrer" style="font-size: 0.85rem; color: var(--color-primary); font-weight: 600; text-decoration: none; margin-top: 0.75rem; display: inline-flex; align-items: center; gap: 4px;">${linkText} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`;
        }

        let linkActionHtml = '';
        if (project.links && project.links.case_study) {
            linkActionHtml = `
                <a href="${project.links.case_study}" class="project-link">
                    View Case Study
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            `;
        } else {
            const copy = 'Case study incoming';
            linkActionHtml = `
                <a href="${project.links && project.links.live ? project.links.live : '#'}" ${project.links && project.links.live ? 'target="_blank" rel="noopener noreferrer"' : 'onclick="return false;"'} class="project-link" style="margin-top: auto; cursor: default;">
                    ${copy}
                </a>
            `;
        }

        const isInactive = !project.links || !project.links.case_study;
        const inactiveClass = isInactive ? 'inactive-card' : '';

        html += `
            <div class="project-card fade-in ${inactiveClass}">
                <div class="project-image-placeholder">
                    <div class="project-image-bg" style="background-image: url('${project.hero_image}'); background-size: cover; background-position: center; color: transparent;"></div>
                </div>
                <div class="project-content" style="display: flex; flex-direction: column; flex: 1;">
                    <div class="project-meta">
                        ${tags}
                    </div>
                    ${liveLinkHtml}
                    <h3 class="project-title" style="margin-top: 1.5rem;">${project.title}</h3>
                    <p class="project-subtitle">${project.subtitle}</p>
                    <div style="margin-top: auto; padding-top: 1.5rem;">
                        ${linkActionHtml}
                    </div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

function renderCaseStudyPage(projects) {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const project = projects.find(p => p.id === projectId);
    const content = document.getElementById('case-study-content');

    if (!project) {
        content.innerHTML = '<div style="text-align: center; padding: 5rem 0;"><h2>Project not found</h2><a href="index.html">Return home</a></div>';
        return;
    }

    let liveRowHtml = '';
    if (project.links && project.links.live) {
        liveRowHtml = `
            <div class="cs-property-row">
                <div class="cs-property-label">Live Site</div>
                <div class="cs-property-value">
                    <a href="${project.links.live}" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                        Open Application 
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                </div>
            </div>
        `;
    }

    let html = `
        <header class="cs-header fade-in">
            <h1 class="cs-title section-title">${project.title}</h1>
            <div style="display: flex; justify-content: center; margin: 5rem 0 3rem 0;">
                <h2 class="cs-subtitle" style="text-align: center; max-width: 700px; font-size: 1.5rem; line-height: 1.4;">${project.subtitle}</h2>
            </div>
        </header>

        <div class="cs-hero-wrapper fade-in">
            <img src="${project.hero_image}" alt="${project.title} Hero" class="cs-hero-img">
        </div>

        <section class="cs-properties-grid fade-in">
            <div class="cs-property-row">
                <div class="cs-property-label">Year</div>
                <div class="cs-property-value">${project.year}</div>
            </div>
            <div class="cs-property-row">
                <div class="cs-property-label">Timeframe</div>
                <div class="cs-property-value">${project.timeframe}</div>
            </div>
            <div class="cs-property-row">
                <div class="cs-property-label">Category</div>
                <div class="cs-property-value">${project.category}</div>
            </div>
            <div class="cs-property-row">
                <div class="cs-property-label">Tools</div>
                <div class="cs-property-value cs-property-tags">
                    ${project.tools.map(t => `<span class="cs-property-tag">${t}</span>`).join('')}
                </div>
            </div>
            ${liveRowHtml}
        </section>

        <section class="cs-body">
            <div class="split-layout" style="margin-bottom: 4rem;">
                <div class="split-col cs-callout fade-in" style="margin-bottom: 0;">
                    <div class="cs-callout-title">Problem</div>
                    <p>${project.problem}</p>
                </div>
                <div class="split-col cs-callout fade-in" style="margin-bottom: 0;">
                    <div class="cs-callout-title">Solution</div>
                    <p>${project.solution}</p>
                </div>
            </div>
    `;

    if (project.content) {
        project.content.forEach(item => {
            if (item.type === 'paragraph') {
                html += `<p class="cs-body-paragraph fade-in">${item.value}</p>`;
            } else if (item.type === 'image') {
                html += `
                <figure class="cs-image-figure fade-in">
                    <img src="${item.src}" alt="Case Study Element">
                    ${item.caption ? `<figcaption class="cs-image-caption">${item.caption}</figcaption>` : ''}
                </figure>
                `;
            }
        });
    } else {
        // Fallback for any projects not converted to 'content'
        project.body.forEach((para, index) => {
            html += `<p class="cs-body-paragraph fade-in">${para}</p>`;
            
            if (project.images && project.images[index]) {
                html += `
                    <figure class="cs-image-figure fade-in">
                        <img src="${project.images[index].src}" alt="Case Study Element">
                        ${project.images[index].caption ? `<figcaption class="cs-image-caption">${project.images[index].caption}</figcaption>` : ''}
                    </figure>
                `;
            }
        });

        if (project.images && project.images.length > project.body.length) {
            for (let i = project.body.length; i < project.images.length; i++) {
                html += `
                    <figure class="cs-image-figure fade-in">
                        <img src="${project.images[i].src}" alt="Case Study Element">
                        ${project.images[i].caption ? `<figcaption class="cs-image-caption">${project.images[i].caption}</figcaption>` : ''}
                    </figure>
                `;
            }
        }
    }

    html += `</section>`;
    
    // Task 1: Add a View More section
    const otherProjects = projects.filter(p => p.id !== projectId).sort(() => 0.5 - Math.random()).slice(0, 2);
    if (otherProjects.length > 0) {
        html += `
        <section class="cs-more-projects" style="margin-top: 6rem; padding-top: 4rem; border-top: 1px solid var(--border-color);">
            <h3 class="section-title fade-in" style="margin-bottom: 2rem;">More Case Studies</h3>
            <div class="projects-grid">
                ${otherProjects.map(p => `
                    <div class="project-card fade-in">
                        <div class="project-image-placeholder">
                            <div class="project-image-bg" style="background-image: url('${p.hero_image}'); background-size: cover; background-position: center;"></div>
                        </div>
                        <div class="project-content">
                            <div class="project-meta">
                                <span class="project-year">${p.year}</span>
                                <span class="project-category">${p.category}</span>
                            </div>
                            <h3>${p.title}</h3>
                            <p>${p.subtitle}</p>
                            <div class="project-tags">
                                ${(p.tools || []).slice(0, 3).map(t => `<span class="project-tag">${t}</span>`).join('')}
                            </div>
                            <div style="margin-top: auto; padding-top: 1.5rem;">
                                <a href="${p.links?.case_study || '#'}" class="btn btn-outline" style="width: 100%;">View Case Study</a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
        `;
    }

    content.innerHTML = html;
    document.title = `${project.title} - Case Study`;
    
    // Parallax logic for newly rendered hero image
    setTimeout(() => {
        const heroImg = content.querySelector('.cs-hero-img');
        if (heroImg) {
            gsap.to(heroImg, {
                scrollTrigger: {
                    trigger: '.cs-hero-wrapper',
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                yPercent: 15,
                ease: "none"
            });
        }
    }, 100);
}

function renderEducation(education) {
    const list = document.getElementById('education-list');
    let html = '';
    
    education.forEach(edu => {
        const bulletsHtml = edu.bullets.map(b => `<li>${b}</li>`).join('');
        html += `
            <div class="edu-item fade-in">
                <div class="edu-meta">
                    <span class="edu-degree">${edu.degree}</span>
                    <span class="edu-period">${edu.period}</span>
                </div>
                <div class="edu-school">${edu.school}</div>
                <ul>${bulletsHtml}</ul>
            </div>
        `;
    });
    
    list.innerHTML = html;
}

function renderSkills(skillsObj) {
    const list = document.getElementById('skills-list');
    let html = '';
    
    Object.entries(skillsObj).forEach(([category, skillsString]) => {
        const skillsArray = skillsString.split(' / ').map(s => s.trim());
        const tagsHtml = skillsArray.map(s => `<span class="skill-tag">${s}</span>`).join('');
        
        html += `
            <div class="skill-group fade-in">
                <h4 class="skill-category">${category}</h4>
                <div class="skill-tags">
                    ${tagsHtml}
                </div>
            </div>
        `;
    });
    
    list.innerHTML = html;
}

function renderFooterLinks(contact) {
    const container = document.getElementById('footer-links');
    if (contact.linkedin) {
        container.innerHTML += `<a href="https://${contact.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`;
    }
    if (contact.github) {
        container.innerHTML += `<a href="https://${contact.github}" target="_blank" rel="noopener noreferrer">GitHub</a>`;
    }
    if (contact.acm) {
        container.innerHTML += `<a href="https://${contact.acm}" target="_blank" rel="noopener noreferrer">ACM Profile</a>`;
    }
    if (contact.email) {
        container.innerHTML += `<a href="mailto:${contact.email}">Email</a>`;
    }
}

function initScrollAnimations() {
    // Only use GSAP for all scroll effects
    requestAnimationFrame(() => {
        initGSAPAnimations();
    });
}

function initGSAPAnimations() {
    // Industrial-grade Text Reveal for Hero & Titles
    const splitElements = document.querySelectorAll('.hero-title, .hero-subtitle, .section-title, .cs-title');
    
    splitElements.forEach(el => {
        if (!el) return;
        const text = el.innerText;
        const words = text.split(' ');
        el.innerHTML = '';
        
        words.forEach(word => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.overflow = 'hidden';
            wordSpan.style.verticalAlign = 'top';
            wordSpan.style.marginRight = '0.25em';
            
            const innerSpan = document.createElement('span');
            innerSpan.style.display = 'inline-block';
            innerSpan.innerText = word;
            innerSpan.style.willChange = 'transform, opacity';
            
            wordSpan.appendChild(innerSpan);
            el.appendChild(wordSpan);
            
            gsap.fromTo(innerSpan, 
                { yPercent: 120, opacity: 0, rotateZ: 3 },
                {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                    },
                    yPercent: 0,
                    opacity: 1,
                    rotateZ: 0,
                    duration: 1,
                    ease: "power4.out",
                    stagger: 0.05
                }
            );
        });
    });

    // Elegant Staggered Reveal for Cards & Fade-ins
    const fadeElements = gsap.utils.toArray('.fade-in');
    fadeElements.forEach(elem => {
        // Skip elements already animated by the text split logic
        if (elem.classList.contains('section-title') || elem.closest('.hero-title')) return;
        
        gsap.fromTo(elem,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
        elem.classList.remove('fade-in'); // Remove CSS class fully letting GSAP control
        elem.style.opacity = 1; // Unhide
    });

    // Parallax Effects on Image Holders
    const imageWrappers = document.querySelectorAll('.project-image-placeholder');
    imageWrappers.forEach(wrapper => {
        const bg = wrapper.querySelector('.project-image-bg');
        if (!bg) return;
        
        gsap.fromTo(bg, 
            { yPercent: -10 },
            {
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                yPercent: 20,
                ease: "none"
            }
        );
    });

    // Infinite Image Ticker
    const tickerTrack = document.getElementById('image-ticker-track');
    if (tickerTrack) {
        gsap.to(tickerTrack, {
            xPercent: -50,
            ease: "none",
            duration: 20,
            repeat: -1
        });
    }
}
