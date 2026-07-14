// Force Light Mode by default
document.documentElement.setAttribute('data-theme', 'light');

// MOCK DATABASE & FETCH FALLBACK SYSTEM FOR LOCAL/DEMO RUNNING
function getLocalMockDb() {
    let db = localStorage.getItem('key_shop_mock_db');
    if (!db) {
        db = {
            users: [
                { username: 'admin', password: 'ducduy2202@', coins: 500, funlinkCompletedToday: 1, nhapmaCompletedToday: 2, link4mCompletedToday: 0, trafficvnCompletedToday: 0, lastTaskResetDate: '2026-07-13', createdIp: '127.0.0.1' },
                { username: 'nguyenducduy', password: '123', coins: 150, funlinkCompletedToday: 0, nhapmaCompletedToday: 1, link4mCompletedToday: 0, trafficvnCompletedToday: 0, lastTaskResetDate: '2026-07-13', createdIp: '192.168.1.5' },
                { username: 'testuser', password: '123', coins: 80, funlinkCompletedToday: 2, nhapmaCompletedToday: 4, link4mCompletedToday: 3, trafficvnCompletedToday: 0, lastTaskResetDate: '2026-07-13', createdIp: '192.168.1.5' }
            ],
            products: [
                { id: 1, key_type: '1h', name: 'Key Imgui Menu 1 Giờ', description: '✅ Fix văng game\n✅ Sửa Esp, Fix Nháy\n✅ Tăng khả năng Anti-Ban', price: 100, image_url: 'menu_banner.png', duration_text: '1 tiếng dùng' },
                { id: 2, key_type: '2h', name: 'Key Imgui Menu 2 Giờ', description: '✅ Fix văng game\n✅ Sửa Esp, Fix Nháy\n✅ Tăng khả năng Anti-Ban', price: 150, image_url: 'menu_banner.png', duration_text: '2 tiếng dùng' },
                { id: 3, key_type: '4h', name: 'Key Imgui Menu 4 Giờ', description: '✅ Fix văng game\n✅ Sửa Esp, Fix Nháy\n✅ Tăng khả năng Anti-Ban', price: 200, image_url: 'menu_banner.png', duration_text: '4 tiếng dùng' }
            ],
            downloads: [
                { id: 1, name: 'Imgui Menu 1.1', description: 'Bản hack mới nhất hỗ trợ sửa lỗi ESP nháy và văng game cho giả lập BlueStacks.', image_url: 'rar_icon.jpg', download_url: 'https://www.mediafire.com/file/v2gt95n5xb7ssrd/Imgui_1.1.rar/file' }
            ],
            keys: [
                { id: 1, key_code: 'KEY-1H-TEST12345', key_type: '1h', is_redeemed: 0 },
                { id: 2, key_code: 'KEY-2H-TEST12345', key_type: '2h', is_redeemed: 0 },
                { id: 3, key_code: 'KEY-4H-TEST12345', key_type: '4h', is_redeemed: 0 }
            ],
            taskHistory: [
                { username: 'admin', provider: 'Funlink', coinsEarned: 200, timestamp: Date.now() - 3600000 }
            ],
            redeemHistory: [],
            guidesSettings: { video_url: 'hdsd.mp4' },
            errorFixes: [
                { id: 1, title: '[Lỗi] VirtualAllocEx Failed', description: 'Vui lòng đổi phiên bản giả lập của bạn sang bản phù hợp hơn. Nhấp tải phiên bản BlueStacks chuẩn bên dưới.', image_url: 'error1.png', download_url: 'https://www.mediafire.com/file/nqsw13sehe8lqa9/BlueStacksInstaller_5.22.130.1019_native_9d9f9cbb1eef49c16908fbe6956709d3_MzsxNQ==.exe/file' },
                { id: 2, title: '[Lỗi] LoadLibraryA returned Null', description: '1️⃣ Nhấn giữ tổ hợp phím Windows + R trên bàn phím.\n2️⃣ Nhập từ khóa Temp (Không nhập dấu phần trăm %, không có ngoặc kép).\n3️⃣ Tìm và xóa toàn bộ các tệp tin: AotBst.dll, cimgui.dll, và Client.dll.\n4️⃣ Khởi chạy lại Tool Inject để kiểm tra kết quả.', image_url: 'error2.png', download_url: '' },
                { id: 3, title: '[Lỗi] Không Lên Chức Năng', description: 'Vui lòng tải và cài đặt phiên bản Free Fire Fix Lỗi chuẩn bên dưới để khắc phục tình trạng không hiển thị menu chức năng.', image_url: '', download_url: 'https://www.mediafire.com/file/2hbbqa5w5koycb1/FreeFire-Normal-V7.xapk/file' }
            ]
        };
        localStorage.setItem('key_shop_mock_db', JSON.stringify(db));
    } else {
        db = JSON.parse(db);
    }

    // Migration step
    let modified = false;
    if (!db.guidesSettings) {
        db.guidesSettings = { video_url: 'hdsd.mp4' };
        modified = true;
    }
    if (!db.errorFixes) {
        db.errorFixes = [
            { id: 1, title: '[Lỗi] VirtualAllocEx Failed', description: 'Vui lòng đổi phiên bản giả lập của bạn sang bản phù hợp hơn. Nhấp tải phiên bản BlueStacks chuẩn bên dưới.', image_url: 'error1.png', download_url: 'https://www.mediafire.com/file/nqsw13sehe8lqa9/BlueStacksInstaller_5.22.130.1019_native_9d9f9cbb1eef49c16908fbe6956709d3_MzsxNQ==.exe/file' },
            { id: 2, title: '[Lỗi] LoadLibraryA returned Null', description: '1️⃣ Nhấn giữ tổ hợp phím Windows + R trên bàn phím.\n2️⃣ Nhập từ khóa Temp (Không nhập dấu phần trăm %, không có ngoặc kép).\n3️⃣ Tìm và xóa toàn bộ các tệp tin: AotBst.dll, cimgui.dll, và Client.dll.\n4️⃣ Khởi chạy lại Tool Inject để kiểm tra kết quả.', image_url: 'error2.png', download_url: '' },
            { id: 3, title: '[Lỗi] Không Lên Chức Năng', description: 'Vui lòng tải và cài đặt phiên bản Free Fire Fix Lỗi chuẩn bên dưới để khắc phục tình trạng không hiển thị menu chức năng.', image_url: '', download_url: 'https://www.mediafire.com/file/2hbbqa5w5koycb1/FreeFire-Normal-V7.xapk/file' }
        ];
        modified = true;
    }
    if (modified) {
        localStorage.setItem('key_shop_mock_db', JSON.stringify(db));
    }

    return db;
}

