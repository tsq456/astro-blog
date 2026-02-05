---
title: "使用GITHUB ACTION进行HUGO的自动化部署"
date: 2021-05-07T20:42:14+08:00
tags: [hugo]
categories: [Code]
draft: false
description: ""
cover_image: "https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=50"
comment : true
---

到今天为止，自己于一个月前建立的这个站点的网站样式以及阅读体验、基础的使用体验和内容管理发布方式终于初步成型了，在此之前每次在hugo里生成内容后，是通过SFTP上传到腾讯的云服务器的，在频繁更新网站代码的背景下难免有些麻烦。同时也因为之前网站是部署在Vercel上的，更新内容后只要PUSH到GITHUB就可以自动化部署后体现在前台（现在回想起来，Vercel应该也是用了GITHUB ACTION），导致对于手动更新站点内容的方式比较抵触。

其实从搭建现在这个主题的初始，也在一直寻找合适的自动化部署方式，也因此“误入”了Caddy的坑，结果发现Caddy 2在目前还不支持CaddyFile这种傻瓜方式进行基于WEBHOOK的自动化部署（不过有一说一，CaddyFile对于没什么代码基础的人而言，比NGINX这种怪物友好太多了），遂放弃。再到前两天想起来之前有看到过GITHUB ACTION貌似可以做到自动化部署，因此进行了一番搜索，下文也是对这一过程的记录，以免回头更换云服务器的时候还得重投再找一遍解决方案，主要内容来源于[这篇博文](http://www.9ong.com/042021/github-actions%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90%E6%9E%84%E5%BB%BA%E9%83%A8%E7%BD%B2hugo.html)，对于GITHUB的理解基于[油管的这个阿婆主](https://www.youtube.com/watch?v=gW1TDirJ5E4&t=321s)。

<!--more-->

整体步骤大致分为以下几步：

+ 生成SSH密钥，并在服务器端和GITHUB分别配置公钥和私钥
+ 在GITHUB ACTION中创建自己的Workflow

## 生成SSH密钥及配置

### 生成SSH KEY

可以在任意一台支持SSH-Keygen的设备上生成SSH密钥，我这里使用的RSA加密算法，参考博文使用的ed25519算法，别问我为什么，因为我也不懂这两种算法有啥区别..

```bash
ssh-keygen -m PEM -t rsa -b 4096 -C "YOUR_KEY_NAME"
```

随后生成输入KEY的生成地址以及名称，并且**按回车跳过密码设置**，因为设置了密码在后续无法进行自动化构建，最后会在前面输入的地址（windows通常默认为`C:\Users\username/.ssh`，ubuntu默认会在`/home/ubuntu/.ssh`）下找到生成好的公钥和私钥。

{{< figure src="https://img.atutang.com/hugo-automatic-deploy/ssh-keygen!/format/webp/lossless/true#center" title="bash中SSH生成过程" >}}

### GITHUB中配置SSH私钥

在GITHUB的HUGO源码仓库中的SETTING - SECRETS下添加SSH私钥，NAME自行设定，VALUE填入私钥。

{{< figure src="https://img.atutang.com/hugo-automatic-deploy/GITHUB!/format/webp/lossless/true#center" title="GITHUB下添加SSH私钥" >}}

### 服务器的AUTHORIZED_KEYS下添加SSH公钥

ubuntu服务器的AUTHORIZED_KEYS通常在`/home/username/.ssh`下，打开后将公钥复制进去。

{{< figure src="https://img.atutang.com/hugo-automatic-deploy/authorized_keys!/format/webp/lossless/true#center" >}}

至此，SSH密钥的相关配置完成。

## GITHUB ACTION 构建

在构建前，需要再在GITIHUB的SECRETS下添加一个服务器地址变量，NAME自行设定，VALUE填入服务器地址。

{{< figure src="https://img.atutang.com/hugo-automatic-deploy/GITHUB_SECRETS_HOST!/format/webp/lossless/true#center" title="GITHUB下添加服务器地址" >}}

在这个工作流中，一共用到了以下几个第三方ACTION

+ [Hugo Setup](https://github.com/marketplace/actions/hugo-setup)，用于在虚拟环境中创建HUGO环境
+ [SSH Agent](https://github.com/marketplace/actions/webfactory-ssh-agent)，具体我也不懂是做什么用的，我自己的理解大致就是与SSH-KEYSCAN配合使用来匹配本地的私钥与远端的公钥是否匹配，匹配就建立SSH连接吧？

在本地hugo源码仓库或者直接在GITHUB ACTION标签下创建`.github/workflow/CONFIG_NAME.yml`后，在其中添加配置内容。下面是完整的GITHUB ACTION配置。

```yaml
name: hugo deployment  #action名称，随意

on:
  push:  #  action由push行为触发
    branches: [master]  # 只在mater分支上触发

jobs:
  build-and-deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
        with:
          # submodules: true
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.82.0'
          extended: true

      - name: Build
        run: hugo --minify

      - uses: webfactory/ssh-agent@v0.5.2
        with:
          ssh-private-key: ${{ secrets.BLOG_SECRET }}

      - name: Scan public keys
        run: |
          ssh-keyscan ${{ secrets.BLOG_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy
        run: |
          rsync -av --delete public ubuntu@${{ secrets.BLOG_HOST }}:/var/www/blog  #  使用rsync将虚拟环境下hugo创建的public文件夹同步至服务器的/var/www/blog文件夹下
```

{{< figure src="https://img.atutang.com/hugo-automatic-deploy/github-action-succeeded!/format/webp/lossless/true#center" title="工作流运行成功" >}}

## 后记

本来想在工作流的最后加个发送邮件的action（[Send email](https://github.com/marketplace/actions/send-email)）的，结果QQ邮件要验证码，GMAIL有安全性问题，想想GITHUB本身就有PUSH成功的邮件推送，就算了。

还有就是被GITHUB ACTION配置语法的一个未知原因的要求坑的差点放弃，在`run`后面加`|`之后另起的一行需要退格再输入运行内容，不然就会无法通过自检，无法启动工作流，**但是但是但是！GITHUB给我的报错竟然是标注在`run`之上的`- name`下面**。

{{< figure src="https://img.atutang.com/hugo-automatic-deploy/GITHUB-ERROR!/format/webp/lossless/true#center" title="坑爹的错误提示..." >}}

