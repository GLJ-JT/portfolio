document.addEventListener('DOMContentLoaded', async () => {
    gsap.registerPlugin(ScrollTrigger);

    try {
        const [resumeRes, projectsRes] = await Promise.all([
            fetch('data/resume.json'),
            fetch('data/projects.json')
        ]);
        
        const resumeData = await resumeRes.json();
        const projectsData = await projectsRes.json();

        const isCaseStudy = window.location.pathname.includes('case-study.html');
        const hasDynamicHero = Boolean(document.getElementById('hero-title'));
        const hasProjectsGrid = Boolean(document.getElementById('projects-grid'));
        const hasExperienceList = Boolean(document.getElementById('experience-list'));
        const hasEducationList = Boolean(document.getElementById('education-list'));
        const hasSkillsList = Boolean(document.getElementById('skills-list'));

        if (isCaseStudy) {
            renderCaseStudyPage(projectsData);
            renderFooterLinks(resumeData.personal.contact);
        } else {
            if (hasDynamicHero) renderHero(resumeData.personal);
            if (hasExperienceList) renderExperience(resumeData.experience);
            if (hasProjectsGrid) renderProjectsList(projectsData);
            if (hasEducationList) renderEducation(resumeData.education);
            if (hasSkillsList) renderSkills(resumeData.skills);
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
    const title = document.getElementById('hero-title');
    if (!title) return;

    title.textContent = personal.name;
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
    if (!list) return;
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
            <a href="assets/Joe_Tao_Resume.pdf" class="btn btn-outline" download style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 12px 24px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Full Resume
            </a>
        </div>
    `;

    list.innerHTML = html;
}

function renderProjectsList(projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    let html = '';

    const featuredProject = projects.find(project => project.id === 'property-nlp') || projects.find(project => project.id === 'depology');
    const remainingProjects = featuredProject
        ? projects.filter(project => project.id !== featuredProject.id)
        : projects;

    if (featuredProject) {
        const isPropTechFeature = featuredProject.id === 'property-nlp';
        const featuredTags = (isPropTechFeature
            ? ['Technical UX', 'Search systems', 'Python backend', 'Structured data']
            : ['Design Systems', 'Commerce UX', 'Research-led CRO', 'Figma'])
            .map(tag => `<span class="badge">${tag}</span>`)
            .join('');
        const featuredHref = featuredProject.links.case_study || featuredProject.links.live;
        const featuredExternalAttr = featuredHref.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : '';

        html += `
            <article class="featured-project-card fade-in">
                <a href="${featuredHref}" ${featuredExternalAttr} class="featured-project-media ${isPropTechFeature ? 'featured-iframe-preview' : ''}" aria-label="Read ${featuredProject.title} case study">
                    ${isPropTechFeature
                        ? `<iframe src="${featuredProject.preview_iframe}" title="${featuredProject.title} live iPhone demo preview" loading="lazy" tabindex="-1"></iframe>`
                        : `<div class="featured-project-image" style="background-image: url('assets/case_study_images_depology_system/dp-system.png');"></div>`
                    }
                </a>
                <div class="featured-project-content">
                    <div class="project-meta">
                        ${featuredTags}
                    </div>
                    <p class="featured-kicker">${isPropTechFeature ? 'Technical UX case study' : 'Featured design system case study'}</p>
                    <h3 class="featured-project-title">${isPropTechFeature ? 'Explainable Property Search' : featuredProject.title}</h3>
                    <p class="featured-project-subtitle">${isPropTechFeature ? 'A senior UX engineering study translating ambiguous renter language into editable intent, ranked recommendations, and inspectable Python + JSON search logic.' : featuredProject.subtitle}</p>
                    <div class="featured-proof-row" aria-label="${featuredProject.title} impact metrics">
                        ${isPropTechFeature
                            ? `<span><strong>41%</strong> faster task completion</span>
                               <span><strong>10</strong> moderated usability sessions</span>
                               <span><strong>Live</strong> API-backed prototype</span>`
                            : `<span><strong>2x</strong> checkout CVR</span>
                               <span><strong>-50%</strong> cart abandonment</span>
                               <span><strong>-30%</strong> design-build time</span>`
                        }
                    </div>
                    <a href="${featuredHref}" ${featuredExternalAttr} class="project-link featured-project-link">
                        ${isPropTechFeature ? 'Read technical UX case study' : 'Read design system case study'}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
            </article>
        `;
    }

    remainingProjects.forEach(project => {
        // Build tags from properties
        const tags = [project.year, project.category].map(attr => `<span class="badge">${attr}</span>`).join('');
        const projectHref = project.links && (project.links.case_study || project.links.live) ? project.links.case_study || project.links.live : '#';
        const externalLinkAttr = projectHref.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : '';
        const hasIframePreview = Boolean(project.preview_iframe);
        
        let liveLinkHtml = '';
        if (project.links && project.links.live) {
            const linkText = project.links.live.includes('figma.com') ? 'Interactive Prototype' : 'Live Application';
            liveLinkHtml = `<a href="${project.links.live}" target="_blank" rel="noopener noreferrer" style="font-size: 0.85rem; color: var(--color-primary); font-weight: 600; text-decoration: none; margin-top: 0.75rem; display: inline-flex; align-items: center; gap: 4px;">${linkText} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`;
        }

        let linkActionHtml = '';
        if (project.links && project.links.case_study) {
            linkActionHtml = `
                <a href="${project.links.case_study}" ${project.links.case_study.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} class="project-link">
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
            <div class="project-card fade-in ${inactiveClass}" ${hasIframePreview ? `onclick="if (!event.target.closest('a')) window.open('${projectHref}', '_blank', 'noopener,noreferrer');" role="link" tabindex="0" onkeydown="if (event.key === 'Enter') window.open('${projectHref}', '_blank', 'noopener,noreferrer');"` : ''}>
                <a class="project-image-placeholder ${hasIframePreview ? 'project-iframe-preview' : ''}" href="${projectHref}" ${externalLinkAttr} aria-label="View ${project.title}">
                    ${hasIframePreview
                        ? `<iframe src="${project.preview_iframe}" title="${project.title} live iPhone demo preview" loading="lazy" tabindex="-1"></iframe><span class="iframe-preview-label">Live iPhone demo</span>`
                        : `<div class="project-image-bg" style="background-image: url('${project.hero_image}'); background-size: cover; background-position: center; color: transparent;"></div>`
                    }
                </a>
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
    if (!content) return;
    const isPropertyCase = projectId === 'property-nlp';
    const isWorldoverCase = projectId === 'worldover';
    const isFullBleedHeroCase = isPropertyCase || isWorldoverCase;

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
            <div class="cs-subtitle-wrap">
                <h2 class="cs-subtitle">${project.subtitle}</h2>
            </div>
        </header>

        <div class="cs-hero-wrapper ${project.hero_iframe ? 'cs-hero-wrapper-iframe' : ''} ${isFullBleedHeroCase ? 'cs-hero-wrapper-fullbleed' : ''} ${isWorldoverCase ? 'cs-hero-wrapper-laptop' : ''} fade-in">
            ${project.hero_iframe
                ? isWorldoverCase
                    ? `<div class="cs-laptop-frame" aria-label="${project.title} prototype laptop preview">
                        <div class="cs-laptop-screen">
                            <div class="cs-laptop-topbar" aria-hidden="true">
                                <span></span><span></span><span></span>
                            </div>
                            <iframe src="${project.hero_iframe}" title="${project.title} live preview" class="cs-hero-iframe" loading="lazy"></iframe>
                        </div>
                        <div class="cs-laptop-base" aria-hidden="true"></div>
                    </div>`
                    : `<iframe src="${project.hero_iframe}" title="${project.title} live preview" class="cs-hero-iframe" loading="lazy"></iframe>`
                : `<img src="${project.hero_image}" alt="${project.title} Hero" class="cs-hero-img">`
            }
        </div>

        <section class="cs-properties-grid ${isPropertyCase ? 'cs-properties-grid-compact' : ''} fade-in">
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

        <section class="cs-body ${isPropertyCase ? 'cs-body-simple' : ''}">
            <div class="split-layout cs-problem-solution">
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
            } else if (item.type === 'case_intro') {
                html += `
                <section class="cs-case-intro fade-in">
                    <span>${item.kicker || 'Case sequence'}</span>
                    <h3>${item.title}</h3>
                    <p>${item.value}</p>
                </section>
                `;
            } else if (item.type === 'preview_links') {
                html += `
                <section class="cs-preview-links fade-in">
                    <div class="cs-preview-links-head">
                        <span>${item.kicker || 'Preview access'}</span>
                        <h3>${item.title}</h3>
                        ${item.value ? `<p>${item.value}</p>` : ''}
                    </div>
                    <div class="cs-preview-links-grid">
                        ${(item.items || []).map(link => `
                            <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="cs-preview-link"${link.image ? ` style="background-image: url('${link.image}');"` : ''}>
                                <span>${link.label}</span>
                                ${link.note ? `<small>${link.note}</small>` : ''}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </a>
                        `).join('')}
                    </div>
                </section>
                `;
            } else if (item.type === 'wide_iframe') {
                html += `
                <section class="cs-wide-iframe-section ${item.variant === 'mobile' ? 'cs-wide-iframe-mobile' : ''} fade-in">
                    <div class="cs-wide-iframe-copy">
                        <span>${item.kicker || 'Artifact'}</span>
                        <h3>${item.title}</h3>
                        ${item.description ? `<p>${item.description}</p>` : ''}
                        <a href="${item.src}" target="_blank" rel="noopener noreferrer" class="project-link">
                            ${item.cta || 'Open artifact'}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                    </div>
                    <div class="cs-wide-iframe-wrap">
                        <iframe src="${item.src}" title="${item.title}" loading="lazy"></iframe>
                    </div>
                </section>
                `;
            } else if (item.type === 'estimate_panel') {
                html += `
                <section class="cs-estimate-panel fade-in">
                    <div class="cs-estimate-head">
                        <span>${item.kicker || 'Estimate'}</span>
                        <h3>${item.title}</h3>
                        ${item.value ? `<p>${item.value}</p>` : ''}
                    </div>
                    <div class="cs-estimate-grid">
                        ${(item.items || []).map(estimate => `
                            <article class="cs-estimate-item">
                                <span>${estimate.label}</span>
                                <strong>${estimate.value}</strong>
                                <p>${estimate.note}</p>
                            </article>
                        `).join('')}
                    </div>
                </section>
                `;
            } else if (item.type === 'article_section') {
                html += `
                <section class="cs-article-section fade-in">
                    <span>${item.kicker || 'Section'}</span>
                    <h3>${item.title}</h3>
                    ${(item.paragraphs || []).map(paragraph => `<p>${paragraph}</p>`).join('')}
                </section>
                `;
            } else if (item.type === 'note') {
                html += `
                <aside class="cs-update-note fade-in">
                    <span>${item.kicker || 'Project note'}</span>
                    <h3>${item.title}</h3>
                    <p>${item.value}</p>
                </aside>
                `;
            } else if (item.type === 'improvements') {
                html += `
                <section class="cs-improvements fade-in">
                    <div class="cs-improvements-header">
                        <span>${item.kicker || 'Key improvements'}</span>
                        <h3>${item.title}</h3>
                    </div>
                    <div class="cs-improvements-list">
                        ${(item.items || []).map((improvement, index) => `
                            <article class="cs-improvement-item">
                                <strong>${String(index + 1).padStart(2, '0')}</strong>
                                <div>
                                    <h4>${improvement.title}</h4>
                                    <p>${improvement.value}</p>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </section>
                `;
            } else if (item.type === 'image') {
                html += `
                <figure class="cs-image-figure fade-in">
                    <img src="${item.src}" alt="Case Study Element">
                    ${item.caption ? `<figcaption class="cs-image-caption">${item.caption}</figcaption>` : ''}
                </figure>
                `;
            } else if (item.type === 'prototype') {
                html += `
                <section class="cs-prototype-section fade-in">
                    <div class="cs-prototype-copy">
                        <span class="cs-prototype-kicker">${item.kicker || 'Interactive prototype'}</span>
                        <h3>${item.title}</h3>
                        ${item.description ? `<p>${item.description}</p>` : ''}
                        <a href="${item.src}" target="_blank" rel="noopener noreferrer" class="project-link">
                            Open full prototype
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                    </div>
                    <div class="cs-prototype-frame-wrap">
                        <iframe src="${item.src}" title="${item.title}" loading="lazy"></iframe>
                    </div>
                </section>
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
    const hasCaseStudyContent = (p) => {
        const caseStudyHref = p.links?.case_study || '';
        const hasLocalCasePage = caseStudyHref.startsWith('case-study.html') || caseStudyHref.endsWith('.html');
        const hasStructuredContent = Array.isArray(p.content) && p.content.length > 0;
        const hasLegacyContent = Array.isArray(p.body) && p.body.length > 0;
        return hasLocalCasePage && (hasStructuredContent || hasLegacyContent);
    };
    const otherProjects = projects
        .filter(p => p.id !== projectId && hasCaseStudyContent(p))
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
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
    if (!list) return;
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
    if (!list) return;
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
    if (!container) return;
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
        const text = el.innerText.trim();
        const words = text.split(/\s+/);
        el.innerHTML = '';
        
        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.overflow = 'hidden';
            wordSpan.style.verticalAlign = 'top';
            
            const innerSpan = document.createElement('span');
            innerSpan.style.display = 'inline-block';
            innerSpan.innerText = word;
            innerSpan.style.willChange = 'transform, opacity';
            
            wordSpan.appendChild(innerSpan);
            el.appendChild(wordSpan);
            if (index < words.length - 1) {
                el.appendChild(document.createTextNode(' '));
            }
            
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