function saveLocalMockDb(db) {
    localStorage.setItem('key_shop_mock_db', JSON.stringify(db));
}

async function mockFetch(url, options) {
    const db = getLocalMockDb();
    const cleanUrl = url.split('?')[0];
    const body = (options && options.body) ? JSON.parse(options.body) : null;
    
    let resData = { status: 'error', message: 'Endpoint not found' };
    
    let loggedInUser = localStorage.getItem('key_shop_mock_user') || 'nguyenducduy';
    let user = db.users.find(u => u.username === loggedInUser);
    if (!user) {
        user = db.users[1] || db.users[0];
        loggedInUser = user.username;
        localStorage.setItem('key_shop_mock_user', loggedInUser);
    }
    
    if (cleanUrl === '/api/auth') {
        if (body.mode === 'register') {
            if (db.users.some(u => u.username === body.username)) {
                resData = { status: 'error', message: 'Tên đăng nhập đã tồn tại!' };
            } else {
                db.users.push({
                    username: body.username,
                    password: body.password,
                    coins: 0,
                    funlinkCompletedToday: 0,
                    nhapmaCompletedToday: 0,
                    link4mCompletedToday: 0,
                    trafficvnCompletedToday: 0,
                    createdIp: '127.0.0.1'
                });
                saveLocalMockDb(db);
                resData = { status: 'success', message: 'Đăng ký tài khoản (Mock) thành công!' };
            }
        } else {
            const u = db.users.find(x => x.username === body.username && x.password === body.password);
            if (u) {
                localStorage.setItem('key_shop_mock_user', u.username);
                resData = { status: 'success', message: 'Đăng nhập (Mock) thành công!', sessionToken: 'mock-session-token', username: u.username };
            } else {
                resData = { status: 'error', message: 'Tài khoản hoặc mật khẩu không chính xác!' };
            }
        }
    } else if (cleanUrl === '/api/state') {
        // Intercept url reward simulation
        const pageParams = new URLSearchParams(window.location.search);
        if (pageParams.get('reward_token')) {
            const provider = user.activeTaskProvider || 'Funlink';
            const reward = (provider === 'Funlink' && user.funlinkCompletedToday === 0) ? 200 : 100;
            
            user.coins += reward;
            if (provider === 'Funlink') user.funlinkCompletedToday++;
            else if (provider === 'Nhập mã') user.nhapmaCompletedToday++;
            else if (provider === 'Link4m') user.link4mCompletedToday++;
            else if (provider === 'Traffic VN') user.trafficvnCompletedToday = (user.trafficvnCompletedToday || 0) + 1;
            
            user.activeTaskProvider = null;
            user.activeTaskStartedAt = null;
            
            db.taskHistory.unshift({
                username: user.username,
                provider: provider,
                coinsEarned: reward,
                timestamp: Date.now()
            });
            saveLocalMockDb(db);
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        const stocks = {};
        db.products.forEach(p => {
            stocks[p.key_type] = db.keys.filter(k => k.key_type === p.key_type && k.is_redeemed === 0).length;
        });
        
        const purchased = {};
        db.products.forEach(p => {
            purchased[p.key_type] = db.keys.filter(k => k.key_type === p.key_type && k.is_redeemed === 1).length;
        });

        let activeTask = null;
        if (user.activeTaskProvider) {
            activeTask = {
                provider: user.activeTaskProvider,
                shortlinkUrl: `${window.location.origin}${window.location.pathname}?reward_token=mock_reward&user=${user.username}&session_token=mock-session-token`,
                startedAt: user.activeTaskStartedAt
            };
        }

        resData = {
            status: 'success',
            user: {
                username: user.username,
                coins: user.coins,
                funlinkCompletedToday: user.funlinkCompletedToday,
                nhapmaCompletedToday: user.nhapmaCompletedToday,
                link4mCompletedToday: user.link4mCompletedToday,
                trafficvnCompletedToday: user.trafficvnCompletedToday || 0,
                isAdmin: user.username === 'admin',
                activeTask: activeTask
            },
            taskHistory: db.taskHistory.filter(h => h.username === user.username),
            redeemHistory: db.redeemHistory.filter(h => h.username === user.username),
            products: db.products,
            downloads: db.downloads,
            guidesSettings: db.guidesSettings || { video_url: 'hdsd.mp4' },
            errorFixes: db.errorFixes || [],
            stocks: stocks,
            purchased: purchased
        };
    } else if (cleanUrl === '/api/start-task') {
        user.activeTaskProvider = body.provider;
        user.activeTaskStartedAt = Date.now();
        saveLocalMockDb(db);
        
        const callbackUrl = `${window.location.origin}${window.location.pathname}?reward_token=mock_reward&user=${user.username}&session_token=mock-session-token`;
        resData = { status: 'success', shortlinkUrl: callbackUrl };
    } else if (cleanUrl === '/api/cancel-task') {
        user.activeTaskProvider = null;
        user.activeTaskStartedAt = null;
        saveLocalMockDb(db);
        resData = { status: 'success', message: 'Đã hủy nhiệm vụ thành công!' };
    } else if (cleanUrl === '/api/purchase-key') {
        const keyItem = db.keys.find(k => k.key_type === body.keyType && k.is_redeemed === 0);
        if (!keyItem) {
            resData = { status: 'error', message: 'Sản phẩm này hiện đang hết hàng!' };
        } else if (user.coins < body.price) {
            resData = { status: 'error', message: 'Bạn không đủ xu để thực hiện giao dịch này!' };
        } else {
            user.coins -= body.price;
            keyItem.is_redeemed = 1;
            keyItem.redeemed_by = user.username;
            
            db.redeemHistory.unshift({
                username: user.username,
                itemName: body.label,
                cost: body.price,
                key: keyItem.key_code,
                timestamp: Date.now()
            });
            saveLocalMockDb(db);
            resData = { status: 'success', key: keyItem.key_code };
        }
    } else if (cleanUrl === '/api/logout') {
        resData = { status: 'success' };
    }
    
    return {
        ok: true,
        json: async () => resData
    };
}

(function() {
    const originalFetch = window.fetch;
    window.fetch = async function(url, options) {
        const isLocalFile = window.location.protocol === 'file:';
        const isPythonServer = window.location.port === '8000';
        if (isLocalFile || isPythonServer) {
            return mockFetch(url, options);
        }
        try {
            return await originalFetch(url, options);
        } catch (err) {
            console.warn("Fetch failed, falling back to local mock server...", err);
            return mockFetch(url, options);
        }
    };
})();

// CLIENT-SIDE ENGINE (Node.js + PostgreSQL Backend Integrated)
let sessionToken = localStorage.getItem('sessionToken') || '';
let currentUser = null; // Will store username
let userCoins = 0;
let isCreatingLink = false;

// UI Tabs list
const mainDashboard = document.getElementById('appContainer');
const authSection = document.getElementById('authWrapper');

// DOM Loader
document.addEventListener('DOMContentLoaded', () => {
    // Check URL parameters for callback rewards from shortlinks
    handleUrlCallback();

    // Hook forms submission
    initAuthForms();

    // Render client state
    refreshState();
});

// Get authorization headers
function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
    };
}

