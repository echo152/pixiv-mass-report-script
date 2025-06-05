# Pixiv小说自动举报脚本


## 前言

前两天优化了下屏蔽脚本，发小说区了，然后被人举报了，搞得我号都出冻结通知了。气得我直接写了个批量举报脚本

---


## 1. 安装 Tampermonkey（油猴）  （已安装可跳过）

Tampermonkey 是浏览器扩展，用于管理和运行用户脚本。请根据你使用的浏览器，按照以下步骤安装：

- **Google Chrome / Microsoft Edge**  
  访问 [Chrome 网上应用店 - Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) ，点击「添加至 Chrome」并确认安装。

- **Firefox**  
  访问 [Firefox Add-ons - Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) ，点击「添加到 Firefox」并确认安装。


- **其他浏览器**  
  访问 [Tampermonkey 官网](https://www.tampermonkey.net/) ，选择适合你浏览器的版本下载安装。

安装完成后，浏览器右上角会出现Tampermonkey的图标。

---

## 2. 安装 Pixiv关键词屏蔽脚本

<a href="https://raw.githubusercontent.com/echo152/pixiv-mass-report-script/main/pixiv-mass-report-script1.user.js" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Install%20Tampermonkey-brightgreen?style=for-the-badge&logo=tampermonkey" alt="Install Tampermonkey Script">
</a> 
<a href="https://raw.githubusercontent.com/echo152/pixiv-mass-report-script/main/pixiv-mass-report-script2.user.js" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Install%20Tampermonkey-brightgreen?style=for-the-badge&logo=tampermonkey" alt="Install Tampermonkey Script">
</a> 


点击按钮后，会跳转到Tampermonkey的脚本安装页面，点击「安装」即可。

要两个都安装，脚本1在页面弹出一个按钮 点击按钮后会遍历所有搜出来的用户id，储存起来，然后给网页后面加个参数，再一个一个批量打开，新标签页打开网页后，脚本2会识别参数,如果识别到就会开始自动举报，正常打开的是没有参数的，所以不会误举报。。

---
## 使用说明

1. 搜索pixiv小说，比如搜索"无限制ai"，反正就是倒狗常用的关键字，网页右侧就会跳出两个按钮（如果没出来就刷新，刷新也没出来就确认一下油猴是否正常启用）
![预览图](https://raw.githubusercontent.com/echo152/pixiv-mass-report-script/main/image/1.png)

2. 点击按钮后会遍历所有搜出来的用户id，去重后储存起来，然后给目标用户主页网址后面加个参数batch=1，然后自动打开

3.  脚本2识别到batch=1就会自动开始举报，默认“诱导他人进入不良网站”，默认原因“作品全部宣传到付费AI网站，而且乱填词条，污染版面
すべての作品が有料AIウェブサイトに宣伝され、ランダムなエントリが入力されてレイアウトが汚されている
All the works are promoted to paid AI websites, and random entries are filled in, polluting the layout”



---


## 功能介绍

- 一键获取搜索结果的用户id，并打开主页进行自动举报

---


## 反馈与支持

如果遇到任何问题或有功能建议，请在 GitHub Issues 提出，感谢支持！

---

