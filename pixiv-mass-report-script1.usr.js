// ==UserScript==
// @name         Pixiv 批量举报工具（自动识别来源）
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  批量打开 Pixiv 作品并自动举报（带来源标记）
// @match        https://www.pixiv.net/tags/*
// @grant        GM_openInTab
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    // ----------- 如果是作品详情页且来自批量举报，启动举报流程 -----------
if (location.href.match(/^https:\/\/www\.pixiv\.net\/artworks\/\d+/)) {
    const params = new URLSearchParams(location.search);
    if (params.get('batch') === '1') {
        waitForReportStart();
    }
    return;
}

// 封装一个等待页面准备的函数，直到举报按钮出现
function waitForReportStart() {
    const maxRetries = 30; // 最多等待 30 秒
    let attempts = 0;

    const interval = setInterval(() => {
        const menuButton = document.querySelector('.sc-c6703830-2[role="button"]');
        if (menuButton) {
            clearInterval(interval);
            console.log("[举报] 页面就绪，开始举报");
            autoReportFunction();
        } else {
            attempts++;
            console.log(`[举报] 等待页面加载中... 尝试 ${attempts}`);
            if (attempts >= maxRetries) {
                clearInterval(interval);
                console.warn("[举报] 等待超时，未能执行举报流程");
            }
        }
    }, 1000); // 每秒检测一次
}

    // ----------- 添加按钮样式与批量举报入口 -----------
    GM_addStyle(`
        #pixiv-batch-report-btn {
            position: fixed;
            top: 370px;
            right: 20px;
            z-index: 9999;
            background-color: #FF475A;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        #pixiv-batch-report-btn.loading {
            background-color: #718096;
            cursor: wait;
        }
        #pixiv-report-progress {
            position: fixed;
            top: 410px;
            right: 20px;
            background: white;
            padding: 8px;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            z-index: 9999;
        }
    `);

    const btn = document.createElement('button');
    btn.id = 'pixiv-batch-report-btn';
    btn.textContent = '批量举报';
    document.body.appendChild(btn);

    const progressDiv = document.createElement('div');
    progressDiv.id = 'pixiv-report-progress';
    progressDiv.style.display = 'none';
    document.body.appendChild(progressDiv);

    let allLinks = [];
    let currentIndex = 0;

    function getUniqueLinks() {
        const xpath = '//*[@id="__next"]/div/div[2]/div[5]/div[1]/div[2]/div[3]/section/div[2]/div[1]/div/div/ul/li/div/div[2]/div/div[2]/a';
        const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        const links = [];
        for (let i = 0; i < result.snapshotLength; i++) {
            const node = result.snapshotItem(i);
            if (node.href) {
                links.push(node.href);
            }
        }

        return [...new Set(links)];
    }

    function startBatchReport() {
        allLinks = getUniqueLinks();
        currentIndex = 0;

        if (allLinks.length === 0) {
            alert('未找到任何作品链接');
            return;
        }

        btn.classList.add('loading');
        btn.textContent = '批量举报中...';
        progressDiv.style.display = 'block';
        updateProgress();

        openNextLink();
    }

    function updateProgress() {
        progressDiv.textContent = `进度: ${currentIndex}/${allLinks.length}`;
    }

    function openNextLink() {
        if (currentIndex >= allLinks.length) {
            btn.classList.remove('loading');
            btn.textContent = '批量举报完成';
            progressDiv.textContent = '所有举报已完成！';
            setTimeout(() => progressDiv.style.display = 'none', 4000);
            return;
        }

        updateProgress();

        const url = allLinks[currentIndex];
        const withBatchParam = url.includes('?') ? url + '&batch=1' : url + '?batch=1';
        GM_openInTab(withBatchParam, { active: true });

        currentIndex++;
        setTimeout(openNextLink, 10000); // 每 10 秒处理一个
    }

    btn.addEventListener('click', startBatchReport);

    // ----------- 页面加载完成检测后再自动举报 -----------
    function waitForPageReadyThenReport() {
        const checkReady = () => {
            const menuButton = document.querySelector('.sc-c6703830-2[role="button"]');
            if (menuButton) {
                console.log('[批量举报] 页面加载完成，开始执行举报流程');
                autoReportFunction();
            } else {
                console.log('[批量举报] 等待页面加载...');
                setTimeout(checkReady, 1000);
            }
        };
        checkReady();
    }

    // ----------- 举报主逻辑 -----------
    function autoReportFunction() {
        function clickThreeDotsMenu() {
            const btn = document.querySelector('.sc-c6703830-2[role="button"]');
            if (btn) {
                btn.click();
                setTimeout(clickReportOption, 1000);
            } else {
                setTimeout(clickThreeDotsMenu, 1000);
            }
        }

        function clickReportOption() {
            const report = document.querySelector('[title="回报问题"]');
            const parent = report?.closest('[role="button"]');
            if (parent) {
                parent.click();
                setTimeout(selectReportType, 1000);
            } else {
                setTimeout(clickReportOption, 1000);
            }
        }

        function selectReportType() {
            const option = document.querySelector('div[title="投稿了不恰当的作品"].sc-322affee-0');
            if (option) {
                option.click();
                setTimeout(selectSecondaryReportType, 1000);
            } else {
                setTimeout(selectReportType, 1000);
            }
        }

        function selectSecondaryReportType() {
            const second = document.querySelector('div[title="诱导他人进入不良网页"]');
            const parent = second?.closest('[role="button"]');
            if (parent) {
                parent.click();
                setTimeout(fillReason, 1000);
            } else {
                setTimeout(selectSecondaryReportType, 1000);
            }
        }

        function fillReason() {
            const textarea = document.querySelector('textarea.sc-462aef89-5');
            if (textarea) {
                textarea.value = `作品全部宣传到付费AI网站，而且乱填词条，污染版面
すべての作品が有料AIウェブサイトに宣伝され、ランダムなエントリが入力されてレイアウトが汚されている
All the works are promoted to paid AI websites, and random entries are filled in, polluting the layout`;

                textarea.dispatchEvent(new Event('input', { bubbles: true }));
                setTimeout(submitReport, 1000);
            } else {
                setTimeout(fillReason, 1000);
            }
        }

        function submitReport() {
            const buttons = document.querySelectorAll('button.charcoal-button');
            for (let btn of buttons) {
                if (btn.textContent.includes('传送')) {
                    btn.click();
                    console.log("举报已提交");
                    break;
                }
            }
        }

        console.log('开始自动举报...');
        clickThreeDotsMenu();
    }
})();