// Fetch user state and update UI
async function refreshState() {
    if (!sessionToken) {
        showLoginView();
        return;
    }

    try {
        const res = await fetch('/api/state', {
            headers: getHeaders()
        });
        const data = await res.json();

        if (data.status === 'success') {
            currentUser = data.user.username;
            userCoins = data.user.coins;
            showDashboardView();
            updateUI(data);
        } else {
            showToast(data.message || 'Phiên làm việc hết hạn!', 'error');
            if (data.message && data.message.includes('database')) {
                // Do not force logout to let developer inspect DB error message
            } else {
                logout();
            }
        }
    } catch (err) {
        console.error("Lỗi khi tải dữ liệu từ máy chủ:", err);
        showToast(`Lỗi kết nối đến máy chủ: ${err.message}`, "error");
    }
}

function showLoginView() {
    mainDashboard.classList.remove('visible');
    authSection.classList.remove('hidden');
}

function showDashboardView() {
    authSection.classList.add('hidden');
    mainDashboard.classList.add('visible');
}

// Update DOM components
function updateUI(data) {
    const user = data.user;

    // Set headers text info
    const sidebarUser = document.getElementById('sidebarUsername');
    if (sidebarUser) sidebarUser.innerText = user.username;

    const avatarLetter = document.getElementById('avatarLetter');
    if (avatarLetter && user.username) {
        avatarLetter.innerText = user.username.charAt(0).toUpperCase();
    }

    const coinBalance = document.querySelector('.coin-balance-display');
    if (coinBalance) coinBalance.innerText = user.coins;

    // Toggle Admin button strictly for admin users
    const adminTabBtn = document.getElementById('navAdminBtn');
    const adminTitle = document.getElementById('adminTitle');
    if (user.isAdmin) {
        if (adminTabBtn) adminTabBtn.style.display = 'flex';
        if (adminTitle) adminTitle.style.display = 'block';
    } else {
        if (adminTabBtn) adminTabBtn.style.display = 'none';
        if (adminTitle) adminTitle.style.display = 'none';
    }

    // Render tasks dynamically
    renderTasks(user);

    // Render shop dynamically
    renderShop(data);

    // Render downloads dynamically
    renderDownloads(data);

    // Render guides and error fixes dynamically
    renderGuidesAndFixes(data);

    // Render lists
    renderHistoryLists(data.taskHistory, data.redeemHistory);
}

