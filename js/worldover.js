document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.sidebar .nav-item');
    const views = document.querySelectorAll('.view');
    const pageTitle = document.getElementById('page-title');

    const viewTitles = {
        'view-overview': 'WELCOME BACK! SYMRISE AG.',
        'view-production-tracking': 'PRODUCTION TRACKING',
        'view-threshold-gauging': 'THRESHOLD GAUGING',
        'view-reporting': 'REPORT STUDIO'
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            if (!targetId) return;

            // Update active states
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Switch view
            views.forEach(view => {
                if(view.id === targetId) {
                    view.classList.add('active');
                } else {
                    view.classList.remove('active');
                }
            });

            // Update title
            pageTitle.textContent = viewTitles[targetId] || 'DASHBOARD';
        });
    });

    // --- Tabs Logic (Threshold Gauging) ---
    const tabs = document.querySelectorAll('.tabs .tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });


    // --- Chart.js Initializations ---
    Chart.defaults.color = '#6b7280';
    Chart.defaults.font.family = 'Inter';

    // 1. Main Compliance Gauge
    const ctxGauge = document.getElementById('scoreGaugeChart');
    if (ctxGauge) {
        new Chart(ctxGauge, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [77.2, 22.8],
                    backgroundColor: ['#84cc16', '#e5e7eb'],
                    borderWidth: 0,
                    circumference: 180,
                    rotation: 270,
                    cutout: '80%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { tooltip: { enabled: false }, legend: { display: false } }
            }
        });
    }

    // 2. Circular Progress Overview Indicators
    const createCircProgress = (id, percent, color) => {
        const el = document.getElementById(id);
        if (!el) return;
        new Chart(el, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [percent, 100 - percent],
                    backgroundColor: [color, '#e5e7eb'],
                    borderWidth: 0,
                    cutout: '80%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { tooltip: { enabled: false }, legend: { display: false } },
                animation: { duration: 1500 }
            }
        });
    };

    createCircProgress('cp-linalool', 24, '#22c55e');
    createCircProgress('cp-citral', 35, '#84cc16');
    createCircProgress('cp-ethyl', 55, '#f59e0b');
    createCircProgress('cp-iso', 74, '#f97316');
    createCircProgress('cp-limonene', 82, '#ef4444');
    createCircProgress('cp-hedione', 89, '#dc2626');

    // 3. Factory Tracking Charts
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, grid: { color: '#f3f4f6' }, border: { display: false } },
            x: { grid: { display: false }, border: { display: false } }
        }
    };

    const ctxFacA = document.getElementById('chartFactoryA');
    let chartFacA;
    if (ctxFacA) {
        chartFacA = new Chart(ctxFacA, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Output',
                    data: [10, 40, 45, 50, 50, 70, 90, 110, 120, 141.12],
                    backgroundColor: '#a5b4fc',
                    borderRadius: 4
                }]
            },
            options: commonChartOptions
        });
    }

    const ctxFacB = document.getElementById('chartFactoryB');
    if (ctxFacB) {
        new Chart(ctxFacB, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Output',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: '#a5b4fc',
                    borderRadius: 4
                }]
            },
            options: commonChartOptions
        });
    }

    const ctxFacC = document.getElementById('chartFactoryC');
    if (ctxFacC) {
        new Chart(ctxFacC, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Output',
                    data: [0, 0, 0, 0, 20, 30, 40, 50, 80, 94.08],
                    backgroundColor: '#a5b4fc',
                    borderRadius: 4
                }]
            },
            options: commonChartOptions
        });
    }

    // Chart Type Toggle
    const chartToggle = document.getElementById('chartTypeToggle');
    if (chartToggle) {
        chartToggle.addEventListener('change', (e) => {
            const newType = e.target.checked ? 'bar' : 'line';
            if (chartFacA) {
                chartFacA.config.type = newType;
                if (newType === 'line') {
                    chartFacA.data.datasets[0].fill = true;
                    chartFacA.data.datasets[0].borderColor = '#818cf8';
                    chartFacA.data.datasets[0].backgroundColor = 'rgba(165, 180, 252, 0.4)';
                    chartFacA.data.datasets[0].tension = 0.4;
                } else {
                    chartFacA.data.datasets[0].fill = false;
                    chartFacA.data.datasets[0].backgroundColor = '#a5b4fc';
                }
                chartFacA.update();
            }
            // Same logic would apply to B and C
        });
    }
});
