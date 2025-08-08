// PriceOptima AI - ML-Powered Dynamic Pricing Engine
class PriceOptimaApp {
    constructor() {
        this.currentUser = null;
        this.currentView = 'dashboard';
        this.mlModels = {
            priceModel: new RandomForestPricingModel(),
            demandModel: new LinearRegressionDemandModel()
        };
        
        // Application data with ML model information
        this.appData = {
            "ml_models": {
                "price_model_accuracy": 0.988,
                "demand_model_accuracy": 0.751,
                "feature_importance": [
                    {"feature": "base_cost", "importance": 0.912398},
                    {"feature": "competitor_avg_price", "importance": 0.075498},
                    {"feature": "demand_score", "importance": 0.003813},
                    {"feature": "brand_strength", "importance": 0.001656},
                    {"feature": "inventory_level", "importance": 0.001298},
                    {"feature": "seasonality_factor", "importance": 0.001273}
                ],
                "training_samples": 800,
                "model_type": "Random Forest + Linear Regression"
            },
            "products": [
                {
                    "sku": "SKU001",
                    "name": "Wireless Headphones Pro",
                    "category": "Electronics",
                    "brand": "TechBrand",
                    "base_cost": 50.00,
                    "current_price": 89.99,
                    "ml_predicted_price": 92.50,
                    "inventory_level": 150,
                    "demand_score": 8.5,
                    "conversion_rate": 0.12,
                    "profit_margin": 0.44,
                    "competitor_avg": 87.99,
                    "confidence_score": 0.94,
                    "price_factors": {
                        "demand_impact": 0.35,
                        "competition_impact": 0.25,
                        "inventory_impact": 0.20,
                        "seasonality_impact": 0.15,
                        "cost_impact": 0.05
                    },
                    "ml_explanation": "ML model recommends 2.8% price increase based on high demand score (8.5/10), favorable competitor positioning, and strong conversion rate. Confidence: 94%"
                },
                {
                    "sku": "SKU002",
                    "name": "Fitness Tracker Elite",
                    "category": "Wearables",
                    "brand": "FitTech",
                    "base_cost": 30.00,
                    "current_price": 59.99,
                    "ml_predicted_price": 54.99,
                    "inventory_level": 75,
                    "demand_score": 7.2,
                    "conversion_rate": 0.08,
                    "profit_margin": 0.50,
                    "competitor_avg": 52.99,
                    "confidence_score": 0.87,
                    "price_factors": {
                        "demand_impact": 0.28,
                        "competition_impact": 0.42,
                        "inventory_impact": 0.15,
                        "seasonality_impact": 0.10,
                        "cost_impact": 0.05
                    },
                    "ml_explanation": "ML model suggests 8.3% price reduction to align with competitive market positioning and boost conversion rates. Confidence: 87%"
                },
                {
                    "sku": "SKU003",
                    "name": "Smart Phone Case Ultra",
                    "category": "Accessories",
                    "brand": "CaseMaker",
                    "base_cost": 8.00,
                    "current_price": 24.99,
                    "ml_predicted_price": 27.99,
                    "inventory_level": 300,
                    "demand_score": 9.1,
                    "conversion_rate": 0.18,
                    "profit_margin": 0.68,
                    "competitor_avg": 26.99,
                    "confidence_score": 0.96,
                    "price_factors": {
                        "demand_impact": 0.45,
                        "competition_impact": 0.20,
                        "inventory_impact": 0.10,
                        "seasonality_impact": 0.20,
                        "cost_impact": 0.05
                    },
                    "ml_explanation": "ML model recommends 12% price increase due to exceptional demand score (9.1/10) and superior conversion rate performance. Confidence: 96%"
                }
            ],
            "analytics": {
                "total_revenue": 125840.50,
                "ml_revenue_boost": 18.7,
                "avg_prediction_accuracy": 0.92,
                "cost_savings": 8450.30,
                "optimization_success_rate": 0.89
            },
            "competitors": [
                {"name": "Amazon", "market_share": 0.35, "avg_response_time": "2.3 hours"},
                {"name": "eBay", "market_share": 0.15, "avg_response_time": "4.1 hours"},
                {"name": "Best Buy", "market_share": 0.12, "avg_response_time": "6.2 hours"}
            ],
            "ab_tests": [
                {
                    "test_name": "Price Elasticity Test - Headphones",
                    "status": "active",
                    "statistical_significance": 0.95,
                    "revenue_lift": 0.12,
                    "sample_size": 1250,
                    "start_date": "2025-01-01"
                }
            ]
        };

        this.charts = {};
        this.realTimeInterval = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showLoginPage();
        this.startRealTimeUpdates();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => this.logout(e));
        }

        // Navigation items - Fixed to handle clicks properly
        document.addEventListener('click', (e) => {
            const navItem = e.target.closest('.nav-item');
            if (navItem) {
                const view = navItem.getAttribute('data-view');
                if (view) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.navigateToView(view);
                }
            }
        });

        // Header actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.refresh-btn')) {
                e.preventDefault();
                this.refreshMLModels();
            }
            
            if (e.target.closest('#bulk-optimize')) {
                e.preventDefault();
                this.bulkOptimizeProducts();
            }
            
            if (e.target.closest('#retrain-models')) {
                e.preventDefault();
                this.retrainMLModels();
            }
            
            if (e.target.closest('#create-test')) {
                e.preventDefault();
                this.createABTest();
            }
            
            if (e.target.closest('#sync-competitors')) {
                e.preventDefault();
                this.syncCompetitorPrices();
            }
        });

        // Modal events
        document.addEventListener('click', (e) => {
            if (e.target.closest('#close-modal')) {
                e.preventDefault();
                this.closeModal();
            }
            
            if (e.target.closest('#accept-recommendation')) {
                e.preventDefault();
                this.acceptRecommendation();
            }
            
            if (e.target.closest('#custom-price')) {
                e.preventDefault();
                this.setCustomPrice();
            }
            
            // Close modal on backdrop click
            if (e.target.classList.contains('modal-backdrop')) {
                this.closeModal();
            }
        });

        // Search and filters
        document.addEventListener('input', (e) => {
            if (e.target.id === 'product-search') {
                this.filterProducts(e.target.value);
            }
        });

        document.addEventListener('change', (e) => {
            if (e.target.id === 'category-filter') {
                this.filterByCategory(e.target.value);
            }
            
            if (e.target.id === 'demand-filter') {
                this.filterByDemand(e.target.value);
            }
            
            if (e.target.id === 'revenue-timeframe') {
                this.updateRevenueChart(e.target.value);
            }
        });
    }

    showLoginPage() {
        const loginPage = document.getElementById('login-page');
        const dashboardPage = document.getElementById('dashboard-page');
        
        if (loginPage) loginPage.classList.remove('hidden');
        if (dashboardPage) dashboardPage.classList.add('hidden');
    }

    showDashboardPage() {
        const loginPage = document.getElementById('login-page');
        const dashboardPage = document.getElementById('dashboard-page');
        
        if (loginPage) loginPage.classList.add('hidden');
        if (dashboardPage) dashboardPage.classList.remove('hidden');
        
        // Initialize dashboard after showing
        setTimeout(() => {
            this.updateDashboard();
            this.renderProducts();
            this.initializeCharts();
            this.generateMLInsights();
        }, 100);
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const loginBtn = document.querySelector('.login-btn');
        const btnText = loginBtn.querySelector('.btn-text');
        const btnIcon = loginBtn.querySelector('.btn-icon');
        const btnLoader = loginBtn.querySelector('.btn-loader');

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (!email || !password) {
            this.showToast('Please enter both email and password', 'error');
            return;
        }

        // Show loading state
        btnText.classList.add('hidden');
        btnIcon.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        loginBtn.disabled = true;

        try {
            // Simulate API call delay
            await this.delay(1500);
            
            // Check demo credentials
            if (email === 'admin@priceoptima.ai' && password === 'demo123') {
                this.currentUser = {
                    email: email,
                    name: 'AI Specialist',
                    role: 'ML Engineer'
                };
                
                this.showToast('Login successful! Welcome to PriceOptima AI', 'success');
                
                // Reset form
                emailInput.value = '';
                passwordInput.value = '';
                
                // Transition to dashboard
                setTimeout(() => this.showDashboardPage(), 500);
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            this.showToast('Invalid email or password. Use demo credentials.', 'error');
        } finally {
            // Reset button state
            btnText.classList.remove('hidden');
            btnIcon.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            loginBtn.disabled = false;
        }
    }

    logout(e) {
        e.preventDefault();
        this.currentUser = null;
        this.showLoginPage();
        this.showToast('Logged out successfully', 'info');
    }

    navigateToView(viewName) {
        console.log('Navigating to:', viewName);
        
        // Update navigation active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`[data-view="${viewName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
        }

        this.currentView = viewName;

        // Load view-specific content
        setTimeout(() => {
            switch(viewName) {
                case 'dashboard':
                    this.updateDashboard();
                    this.generateMLInsights();
                    break;
                case 'products':
                    this.renderProducts();
                    break;
                case 'ml-models':
                    this.renderMLModels();
                    break;
                case 'analytics':
                    this.renderAnalytics();
                    break;
                case 'ab-testing':
                    this.renderABTests();
                    break;
                case 'competitors':
                    this.renderCompetitors();
                    break;
            }
        }, 50);
    }

    updateDashboard() {
        // Update key metrics
        const totalRevenue = document.getElementById('total-revenue');
        const mlAccuracy = document.getElementById('ml-accuracy');
        const costSavings = document.getElementById('cost-savings');
        const activeModels = document.getElementById('active-models');

        if (totalRevenue) {
            totalRevenue.textContent = `$${this.appData.analytics.total_revenue.toLocaleString()}`;
        }
        if (mlAccuracy) {
            mlAccuracy.textContent = `${(this.appData.analytics.avg_prediction_accuracy * 100).toFixed(1)}%`;
        }
        if (costSavings) {
            costSavings.textContent = `$${this.appData.analytics.cost_savings.toLocaleString()}`;
        }
        if (activeModels) {
            activeModels.textContent = '2';
        }

        // Update trend indicators with realistic animations
        this.animateMetricChanges();
    }

    animateMetricChanges() {
        const revenueChange = document.getElementById('revenue-change');
        const accuracyChange = document.getElementById('accuracy-change');
        const costChange = document.getElementById('cost-change');

        // Simulate real-time changes
        if (revenueChange) {
            const change = (15 + Math.random() * 10).toFixed(1);
            revenueChange.textContent = `+${change}%`;
        }
        if (accuracyChange) {
            const change = (1.5 + Math.random() * 2).toFixed(1);
            accuracyChange.textContent = `+${change}%`;
        }
        if (costChange) {
            const change = (8 + Math.random() * 10).toFixed(1);
            costChange.textContent = `+${change}%`;
        }
    }

    generateMLInsights() {
        const insightsContainer = document.getElementById('ml-insights');
        if (!insightsContainer) return;

        const insights = [
            {
                type: 'Price Optimization',
                content: 'Smart Phone Case Ultra shows 96% confidence for 12% price increase. High demand signals and superior conversion rates support this recommendation.',
                action: 'Apply Recommendation'
            },
            {
                type: 'Inventory Alert',
                content: 'Fitness Tracker Elite inventory below optimal threshold. ML suggests price reduction to increase velocity and prevent stockouts.',
                action: 'Adjust Pricing'
            },
            {
                type: 'Market Opportunity',
                content: 'Competitor analysis reveals 15% pricing gap in Electronics category. Revenue opportunity: $8,500 monthly.',
                action: 'Explore Opportunity'
            },
            {
                type: 'Demand Prediction',
                content: 'Linear regression model forecasts 23% demand increase for Wireless Headphones Pro next week. Consider inventory adjustment.',
                action: 'View Forecast'
            }
        ];

        insightsContainer.innerHTML = insights.map(insight => `
            <div class="insight-card glass-morphism">
                <div class="insight-header">
                    <span class="insight-type">${insight.type}</span>
                </div>
                <div class="insight-content">${insight.content}</div>
                <button class="insight-action">${insight.action}</button>
            </div>
        `).join('');
    }

    renderProducts() {
        const tbody = document.getElementById('products-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.appData.products.forEach(product => {
            const priceChange = ((product.ml_predicted_price - product.current_price) / product.current_price * 100);
            const changeClass = priceChange > 0 ? 'positive' : 'negative';
            const changeText = priceChange > 0 ? `+${priceChange.toFixed(1)}%` : `${priceChange.toFixed(1)}%`;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="product-name">${product.name}</div>
                    <div class="product-details">${product.brand} • ${product.category}</div>
                </td>
                <td>
                    <div class="price-current">$${product.current_price.toFixed(2)}</div>
                </td>
                <td>
                    <div class="price-recommended">$${product.ml_predicted_price.toFixed(2)}</div>
                    <div class="price-change ${changeClass}">${changeText}</div>
                </td>
                <td>
                    <div class="confidence-score">
                        <div class="confidence-bar">
                            <div class="confidence-fill" style="width: ${product.confidence_score * 100}%"></div>
                        </div>
                        <span>${(product.confidence_score * 100).toFixed(0)}%</span>
                    </div>
                </td>
                <td>
                    <div class="demand-score">
                        <div class="demand-bar">
                            <div class="demand-fill" style="width: ${product.demand_score * 10}%"></div>
                        </div>
                        <span>${product.demand_score}/10</span>
                    </div>
                </td>
                <td>$${product.competitor_avg.toFixed(2)}</td>
                <td>
                    <button class="glass-btn" onclick="app.showProductModal('${product.sku}')" style="padding: 6px 12px; font-size: 12px;">
                        <i class="fas fa-chart-line"></i>
                        Analyze
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    showProductModal(sku) {
        const product = this.appData.products.find(p => p.sku === sku);
        if (!product) return;

        const modal = document.getElementById('product-modal');
        const productName = document.getElementById('modal-product-name');
        const currentPrice = document.getElementById('modal-current-price');
        const recommendedPrice = document.getElementById('modal-recommended-price');
        const priceChange = document.getElementById('modal-price-change');
        const explanation = document.getElementById('modal-explanation');
        const confidenceFill = document.getElementById('modal-confidence-fill');
        const confidenceScore = document.getElementById('modal-confidence-score');
        const demand = document.getElementById('modal-demand');
        const conversion = document.getElementById('modal-conversion');
        const inventory = document.getElementById('modal-inventory');

        if (productName) productName.textContent = product.name;
        if (currentPrice) currentPrice.textContent = `$${product.current_price.toFixed(2)}`;
        if (recommendedPrice) recommendedPrice.textContent = `$${product.ml_predicted_price.toFixed(2)}`;
        
        const changePercent = ((product.ml_predicted_price - product.current_price) / product.current_price * 100);
        if (priceChange) {
            priceChange.textContent = `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(1)}%`;
            priceChange.style.color = changePercent > 0 ? '#22c55e' : '#ef4444';
        }

        if (explanation) explanation.textContent = product.ml_explanation;
        if (confidenceFill) confidenceFill.style.width = `${product.confidence_score * 100}%`;
        if (confidenceScore) confidenceScore.textContent = `${(product.confidence_score * 100).toFixed(0)}%`;
        if (demand) demand.textContent = `${product.demand_score}/10`;
        if (conversion) conversion.textContent = `${(product.conversion_rate * 100).toFixed(1)}%`;
        if (inventory) inventory.textContent = `${product.inventory_level} units`;

        modal.classList.remove('hidden');
        this.currentProductSku = sku;
    }

    closeModal() {
        const modal = document.getElementById('product-modal');
        modal.classList.add('hidden');
        this.currentProductSku = null;
    }

    acceptRecommendation() {
        if (!this.currentProductSku) return;

        const product = this.appData.products.find(p => p.sku === this.currentProductSku);
        if (product) {
            product.current_price = product.ml_predicted_price;
            this.renderProducts();
            this.closeModal();
            this.showToast(`ML recommendation applied for ${product.name}`, 'success');
        }
    }

    setCustomPrice() {
        if (!this.currentProductSku) return;

        const product = this.appData.products.find(p => p.sku === this.currentProductSku);
        if (!product) return;

        const newPrice = prompt(`Enter new price for ${product.name}:`, product.current_price.toFixed(2));
        if (newPrice && !isNaN(newPrice) && parseFloat(newPrice) > 0) {
            product.current_price = parseFloat(newPrice);
            this.renderProducts();
            this.closeModal();
            this.showToast(`Custom price set for ${product.name}`, 'success');
        }
    }

    renderMLModels() {
        // Render feature importance
        const featureList = document.getElementById('feature-importance-list');
        if (featureList) {
            featureList.innerHTML = this.appData.ml_models.feature_importance.map(feature => `
                <div class="feature-item">
                    <span class="feature-name">${this.formatFeatureName(feature.feature)}</span>
                    <div class="feature-bar-container">
                        <div class="feature-bar" style="width: ${feature.importance * 100}%"></div>
                    </div>
                    <span class="feature-importance-value">${(feature.importance * 100).toFixed(1)}%</span>
                </div>
            `).join('');
        }
    }

    formatFeatureName(feature) {
        return feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    renderAnalytics() {
        setTimeout(() => {
            this.initAnalyticsCharts();
        }, 100);
    }

    renderABTests() {
        const container = document.getElementById('ab-tests-container');
        if (!container) return;

        const tests = [
            {
                title: 'Premium Pricing Strategy',
                description: 'Testing 10% price increase on high-demand electronics',
                status: 'active',
                progress: 65,
                conversionRate: 12.5,
                revenueImpact: 8.2,
                significance: 0.95
            },
            {
                title: 'Dynamic Competitor Matching',
                description: 'Real-time price matching with top 3 competitors',
                status: 'completed',
                progress: 100,
                conversionRate: 15.8,
                revenueImpact: 3.1,
                significance: 0.98
            },
            {
                title: 'Inventory-Based Pricing',
                description: 'Price adjustment based on stock levels using ML',
                status: 'active',
                progress: 23,
                conversionRate: 0,
                revenueImpact: 0,
                significance: 0.45
            }
        ];

        container.innerHTML = tests.map(test => `
            <div class="test-card glass-morphism ${test.status}">
                <div class="test-header">
                    <div>
                        <div class="test-title">${test.title}</div>
                        <div class="test-description">${test.description}</div>
                    </div>
                    <span class="test-status-badge ${test.status}">${test.status.toUpperCase()}</span>
                </div>
                <div class="test-metrics">
                    <div class="test-metric">
                        <div class="test-metric-label">Conversion Rate</div>
                        <div class="test-metric-value">${test.conversionRate}%</div>
                    </div>
                    <div class="test-metric">
                        <div class="test-metric-label">Revenue Impact</div>
                        <div class="test-metric-value">+${test.revenueImpact}%</div>
                    </div>
                </div>
                <div class="test-progress">
                    <div class="test-progress-bar">
                        <div class="test-progress-fill" style="width: ${test.progress}%"></div>
                    </div>
                    <div class="test-progress-text">${test.progress}% complete${test.significance ? ` • ${(test.significance * 100).toFixed(0)}% confidence` : ''}</div>
                </div>
            </div>
        `).join('');
    }

    renderCompetitors() {
        const container = document.getElementById('competitors-container');
        if (!container) return;

        container.innerHTML = this.appData.competitors.map(competitor => `
            <div class="competitor-card glass-morphism">
                <div class="competitor-header">
                    <h3 class="competitor-name">${competitor.name}</h3>
                    <span class="market-share">${(competitor.market_share * 100).toFixed(1)}%</span>
                </div>
                <div class="competitor-metrics">
                    <p><strong>Market Share:</strong> ${(competitor.market_share * 100).toFixed(1)}%</p>
                    <p><strong>Avg Response Time:</strong> ${competitor.avg_response_time}</p>
                    <p><strong>Price Changes Today:</strong> ${Math.floor(Math.random() * 8) + 1}</p>
                    <p><strong>Last Sync:</strong> ${Math.floor(Math.random() * 30) + 1} min ago</p>
                </div>
            </div>
        `).join('');
    }

    initializeCharts() {
        // Revenue Chart
        const revenueCtx = document.getElementById('revenue-chart');
        if (revenueCtx && typeof Chart !== 'undefined') {
            this.charts.revenue = new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [
                        {
                            label: 'Total Revenue',
                            data: [98000, 102000, 115000, 108000, 125000, 140000, 155000],
                            borderColor: '#1FB8CD',
                            backgroundColor: 'rgba(31, 184, 205, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 6,
                            pointHoverRadius: 8
                        },
                        {
                            label: 'ML Revenue Boost',
                            data: [5000, 8000, 12000, 15000, 18000, 23000, 28000],
                            borderColor: '#22c55e',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 4,
                            pointHoverRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            labels: { color: '#f5f5f5' }
                        }
                    },
                    scales: {
                        x: {
                            ticks: { color: '#a3a3a3' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        y: {
                            ticks: {
                                color: '#a3a3a3',
                                callback: function(value) {
                                    return '$' + (value / 1000) + 'K';
                                }
                            },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                    }
                }
            });
        }

        // Feature Importance Chart
        const featureCtx = document.getElementById('feature-chart');
        if (featureCtx && typeof Chart !== 'undefined') {
            this.charts.features = new Chart(featureCtx, {
                type: 'doughnut',
                data: {
                    labels: this.appData.ml_models.feature_importance.map(f => this.formatFeatureName(f.feature)),
                    datasets: [{
                        data: this.appData.ml_models.feature_importance.map(f => f.importance * 100),
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#f5f5f5' }
                        }
                    }
                }
            });
        }
    }

    initAnalyticsCharts() {
        // Price vs Conversion Chart
        const priceConversionCtx = document.getElementById('price-conversion-chart');
        if (priceConversionCtx && typeof Chart !== 'undefined') {
            this.charts.priceConversion = new Chart(priceConversionCtx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Products',
                        data: this.appData.products.map(p => ({
                            x: p.current_price,
                            y: p.conversion_rate * 100,
                            productName: p.name
                        })),
                        backgroundColor: '#1FB8CD',
                        pointRadius: 8,
                        pointHoverRadius: 12
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                title: function(context) {
                                    return context[0].raw.productName;
                                },
                                label: function(context) {
                                    return [
                                        `Price: $${context.parsed.x}`,
                                        `Conversion: ${context.parsed.y.toFixed(1)}%`
                                    ];
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Price ($)',
                                color: '#f5f5f5'
                            },
                            ticks: { color: '#a3a3a3' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Conversion Rate (%)',
                                color: '#f5f5f5'
                            },
                            ticks: { color: '#a3a3a3' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                    }
                }
            });
        }

        // Competitor Comparison
        const competitorCtx = document.getElementById('competitor-chart');
        if (competitorCtx && typeof Chart !== 'undefined') {
            this.charts.competitor = new Chart(competitorCtx, {
                type: 'bar',
                data: {
                    labels: this.appData.products.map(p => p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name),
                    datasets: [
                        {
                            label: 'Our Price',
                            data: this.appData.products.map(p => p.current_price),
                            backgroundColor: '#1FB8CD',
                            borderRadius: 4
                        },
                        {
                            label: 'Competitor Avg',
                            data: this.appData.products.map(p => p.competitor_avg),
                            backgroundColor: '#FFC185',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: '#f5f5f5' }
                        }
                    },
                    scales: {
                        x: {
                            ticks: { color: '#a3a3a3' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        y: {
                            ticks: {
                                color: '#a3a3a3',
                                callback: function(value) {
                                    return '$' + value;
                                }
                            },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                    }
                }
            });
        }

        // Demand Accuracy Chart
        const demandCtx = document.getElementById('demand-accuracy-chart');
        if (demandCtx && typeof Chart !== 'undefined') {
            const actualDemand = [7.2, 8.1, 6.8, 9.0, 8.5];
            const predictedDemand = [7.0, 8.3, 6.5, 9.2, 8.7];
            
            this.charts.demandAccuracy = new Chart(demandCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                    datasets: [
                        {
                            label: 'Actual Demand',
                            data: actualDemand,
                            borderColor: '#22c55e',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            tension: 0.4,
                            pointRadius: 6
                        },
                        {
                            label: 'ML Predicted',
                            data: predictedDemand,
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.4,
                            borderDash: [5, 5],
                            pointRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: '#f5f5f5' }
                        }
                    },
                    scales: {
                        x: {
                            ticks: { color: '#a3a3a3' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Demand Score',
                                color: '#f5f5f5'
                            },
                            ticks: { color: '#a3a3a3' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                    }
                }
            });
        }
    }

    // ML-specific functions with proper toast notifications
    refreshMLModels() {
        this.showToast('Refreshing ML models and predictions...', 'info');
        
        // Show loading animation on button
        const refreshBtn = document.querySelector('.refresh-btn');
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Refreshing...</span>';
            refreshBtn.disabled = true;
        }
        
        // Simulate ML model refresh
        setTimeout(() => {
            // Update predictions with slight variations
            this.appData.products.forEach(product => {
                const variation = (Math.random() - 0.5) * 0.05; // ±2.5% variation
                product.ml_predicted_price = Math.max(
                    product.base_cost * 1.1, 
                    product.ml_predicted_price * (1 + variation)
                );
                product.confidence_score = Math.min(0.99, Math.max(0.7, product.confidence_score + (Math.random() - 0.5) * 0.05));
            });
            
            this.renderProducts();
            this.showToast('ML models refreshed successfully! New predictions generated.', 'success');
            
            // Reset button
            if (refreshBtn) {
                refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i><span>Refresh ML</span>';
                refreshBtn.disabled = false;
            }
        }, 2000);
    }

    bulkOptimizeProducts() {
        this.showToast('Running bulk ML optimization across all products...', 'info');
        
        setTimeout(() => {
            let optimizedCount = 0;
            this.appData.products.forEach(product => {
                if (Math.abs(product.ml_predicted_price - product.current_price) > 0.01) {
                    product.current_price = product.ml_predicted_price;
                    optimizedCount++;
                }
            });
            
            this.renderProducts();
            this.showToast(`✅ ${optimizedCount} products optimized using ML recommendations. Revenue impact: +$${Math.floor(Math.random() * 5000 + 2000)}.`, 'success');
        }, 3000);
    }

    retrainMLModels() {
        this.showToast('Retraining ML models with latest data. This may take a few minutes...', 'info');
        
        setTimeout(() => {
            // Simulate model retraining
            this.appData.ml_models.price_model_accuracy = Math.min(0.995, this.appData.ml_models.price_model_accuracy + 0.001);
            this.appData.ml_models.demand_model_accuracy = Math.min(0.85, this.appData.ml_models.demand_model_accuracy + 0.005);
            
            this.updateDashboard();
            this.showToast('🎯 ML models retrained successfully! Price accuracy: 99.0%, Demand accuracy: 75.6%', 'success');
        }, 4000);
    }

    createABTest() {
        const testName = prompt('Enter A/B test name:');
        if (testName) {
            this.showToast(`🧪 A/B test "${testName}" created with statistical significance tracking. Sample size: 1,000 users.`, 'success');
        }
    }

    syncCompetitorPrices() {
        this.showToast('Syncing competitor prices via API integrations...', 'info');
        
        setTimeout(() => {
            // Update competitor averages
            this.appData.products.forEach(product => {
                const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
                product.competitor_avg = Math.max(product.base_cost, product.competitor_avg * (1 + variation));
            });
            
            this.renderProducts();
            this.renderCompetitors();
            this.showToast('📊 Competitor prices synced successfully. 15 price changes detected across 3 platforms.', 'success');
        }, 2500);
    }

    filterProducts(searchTerm) {
        const rows = document.querySelectorAll('#products-tbody tr');
        rows.forEach(row => {
            const productName = row.querySelector('.product-name')?.textContent.toLowerCase();
            const isVisible = !searchTerm || productName?.includes(searchTerm.toLowerCase());
            row.style.display = isVisible ? 'table-row' : 'none';
        });
    }

    filterByCategory(category) {
        const rows = document.querySelectorAll('#products-tbody tr');
        rows.forEach(row => {
            const productDetails = row.querySelector('.product-details')?.textContent;
            const isVisible = !category || productDetails?.includes(category);
            row.style.display = isVisible ? 'table-row' : 'none';
        });
    }

    filterByDemand(demandLevel) {
        if (!demandLevel) {
            document.querySelectorAll('#products-tbody tr').forEach(row => {
                row.style.display = 'table-row';
            });
            return;
        }

        const rows = document.querySelectorAll('#products-tbody tr');
        rows.forEach((row, index) => {
            const product = this.appData.products[index];
            let isVisible = false;
            
            if (demandLevel === 'high' && product.demand_score >= 8) isVisible = true;
            if (demandLevel === 'medium' && product.demand_score >= 5 && product.demand_score < 8) isVisible = true;
            if (demandLevel === 'low' && product.demand_score < 5) isVisible = true;
            
            row.style.display = isVisible ? 'table-row' : 'none';
        });
    }

    startRealTimeUpdates() {
        this.realTimeInterval = setInterval(() => {
            if (this.currentView === 'dashboard') {
                // Simulate real-time metric updates
                this.appData.analytics.total_revenue += (Math.random() - 0.4) * 1000;
                this.updateDashboard();
                
                // Update charts if they exist
                if (this.charts.revenue) {
                    const lastValue = this.charts.revenue.data.datasets[0].data.slice(-1)[0];
                    const newValue = lastValue + (Math.random() - 0.4) * 5000;
                    this.charts.revenue.data.datasets[0].data.push(newValue);
                    this.charts.revenue.data.labels.push(new Date().toLocaleTimeString().slice(0, 5));
                    
                    // Keep only last 10 points
                    if (this.charts.revenue.data.labels.length > 10) {
                        this.charts.revenue.data.datasets[0].data.shift();
                        this.charts.revenue.data.datasets[1].data.shift();
                        this.charts.revenue.data.labels.shift();
                    }
                    
                    // Also update the ML boost line
                    const lastBoost = this.charts.revenue.data.datasets[1].data.slice(-1)[0];
                    this.charts.revenue.data.datasets[1].data.push(lastBoost + Math.random() * 1000);
                    
                    this.charts.revenue.update('none');
                }
            }
        }, 30000); // Update every 30 seconds
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${this.getToastIcon(type)}"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.transform = 'translateX(100%)';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);

        // Remove on click
        toast.addEventListener('click', () => {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        });
    }

    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ML Model Classes (Simplified implementations for demo)
class RandomForestPricingModel {
    constructor() {
        this.featureImportance = {
            'base_cost': 0.912398,
            'competitor_avg_price': 0.075498,
            'demand_score': 0.003813,
            'brand_strength': 0.001656,
            'inventory_level': 0.001298,
            'seasonality_factor': 0.001273
        };
    }

    predict(features) {
        // Simplified Random Forest prediction
        let prediction = features.base_cost * 1.2; // Base markup
        
        // Apply feature weights
        prediction += (features.demand_score / 10) * features.base_cost * 0.3;
        prediction += Math.max(0, features.competitor_avg_price - features.base_cost) * 0.8;
        prediction -= (features.inventory_level > 200 ? 0.05 : 0) * features.base_cost;
        
        // Add some randomness to simulate model uncertainty
        const uncertainty = (Math.random() - 0.5) * 0.1;
        prediction *= (1 + uncertainty);
        
        return {
            price: Math.max(features.base_cost * 1.1, prediction),
            confidence: 0.85 + Math.random() * 0.14
        };
    }
}

class LinearRegressionDemandModel {
    constructor() {
        this.coefficients = {
            price: -0.02,
            competitor_price: 0.015,
            inventory: 0.0001,
            seasonality: 0.1,
            intercept: 5.0
        };
    }

    predict(features) {
        let demand = this.coefficients.intercept;
        demand += features.current_price * this.coefficients.price;
        demand += features.competitor_avg * this.coefficients.competitor_price;
        demand += features.inventory_level * this.coefficients.inventory;
        demand += (Math.sin(Date.now() / (1000 * 60 * 60 * 24 * 30)) + 1) * this.coefficients.seasonality; // Monthly seasonality
        
        return Math.max(1, Math.min(10, demand + (Math.random() - 0.5) * 0.5));
    }
}

// Global app instance
let app;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app = new PriceOptimaApp();
    window.app = app; // Make globally accessible
});

// Fallback initialization
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        if (!app) {
            app = new PriceOptimaApp();
            window.app = app;
        }
    }, 100);
}