function renderTasks(user) {
    const tasksContainer = document.getElementById('tasksContainer');
    if (!tasksContainer) return;

    tasksContainer.innerHTML = '';

    const tasks = [
        {
            provider: 'Funlink',
            title: 'Nhiệm Vụ Funlink',
            desc: 'Vượt link qua nền tảng Funlink. Lượt 1 nhận 200 Xu, lượt 2 nhận 100 Xu.',
            completed: user.funlinkCompletedToday,
            limit: 2,
            rewardText: `+${user.funlinkCompletedToday === 0 ? 200 : 100} Xu`,
            icon: '🔗',
            bannerClass: 'task-banner-placeholder',
            badgeText: 'GIỚI HẠN 2 LƯỢT',
            typeColor: '#2563eb'
        },
        {
            provider: 'Nhập mã',
            title: 'Nhiệm Vụ Nhập Mã',
            desc: 'Vượt link qua dịch vụ Nhập mã. Tối đa 4 lượt một ngày, mỗi lượt nhận 100 Xu.',
            completed: user.nhapmaCompletedToday,
            limit: 4,
            rewardText: '+100 Xu',
            icon: '🔑',
            bannerClass: 'task-banner-placeholder task-banner-nhapma',
            badgeText: 'GIỚI HẠN 4 LƯỢT',
            typeColor: '#10b981'
        },
        {
            provider: 'Link4m',
            title: 'Nhiệm Vụ Link4m',
            desc: 'Vượt link qua nền tảng Link4m. Tối đa 3 lượt một ngày, mỗi lượt nhận 100 Xu.',
            completed: user.link4mCompletedToday || 0,
            limit: 3,
            rewardText: '+100 Xu',
            icon: '🔗',
            bannerClass: 'task-banner-placeholder task-banner-link4m',
            badgeText: 'GIỚI HẠN 3 LƯỢT',
            typeColor: '#f59e0b'
        },
        {
            provider: 'Traffic VN',
            title: 'Nhiệm Vụ Traffic VN',
            desc: 'Vượt link qua nền tảng Traffic VN. Tối đa 3 lượt một ngày, mỗi lượt nhận 100 Xu.',
            completed: user.trafficvnCompletedToday || 0,
            limit: 3,
            rewardText: '+100 Xu',
            icon: '🚦',
            bannerClass: 'task-banner-placeholder task-banner-trafficvn',
            badgeText: 'GIỚI HẠN 3 LƯỢT',
            typeColor: '#10b981'
        }
    ];

    tasks.forEach(task => {
        const isCompleted = task.completed >= task.limit;
        const activeTask = user.activeTask;
        
        let actionHtml = '';
        if (isCompleted) {
            actionHtml = `<button class="btn-task" disabled style="background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-muted); cursor: not-allowed; box-shadow: none;">🚫 Hết lượt hôm nay</button>`;
        } else if (activeTask && activeTask.provider === task.provider) {
            actionHtml = `
                <div style="display: flex; gap: 10px; width: 100%;">
                    <button class="btn-task" onclick="cancelActiveTask()" style="flex: 1; background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-main); box-shadow: none;">Hủy</button>
                    <button class="btn-task" id="btnActiveRedirect" style="flex: 2; background: #10b981; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2); border: none;">🚀 Bắt Đầu Vượt</button>
                </div>
            `;
        } else if (activeTask) {
            actionHtml = `<button class="btn-task" disabled style="background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-muted); cursor: not-allowed; box-shadow: none;">⏳ Đang làm nhiệm vụ khác</button>`;
        } else {
            let btnStyle = '';
            if (task.provider === 'Nhập mã') {
                btnStyle = 'background-color: #10b981; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4);';
            } else if (task.provider === 'Link4m') {
                btnStyle = 'background-color: #f59e0b; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.4);';
            }
            actionHtml = isCreatingLink 
                ? `<button class="btn-task" disabled style="opacity: 0.7; cursor: wait;">Đang tạo link...</button>`
                : `<button class="btn-task" onclick="startNewTask('${task.provider}')" style="${btnStyle}">${task.icon} Nhận Nhiệm Vụ ${task.provider}</button>`;
        }

        const card = document.createElement('div');
        card.className = 'task-card';
        card.innerHTML = `
            <div class="${task.bannerClass}" style="height: 140px; position: relative; display: flex; align-items: center; justify-content: center; color: white; font-size: 36px;">
                ${task.icon}
                <span class="task-badge">${task.badgeText}</span>
            </div>
            <div class="task-body">
                <h3 class="task-title">${task.title}</h3>
                <p class="task-desc">${task.desc}</p>
                
                <div class="task-stats">
                    <div class="stat-item">
                        <div class="stat-label">Loại link</div>
                        <div class="stat-value" style="color: ${task.typeColor};">${task.provider}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Bản thân</div>
                        <div class="stat-value">${task.completed}/${task.limit}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Hôm nay</div>
                        <div class="stat-value" style="color: #10b981;">${task.limit} Lượt</div>
                    </div>
                </div>
                
                <div class="reward-bar">
                    Thưởng tiếp theo: <span class="reward-bar-coins">${task.rewardText}</span>
                </div>
                
                ${actionHtml}
            </div>
        `;

        tasksContainer.appendChild(card);
    });

    const redirectBtn = document.getElementById('btnActiveRedirect');
    if (redirectBtn && user.activeTask) {
        redirectBtn.onclick = () => {
            showToast("Đang đưa bạn đến liên kết vượt...", "success");
            window.location.href = user.activeTask.shortlinkUrl;
        };
    }
}

