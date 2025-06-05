// ==UserScript==
// @name         自动举报批量打开后的页面
// @namespace    http://tampermonkey.net/
// @version      2025-06-04
// @description  try to take over the world!
// @author       You
// @match        https://www.pixiv.net/users/*?batch=1
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @grant        none
// ==/UserScript==

(function() {
    function autoReportFunction() {
        function clickThreeDotsMenu() {
            const btn = document.querySelector('.sc-c6703830-2[role="button"]');
            if (btn) {
                btn.click();
                setTimeout(clickReportOption, 500);
            } else {
                setTimeout(clickThreeDotsMenu, 500);
            }
        }

        function clickReportOption() {
            const report = document.querySelector('[title="回报问题"]');
            const parent = report?.closest('[role="button"]');
            if (parent) {
                parent.click();
                setTimeout(selectReportType, 500);
            } else {
                setTimeout(clickReportOption, 500);
            }
        }

        function selectReportType() {
            const option = document.querySelector('div[title="投稿了不恰当的作品"].sc-322affee-0');
            if (option) {
                option.click();
                setTimeout(selectSecondaryReportType, 500);
            } else {
                setTimeout(selectReportType, 500);
            }
        }

        function selectSecondaryReportType() {
            const second = document.querySelector('div[title="诱导他人进入不良网页"]');
            const parent = second?.closest('[role="button"]');
            if (parent) {
                parent.click();
                setTimeout(fillReason, 500);
            } else {
                setTimeout(selectSecondaryReportType, 500);
            }
        }

        function fillReason() {
            const textarea = document.querySelector('textarea.sc-462aef89-5');
            if (textarea) {
                textarea.value = `作品全部宣传到付费AI网站，而且乱填词条，污染版面
すべての作品が有料AIウェブサイトに宣伝され、ランダムなエントリが入力されてレイアウトが汚されている
All the works are promoted to paid AI websites, and random entries are filled in, polluting the layout`;

                textarea.dispatchEvent(new Event('input', { bubbles: true }));
                setTimeout(submitReport, 500);
            } else {
                setTimeout(fillReason, 500);
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
setTimeout(autoReportFunction, 3000);
})();