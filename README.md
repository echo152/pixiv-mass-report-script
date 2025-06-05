# Pixiv小说自定义关键词屏蔽脚本


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


点击按钮后，会跳转到Tampermonkey的脚本安装页面，点击「安装」即可，要两个都安装，脚本1在页面弹出一个按钮 点击按钮后会遍历所有搜出来的用户id，储存起来，然后给网页后面加个参数，再一个一个批量打开，新标签页打开网页后，脚本2会识别参数,如果识别到就会开始自动举报，正常打开的是没有参数的，所以不会误举报。。

---
## 使用说明

1. 搜索pixiv小说，比如搜索"催眠"，网页左侧就会跳出两个按钮（如果没出来就刷新，刷新也没出来就确认一下油猴是否正常启用）
![预览图](https://raw.githubusercontent.com/echo152/pixiv-custom-filter/main/image/1.png)

2.  点击"关键词配置"，可以弹出配置界面，自定义输入要屏蔽的关键字，然后保存。比如这里我们屏蔽"lsyht"就在作者关键字里输入lsyht，如果有多个就输完后回车换行。
![预览图](https://raw.githubusercontent.com/echo152/pixiv-custom-filter/main/image/2.png)

不想一个一个手动加的话，可以直接导入我文件里的,打开1.txt复制粘贴然后导入就行

配置文件链接：[1.txt](https://github.com/echo152/pixiv-custom-filter/blob/main/1.txt)

3.  点击"Hide Ai",就会自动隐藏符合关键字的小说，再点击一下就会全部显示。
![预览图](https://raw.githubusercontent.com/echo152/pixiv-custom-filter/main/image/3.png)



---


## 功能介绍

- 一键获取搜索结果的用户id，并打开主页进行自动举报

---



## 反馈与支持

如果遇到任何问题或有功能建议，请在 GitHub Issues 提出，感谢支持！

---