// Start a shortlink request
async function startNewTask(provider) {
    if (isCreatingLink) return;
    isCreatingLink = true;
    
    // Set UI to loading spinner state
    refreshState();

    try {
        const res = await fetch('/api/start-task', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ provider })
        });
        const data = await res.json();

        if (data.status === 'success') {
            showToast('Đang tự động chuyển hướng đến trang vượt link...', 'success');
            setTimeout(() => {
                window.location.href = data.shortlinkUrl;
            }, 800);
        } else {
            showToast(data.message, 'error');
            isCreatingLink = false;
            refreshState();
        }
    } catch (err) {
        console.error(err);
        showToast('Lỗi máy chủ! Không thể tạo nhiệm vụ.', 'error');
        isCreatingLink = false;
        refreshState();
    }
}

// Cancel the active task
async function cancelActiveTask() {
    if (!confirm('Bạn có chắc chắn muốn hủy nhiệm vụ hiện tại? Lượt làm này sẽ không được tính.')) return;

    try {
        const res = await fetch('/api/cancel-task', {
            method: 'POST',
            headers: getHeaders()
        });
        const data = await res.json();

        if (data.status === 'success') {
            showToast(data.message, 'success');
            refreshState();
        } else {
            showToast(data.message, 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Không thể hủy nhiệm vụ lúc này!', 'error');
    }
}

// Handle URL reward tokens from redirection
function handleUrlCallback() {
    const params = new URLSearchParams(window.location.search);
    const rewardToken = params.get('reward_token');
    const userParam = params.get('user');
    const callbackSession = params.get('session_token');

    if (rewardToken && userParam && callbackSession) {
        // Save the new session token
        sessionToken = callbackSession;
        localStorage.setItem('sessionToken', sessionToken);

        // Fetch reward results from backend
        showToast('Đang nhận diện giải thưởng nhiệm vụ...', 'success');

        // Clear query parameters from URL cleanly
        window.history.replaceState({}, document.title, "/index.html");
        
        // Refresh client data to see the newly added coins
        refreshState();
    }
}

// Purchase keys
async function purchaseKey(keyType, price, label) {
    if (userCoins < price) {
        showToast(`Bạn cần tối thiểu ${price} xu để mua gói key này!`, 'error');
        return;
    }

    if (!confirm(`Xác nhận dùng ${price} xu đổi lấy [${label}]?`)) return;

    try {
        const res = await fetch('/api/purchase-key', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ keyType, price, label })
        });
        const data = await res.json();

        if (data.status === 'success') {
            // Render key success modal
            showKeyModal(label, data.key);
            refreshState();
        } else {
            showToast(data.message, 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Lỗi máy chủ khi đổi key!', 'error');
    }
}

function getDurationText(keyType) {
    const matchH = keyType.match(/^(\d+)h$/i);
    if (matchH) {
        return `${matchH[1]} tiếng dùng`;
    }
    const matchD = keyType.match(/^(\d+)d$/i);
    if (matchD) {
        return `${matchD[1]} ngày dùng`;
    }
    return 'Gói VIP';
}

function renderShop(data) {
    const shopContainer = document.getElementById('shopContainer');
    if (!shopContainer) return;

    shopContainer.innerHTML = '';

    const user = data.user;
    const products = data.products || [];
    const stocks = data.stocks || {};
    const purchased = data.purchased || {};

    if (products.length === 0) {
        shopContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted); font-weight: 700;">
                Hiện tại cửa hàng chưa có sản phẩm nào.
            </div>
        `;
        return;
    }

    products.forEach(item => {
        const stock = stocks[item.key_type] || 0;
        const bought = purchased[item.key_type] || 0;
        const isOutOfStock = stock <= 0;
        const canAfford = user.coins >= item.price;
        
        let btnHtml = '';
        if (isOutOfStock) {
            btnHtml = `<button class="btn btn-secondary" disabled style="width: 100%; padding: 12px; border-radius: var(--border-radius-md); font-weight: 700; cursor: not-allowed; background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-muted);">Hết Hàng</button>`;
        } else if (!canAfford) {
            btnHtml = `<button class="btn btn-secondary" disabled style="width: 100%; padding: 12px; border-radius: var(--border-radius-md); font-weight: 700; cursor: not-allowed; background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-muted);">Không Đủ Xu (Cần ${item.price} Xu)</button>`;
        } else {
            btnHtml = `<button class="btn btn-primary" onclick="purchaseKey('${item.key_type}', ${item.price}, '${item.name}')" style="width: 100%; padding: 12px; border-radius: var(--border-radius-md); font-weight: 700; background: var(--primary); color: #fff; border: none; cursor: pointer;">Đổi Ngay</button>`;
        }

        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
            <div class="shop-banner" style="background-image: url('${item.image_url || 'menu_banner.png'}');">
                <span class="shop-badge">Key VIP</span>
            </div>
            <div class="shop-body" style="padding: 24px; text-align: center;">
                <h3 class="shop-title" style="font-size: 20px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">${item.name}</h3>
                <div class="shop-price" style="font-size: 20px; font-weight: 800; color: #f59e0b; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                    ${item.price} <img src="coin_icon.png" class="coin-icon-img" alt="Xu" style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle;">
                    <span style="color: var(--border-color); font-size: 16px; font-weight: 600; margin-left: 6px; margin-right: 6px;">|</span>
                    <span style="font-size: 16px; font-weight: 700; color: var(--text-muted);">${item.duration_text || 'Gói VIP'}</span>
                </div>
                
                <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 20px; font-size: 13px; font-weight: 600; color: var(--text-muted);">
                    <span>📦 Kho: <strong style="color: var(--text-main);">${stock} key</strong></span>
                    <span>🛒 Đã mua: <strong style="color: var(--text-main);">${bought}</strong></span>
                </div>
                
                ${btnHtml}
            </div>
        `;

        shopContainer.appendChild(card);
    });
}

function renderDownloads(data) {
    const downloadContainer = document.getElementById('downloadContainer');
    if (!downloadContainer) return;

    downloadContainer.innerHTML = '';
    const downloads = data.downloads || [];

    if (downloads.length === 0) {
        downloadContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted); font-weight: 700;">
                Hiện tại chưa có ứng dụng nào được cập nhật link tải.
            </div>
        `;
        return;
    }

    downloads.forEach(item => {
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.style.maxWidth = '480px';
        card.style.margin = '0 auto';
        card.innerHTML = `
            <div style="background-color: rgba(59, 130, 246, 0.05); padding: 40px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-color);">
                <img src="${item.image_url || 'rar_icon.jpg'}" alt="${item.name}" style="width: 120px; height: 120px; object-fit: cover; border-radius: var(--border-radius-md); box-shadow: var(--shadow-md); max-height: 120px;">
            </div>
            <div class="shop-body" style="text-align: left; padding: 24px;">
                <h3 class="shop-title" style="margin-bottom: 12px; font-size: 24px; font-weight: 700; color: var(--text-main);">${item.name}</h3>
                <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 24px; font-weight: 500; white-space: pre-line;">
                    ${item.description || 'Không có mô tả sản phẩm.'}
                </p>
                <a href="${item.download_url}" target="_blank" class="btn-buy" style="display: flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none; font-weight: 700; width: 100%;">
                    📥 Tải Xuống
                </a>
            </div>
        `;
        downloadContainer.appendChild(card);
    });
}

function renderHistoryLists(taskHistory, redeemHistory) {
    const taskBody = document.getElementById('taskHistoryBody');
    const redeemBody = document.getElementById('redeemHistoryBody');

    if (taskBody) {
        taskBody.innerHTML = '';
        if (taskHistory.length === 0) {
            taskBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color: var(--text-muted); padding: 20px;">Chưa làm nhiệm vụ nào.</td></tr>`;
        } else {
            taskHistory.forEach(item => {
                const date = new Date(item.timestamp).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit' });
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${date}</td>
                    <td><strong>${item.provider}</strong></td>
                    <td style="color: #10b981; font-weight: 700;">+${item.coinsEarned} Xu</td>
                `;
                taskBody.appendChild(tr);
            });
        }
    }

    if (redeemBody) {
        redeemBody.innerHTML = '';
        if (redeemHistory.length === 0) {
            redeemBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color: var(--text-muted); padding: 20px;">Chưa đổi key lần nào.</td></tr>`;
        } else {
            redeemHistory.forEach(item => {
                const date = new Date(item.timestamp).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit' });
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${date}</td>
                    <td><strong>${item.itemName}</strong></td>
                    <td style="color: #ef4444; font-weight: 700;">-${item.cost} Xu</td>
                    <td>
                        <div style="display: flex; gap: 8px; align-items: center; justify-content: center;">
                            <code class="key-code-badge" style="font-family: monospace; font-size: 13px; font-weight: 700; color: #10b981;">${item.key}</code>
                            <button class="action-btn btn-reset" onclick="copyKeyText('${item.key}')" style="padding: 4px 10px; font-size: 11px;">📋 Copy</button>
                        </div>
                    </td>
                `;
                redeemBody.appendChild(tr);
            });
        }
    }
}

// Authentication forms handlers
let currentMode = 'login'; // Global authentication mode

window.handleAuthToggle = function(isRegister) {
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const authBtn = document.getElementById('authBtn');
    const authToggleText = document.getElementById('authToggleText');
    const authForm = document.getElementById('authForm');

    if (!authForm) return;

    if (isRegister) {
        currentMode = 'register';
        authTitle.innerText = 'Đăng Ký Tài Khoản';
        if (authSubtitle) authSubtitle.innerText = 'Đăng ký tài khoản mới để bắt đầu làm nhiệm vụ';
        authBtn.innerText = 'Đăng Ký';
        authForm.setAttribute('data-mode', 'register');
        authToggleText.innerHTML = 'Đã có tài khoản? <span class="auth-switch-link" onclick="handleAuthToggle(false)">Đăng nhập</span>';
    } else {
        currentMode = 'login';
        authTitle.innerText = '💎 Shop Duc Duy';
        if (authSubtitle) authSubtitle.innerText = 'Đăng nhập để vào cửa hàng và làm nhiệm vụ';
        authBtn.innerText = 'Đăng Nhập';
        authForm.setAttribute('data-mode', 'login');
        authToggleText.innerHTML = 'Chưa có tài khoản? <span class="auth-switch-link" onclick="handleAuthToggle(true)">Đăng ký ngay</span>';
    }
};

function initAuthForms() {
    const authForm = document.getElementById('authForm');
    if (!authForm) return;

    authForm.onsubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById('authUsername').value.trim();
        const password = document.getElementById('authPassword').value;

        if (!username || !password) {
            showToast('Vui lòng nhập tài khoản và mật khẩu!', 'error');
            return;
        }

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, mode: currentMode })
            });
            const data = await res.json();

            if (data.status === 'success') {
                showToast(data.message, 'success');
                if (currentMode === 'register') {
                    // Switch back to login
                    window.handleAuthToggle(false);
                    document.getElementById('authPassword').value = '';
                } else {
                    sessionToken = data.sessionToken;
                    currentUser = data.username;
                    localStorage.setItem('sessionToken', sessionToken);
                    document.getElementById('authUsername').value = '';
                    document.getElementById('authPassword').value = '';
                    refreshState();
                }
            } else {
                showToast(data.message, 'error');
            }
        } catch (err) {
            console.error(err);
            showToast('Lỗi máy chủ khi xác thực tài khoản!', 'error');
        }
    };
}

// Log out user
function logout() {
    fetch('/api/logout', {
        headers: getHeaders()
    }).catch(err => console.warn(err));

    sessionToken = '';
    currentUser = null;
    localStorage.removeItem('sessionToken');
    showLoginView();
    showToast('Đã đăng xuất khỏi tài khoản.', 'success');
}
window.handleLogout = logout;

// Sidebar Navigation
window.switchTab = function(tabId) {
    const navItems = document.querySelectorAll('.sidebar .nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('data-tab') === tabId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(panel => {
        if (panel.id === tabId) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });

    // Update main dashboard viewport titles dynamically
    const headerTitle = document.getElementById('headerTitle');
    const headerSubtitle = document.getElementById('headerSubtitle');
    if (headerTitle && headerSubtitle) {
        if (tabId === 'tab-tasks') {
            headerTitle.textContent = 'Nhiệm Vụ Hôm Nay';
            headerSubtitle.textContent = 'Hoàn Thành Nhiệm Vụ Để Nhận Xu. Mỗi Nhiệm Vụ Có Mã Riêng';
        } else if (tabId === 'tab-shop') {
            headerTitle.textContent = 'Cửa Hàng App - Menu Cheat';
            headerSubtitle.textContent = 'Đổi xu của bạn lấy các gói key ứng dụng chất lượng cao';
        } else if (tabId === 'tab-download') {
            headerTitle.textContent = 'Tải Về Các File App - Cheat';
            headerSubtitle.textContent = 'Liên kết tải trực tiếp các tệp tin cài đặt ứng dụng';
        } else if (tabId === 'tab-fix') {
            headerTitle.textContent = 'Hướng Dẫn Sử Dụng & Sửa Lỗi';
            headerSubtitle.textContent = 'Xem video hướng dẫn sử dụng và cách khắc phục lỗi thường gặp';
        } else if (tabId === 'tab-history') {
            headerTitle.textContent = 'Lịch Sử Hoạt Động';
            headerSubtitle.textContent = 'Xem lại các lượt làm nhiệm vụ và đổi quà của bạn';
        }
    }
};

// --- POPUPS & MODALS ---
function showKeyModal(packageName, key) {
    const modalHtml = `
        <div class="modal-overlay show" id="keyModalBackdrop" style="z-index: 9999;">
            <div class="modal-content" style="text-align: center;">
                <div class="modal-icon">🎉</div>
                <h3 class="modal-title">Đổi Thưởng Thành Công!</h3>
                <p class="modal-desc" style="margin-bottom: 20px;">
                    Bạn đã đổi thành công gói <strong>${packageName}</strong>. Hãy copy key bên dưới:
                </p>
                <div style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 18px; text-align: center; margin-bottom: 25px; position: relative;">
                    <span style="font-family: monospace; font-size: 20px; font-weight: 800; color: #10b981; word-break: break-all;" id="modalKeyText">${key}</span>
                </div>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button onclick="copyModalKey('${key}')" style="padding: 12px 24px; font-size: 14px; font-weight: 700; background: var(--primary); color: #fff; border: none; border-radius: var(--border-radius-md); cursor: pointer; transition: var(--transition); box-shadow: 0 4px 10px var(--primary-glow); flex: 1;">📋 Copy Key</button>
                    <button onclick="closeKeyModal()" style="padding: 12px 24px; font-size: 14px; font-weight: 700; background: var(--bg-input); color: var(--text-main); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); cursor: pointer; transition: var(--transition); flex: 1;">Đóng</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeKeyModal() {
    const modal = document.getElementById('keyModalBackdrop');
    if (modal) modal.remove();
}

function copyModalKey(key) {
    copyKeyText(key);
    closeKeyModal();
}

function copyKeyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Đã copy key vào khay nhớ tạm!', 'success');
    }).catch(err => {
        console.error(err);
        showToast('Không thể copy tự động!', 'error');
    });
}

// Global Custom Toast System
function showToast(message, type = 'success') {
    const existing = document.querySelectorAll('.toast-notice');
    existing.forEach(t => t.remove());

    const toast = document.createElement('div');
    const typeClass = type === 'success' ? 'success-type' : 'error-type';
    toast.className = `toast-notice ${typeClass}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✔' : '❌'}</span>
        <span class="toast-message">${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

function renderGuidesAndFixes(data) {
    const videoContainer = document.getElementById('guidesVideoContainer');
    const fixesContainer = document.getElementById('errorFixesContainer');
    
    if (videoContainer && data.guidesSettings) {
        videoContainer.innerHTML = `
            <div class="shop-card" style="padding: 30px; display: flex; flex-direction: column; gap: 20px;">
                <h3 style="color: var(--primary); font-weight: 800; font-size: 22px; margin-bottom: 5px; display: flex; align-items: center; gap: 10px;">
                    🎬 Phần 1: Video Hướng Dẫn Sử Dụng
                </h3>
                <p style="font-size: 14px; color: var(--text-muted); line-height: 1.5; margin: 0;">
                    Vui lòng xem kỹ video bên dưới để biết cách cài đặt và sử dụng ứng dụng đúng cách.
                </p>
                <div style="width: 100%; border-radius: var(--border-radius-lg); overflow: hidden; border: 1px solid var(--border-color); background: #000; box-shadow: var(--shadow-sm); aspect-ratio: 16/9; max-height: 500px; display: flex;">
                    <video src="${data.guidesSettings.video_url || 'hdsd.mp4'}" controls style="width: 100%; height: 100%; object-fit: contain;"></video>
                </div>
            </div>
        `;
    }

    if (fixesContainer && data.errorFixes) {
        fixesContainer.innerHTML = '';
        if (data.errorFixes.length === 0) {
            fixesContainer.innerHTML = `
                <div class="shop-card" style="padding: 30px; text-align: center; color: var(--text-muted); font-weight: 700;">
                    Hiện chưa có hướng dẫn sửa lỗi nào được cập nhật.
                </div>
            `;
            return;
        }

        data.errorFixes.forEach(fix => {
            const card = document.createElement('div');
            card.className = 'shop-card';
            card.style.display = 'flex';
            card.style.flexDirection = 'row';
            card.style.flexWrap = 'wrap';

            let imgHtml = '';
            if (fix.image_url) {
                imgHtml = `
                    <div style="flex: 1; min-width: 320px; max-height: 280px; overflow: hidden; background: #000; display: flex; align-items: center; justify-content: center; border-right: 1px solid var(--border-color);">
                        <img src="${fix.image_url}" alt="${fix.title}" style="width: 100%; height: 100%; object-fit: contain; max-height: 280px;">
                    </div>
                `;
            } else {
                imgHtml = `
                    <div style="flex: 1; min-width: 320px; max-height: 280px; overflow: hidden; background: rgba(239, 68, 68, 0.05); display: flex; align-items: center; justify-content: center; border-right: 1px solid var(--border-color); padding: 30px;">
                        <div style="font-size: 80px; text-align: center; color: #ef4444;">🛡️</div>
                    </div>
                `;
            }

            let btnHtml = '';
            if (fix.download_url) {
                btnHtml = `
                    <a href="${fix.download_url}" target="_blank" class="btn-buy" style="display: flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none; width: fit-content; padding: 12px 24px; font-weight: 700; ${fix.title.includes('Không Lên Chức Năng') ? 'background: #ef4444; border: none; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.2);' : ''}">
                        📥 Tải File Fix Lỗi
                    </a>
                `;
            }

            let descHtml = '';
            if (fix.description.includes('1️⃣') || fix.description.includes('1.')) {
                const lines = fix.description.split('\n');
                descHtml = `<ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; color: var(--text-muted); font-size: 13.5px; line-height: 1.5; padding: 0; margin-bottom: 20px;">`;
                lines.forEach(l => {
                    if (l.trim()) {
                        descHtml += `<li>${l}</li>`;
                    }
                });
                descHtml += `</ul>`;
            } else {
                descHtml = `
                    <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px; font-weight: 500; white-space: pre-line;">
                        ${fix.description}
                    </p>
                `;
            }

            card.innerHTML = `
                ${imgHtml}
                <div style="flex: 1.2; min-width: 320px; padding: 30px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="color: #ef4444; font-weight: 800; font-size: 20px; margin-bottom: 12px;">${fix.title}</h3>
                        <p style="font-weight: 700; font-size: 14px; color: var(--text-main); margin-bottom: 8px;">Cách Khắc Phục:</p>
                        ${descHtml}
                    </div>
                    ${btnHtml}
                </div>
            `;
            fixesContainer.appendChild(card);
        });
    }
}
