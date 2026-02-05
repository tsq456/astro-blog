---
title: "【译】Notion重设计"
date: 2021-04-24T09:14:45+08:00
tags: [翻译, 重设计]
categories: [翻译]
draft: false
description: ""
cover_image: "https://img.atutang.com/notion-redesign/1.png!loss#center"
comment : true
---
这是正儿八经的第一篇翻译文章，后面如果能坚持下去可能也会变成一个系列。可是为什么要翻译？最直接的原因是因为想更新文章，但是一时半会儿没内容怎么办？那就找文章翻译呗，既能学习外国同行的经验，也能锻炼英文水平，还能丰富博客文章，一举三得，何乐不为。

在“云”技术越来越完善的当下，各类XaaS（什么PaaS、SaaS、IaaS、DaaS）的产品越来越多，作为设计师相对更容易接触到的应该就是Saas或者Paas类型的产品了，我自己也是Notion用户，所以当时在闲逛Medium的时候看到作者小姐姐写的这篇关于Notion重设计的文章时，认为好多优化方案还是非常棒的。感触比较深的是虽然这只是作者的业余研究案例，但是从设计流程到最终原型的完整度都已经非常完善了，设计流程基本就是设计思维那一套从调研到假设到定义再到原型的方法，原型也基本都是高保真且用GIF进行了呈现。业余案例尚且如此，工作中应该会只会比这更详尽吧。

同时，在前两年做游戏的工作经验中，自己也对于“假设”对于设计的意义有了更深一步的理解，很多时候由于客观原因的限制，设计师没办法获取到一手的用户资料或者事无巨细都事先获得答案，这时候要让自己的设计是有方向的，就必须要先进行假设以主导后续设计，文章中作者对于许多Notion的现存问题的解决方案也是以假设（*Hypothesis*）为前置再定义出来的，当然可能因为是业余项目的缘故，作者没有进行后续的设计验证。

废话不多说，以下都是正文，不保证翻译的全对，甚至可能错误的地方更多，严复所说的信达雅可太难了。

<!--more-->

------

> 本文翻译自Medium的[《Notion Redesign》](https://seheeclairekim.medium.com/notion-redesign-9faacc44b52)，作者[Clare Kim](https://seheeclairekim.medium.com/)。未经原作者许可，也不做任何商业用途。

我要事先声明本人与Notion没有利益关系，这个案例是出于我的个人兴趣驱使。

2020年在变革人们的工作方式方面是前所未有的一年。由于大多数企业开始转变为远程工作，SaaS（软件即服务）工具在实现更好的协作以及效率方面，比以往任何时候都起到更为重要的作用。其中一款产品在2020年的需求激增 —— Notion。

{{< figure src="https://img.atutang.com/notion-redesign/1.png!/format/webp/lossless/true#center" title="Notion官网的宣传图" >}}

如今，凭借其ALLINONE概念的工作区产品而获得20亿美元估值的Notion，显然是湾区最具前途的初创公司之一。

我见过许多使用过多款效率工具后最终使用Notion的用户，我就是其中之一。老实说，在我之前的工作经历中，我曾因希望给人留下“做事有条理”的印象，而对这些工具很着迷。在使用Notion之前，我曾经是印象笔记、Trello，Google Calendar，Slack，Asana以及其他很多同类产品的重度用户。

然而，我很少发现有一款产品可以显著提升我的工作效率。过去几年间我意识到，由于每个人的产品使用经验不同，因此没有一款“完美”的产品能够满足各类团队的需求。我意识到更重要的是基于正确的目的找到合适的工具，并且让尽可能多的员工在短时间内学习它。

## 总览
{{< figure src="https://img.atutang.com/notion-redesign/2.png!/format/webp/lossless/true#center" title="Notion于2020年10月在韩国发布了它的第一个海外版本" >}}

基于上述原因，当Notion在韩国发布（该产品的）首个海外版本并迅速增长的新闻引起了我的兴趣。这让我很惊讶，因为Notion从来不是一款“容易上手”的产品。我经常将其与学习Webflow做对比，这款产品需要一些时间才能上手，但是一旦上手之后，他们的价值就会凸显而出。因此我开始好奇Notion为什么会在韩国获得成功，而在研究期间，我发现了一些用户会遇到的常见问题。

{{< figure src="https://img.atutang.com/notion-redesign/journey.png!/format/webp/lossless/true#center" title="从初步想法到设计共耗费4个月时间" >}}

你在下文看到的研究案例，提出了一些解决Notion现存问题以及将其优化为更优秀的**协同及生产力工具**的方法。

## 观察

{{< figure src="https://img.atutang.com/notion-redesign/3.png!/format/webp/lossless/true#center" title="一张Notion韩国社区的截图" >}}

Notion在世界范围内活跃的社区来促进用户的使用。在探索了几个月韩国社区后，我注意到社区用户基本两类用户构成：**A类 - 初创公司用户**和**B类 - 希望并积极学习新事物的人群**。

基于我的B2B营销背景，我最初假设Notion最适合小型团队将各种文档性质的工作汇总到一个地方，因为随着团队的不断成长，当高级任务管理需求的重要度超过工具的功能性时，它们将达到一个临界点[^1]。

[^1]:这段话原文是“As someone with a background in B2B marketing, my initial assumption was that Notion is best for small teams compiling all document-type work into one place because when a team keeps growing, they would reach a point when advanced task-management is more crucial than the functionality of the tools.” 读了半天没理解是什么意思……

但是我对于B类用户存在疑惑，如果这部分用户中的大多人乐于学习新工具，那剩下的那部分不乐于学习新工具的呢？对于那些不喜欢学习新工具的人来说，使用Notion有多困难？

> 工作中并非每个人都是新潮的

我记得自己以及同事在学习新软件而苦苦挣扎的次数。我们都知道，在部分人能够快速上手新工具的同时，另外一部分人甚至对科技升级的想法都感到恐惧。我想这同样适用于Notion用户，因为并非所有人都精通技术，拥抱变化以及追赶潮流。为了进一步探索我的最初假设并了解用户的背景，我通过调研和访谈进行了初步研究。

## 发现

{{< figure src="https://img.atutang.com/notion-redesign/4.png!/format/webp/lossless/true#center" title="我找到Notion的新用户以观察他们首次使用产品的行为" >}}

我找到首次使用Notion的用户来观察他们在开始使用应用时的行为。

我从调查中收到了78位受访者（51％的Notion用户）并采访了6位用户（3位Notion用户和3位非用户），来了解他们使用生产力工具的方式，目的以及使用感受。基于我的发现，我能够定义出三个Notion目前存在的问题：

1. **学习成本高**：陡峭的学习曲线经常使新用户不知所措，阻碍他们上手这款产品。
2. **易用性差**：由于产品强大的灵活性，许多用户花费了许多时间来通过各种方式调整格式和尝试各种特性，即便对这个工具有基本了解，也可能需要花一些时间来调整格式以达用户预期。
3. **不直观**：许多用户无法定位到他们当前所在位置，并且经常在寻找自己想要的东西时迷失。一些功能无法自我解释，并且导航也不够清晰。

我按照以下三个目标进行了重新设计，并且每个功能都是基于用户调研得出的假设并验证得出：

+ **降低新用户入门门槛**
+ **精简使用前配置时间**
+ **提升用户界面可见性**

## 降低新用户入门门槛

{{< figure src="https://img.atutang.com/notion-redesign/5.png!/format/webp/lossless/true#center" title="【当前】Notion以一个很简单新手引导页面开始" >}}

通过研究，我发现很多用户在他们第一次使用Notion时感到受挫，许多用户对于这个应用的第一印象是“不知道要干嘛”。应用从一个简单的页面开始，该页面似乎想要最大程度的缩短新手教学，快速让用户自己探索学习。但是，难道我们不应至少防止用户在开始使用前就变得不知所措？

> 假设：适当的新手引导有助于降低产品的上手难度

{{< figure src="https://img.atutang.com/notion-redesign/6.png!/format/webp/lossless/true#center" title="【我的建议】我的意见如何纳入到当前流程中" >}}

我通过参考官方页面以及用户的常见问题，罗列了能够帮助用户理解Notion的核心功能。同时，通过分析其他SaaS应用的新手流程，我认为对于用户而言下面的9个模块是让用户顺利上手的关键：

+ 首页
+ 新增工作区
+ 模板
+ 新建Block
+ 创建页面
+ Database
+ Embed和导入
+ 编辑和样式
+ 导航

{{< figure src="https://img.atutang.com/notion-redesign/7!/format/webp/lossless/true#center" >}}

我创建了一个含有GIF图以及对分步介绍产品功能的简单引导。用户能够快速跳过或者在每一步暂停，并能随时重新开始。下面是最终的设计：

{{< figure src="https://img.atutang.com/notion-redesign/8.gif#center" title="【解决方案1】新手引导页" >}}

## 精简使用前配置时间



虽然Notion是可定制化最高的生产力产品之一，但是我注意到它较高的定制化能力可能给某些用户带来困难。在研究用户的过程中，我发现初始的配置让用户感到不便，像创建仪表盘（dashboard）和创建表格（table）都打断了他们开始正式使用产品的任务流。这是某种意义上的**“为了工作而工作”**。生产力工具实力上减弱了生产力是否有些荒谬？

> 产品过度灵活可能影响效率

{{< figure src="https://img.atutang.com/notion-redesign/9.png!/format/webp/lossless/true#center" title="【当前】我如何较好组织大量的页面和工作区" >}}

我发现一些用户在找到自己的页面组织形式之前会对Notion的页面嵌套概念感到迷惑。特别是当你有很多页面和工作区时，管理所有的页面会成为一件复杂的事，最终你会需要将它们组合成一个Home页面。

> 假设：默认的Dashboard能够帮助用户快速上手

{{< figure src="https://img.atutang.com/notion-redesign/10.gif#center" title="【解决方案2-1】如何创建工作区" >}}

“首页”是一个能够总览所有工作区的界面。许多Notion用户通常都是从学习如何创建Dashboard开始的，我认为通过提供一个最高层级的页面可以帮助用户轻松的创建和管理工作区，并直观了解自己是工作区的成员还是创建人。

{{< figure src="https://img.atutang.com/notion-redesign/11.gif#center" title="【解决方案2-1】如何管理工作区" >}}

“首页”的目的不仅是为了节约设置时间，也是为了防止那些杂乱无章的页面让用户感到困惑。我观察到许多用户（包括我自己）会误将自己的页面错放到私人、共享或者公共页面中[^2]。造成这些错误通常是因为这三个选择的提示信息较为相似。这可能会导致你意外的分享了不想分享的内容，或锁定了工作区里每个人都需要使用的页面。

[^2]:这是由于Notion的页面嵌套概念导致的，Notion的一个页面称为Page，并允许无限层级的嵌套Page

因此，我认为一次只能从首页进入一个工作区，可以预防上述错误并降低管理大量页面的难度。

{{< figure src="https://img.atutang.com/notion-redesign/12.gif#center" title="【解决方案2-1】用户能够将一组页面转为工作区" >}}

用户能够将一组页面转为一个新的工作区。我认为这在有大量的页面组[^3]时将有所帮助。通过将一组页面转化为独立的工作区，你能获得清晰的内容结构并保持左侧导航的精简。

[^3]:這里的页面组应该是指多个Page嵌套后形成的Group

### 模板（Template）

Notion多样的模板对于用户组织管理他们的页面是一项很棒的特性，然而我注意即便在不同的分组里有不同的名称，许多模板都重复了。

{{< figure src="https://img.atutang.com/notion-redesign/13.png!/format/webp/lossless/true#center" title="【当前】当前的模板页面对各类职能呈现同样的会议纪要（模板）" >}}

许多用户从任务出发进行模板寻找。而非以自己的角色或团队。当你是产品经理还是设计师时，你可能需要找到一个模板来管理项目，你要做的就是在一堆模板选项中找到适合你的。

> 假设：更好的模板展示方式有助于用户检索

{{< figure src="https://img.atutang.com/notion-redesign/14.gif#center" title="【解决方案2-2】对于模板页面的优化" >}}

为了改进这些缺点，我采用Notion的Gallery视图来展示更多模板的缩略图，这样可以让用户无需进入各个页面就能轻松浏览模板。

{{< figure src="https://img.atutang.com/notion-redesign/15.png!/format/webp/lossless/true#center" title="【解决方案2-2】对于模板导航栏的优化" >}}

此外，我基于用户身份和任务类型对导航栏进行了重新聚合，这将有助于更快的找到合适的模板。

### 我的模板（MY Template）

{{< figure src="https://img.atutang.com/notion-redesign/16.gif#center" title="【解决方案2-2】将一个页面存为我的模板" >}}

“我的模板”是一个让用户将页面转化为模板的新功能。通过页面顶部的设置将其保存为模板，用户可以随时复用它而无需去寻找想要复制的页面。

## 优化界面可见性

下面的设计希望让产品变得更具直觉性并提供明确的前馈。

### 时间表（Timeline）

时间表是一个近期发布的新功能，该功能允许用户按时间顺序组织其团队任务或个人工作。这是一个许多用户希望Notion开发的功能，但是我的第一印象是该功能太过于简单（以致于不够直观或无法自我解释），我希望它能够直观些。

{{< figure src="https://img.atutang.com/notion-redesign/17.png!/format/webp/lossless/true#center" title="【当前】在你创建完时间线后所看到的界面" >}}

为了让时间表从整体上变得更易用，以及各个任务都有更好的可见性，我通过添加“色彩标签”作为一个新属性的方式让用户可以通过色彩标签来进行任务索引。通过色彩标签，用户不借助于添加图标就能够很直观的识别出各项任务。

{{< figure src="https://img.atutang.com/notion-redesign/18.gif#center" title="【解决方案3-1】创建带有彩色标签和子任务的时间线" >}}

“子任务”是另外一项用户在创建任务时可用的属性。当前时间表的一个主要问题在于难以组织多个子任务。众所周知，一个项目通常包含多个子任务或关联任务，但是在当前视图下，只能通过添加List Database的方式来实现看到所有任务的需求，所以我想知道怎样才能更好的展示这些内容。

{{< figure src="https://img.atutang.com/notion-redesign/19.png!/format/webp/lossless/true#center" title="如何在时间线中显示子任务？" >}}

我通过使用Notion的Relation & Rollups[^4]这个能够将两个表格关联起来的功能来解决这个问题。这是一个许多用户感到难以上手甚至不知道其存在的高级功能，我认为让用户能够轻松添加一个项目下的多个任务，而不需要预先创建数据库是一个非常棒的想法。

[^4]:是Notion Database的两个功能，Relation可以将表格中的一列与另外个表格的一行创建关联，Rollups可以基于Relation进行数据计算

{{< figure src="https://img.atutang.com/notion-redesign/20.gif#center" title="【解决方案3-1】在时间线中显示彩色标签和子任务" >}}

### 导航（Navigation）

{{< figure src="https://img.atutang.com/notion-redesign/21.gif#center" title="【当前】Notion网页版中的导航栏（展示的是如何收藏页面）" >}}

我在研究中，非Notion用户最常抱怨问题是Notion的导航不直观。同时，也存在许多关于搜索功能不好用或难以找到自己想要的东西的反馈，因此我也优化了导航栏。

{{< figure src="https://img.atutang.com/notion-redesign/22.png!/format/webp/lossless/true#center" title="【解决方案3-2】侧边栏“我的菜单”" >}}

我是从首页开始设计的，我在侧边添加了几个关键菜单。在用户进入首页的任意工作区前，在侧边导航栏中都不会显示该工作区中的页面。

{{< figure src="https://img.atutang.com/notion-redesign/1_BWkx3nwQq0IOfL9oP2ph5A.gif#center" title="【解决方案3-2】工作区菜单的展示方式" >}}

我通过5个更直观的图标来优化顶部导航栏，这样用户就不再需要去寻找菜单了。我在当前侧边栏的搜索之外新增了一个帮助用户搜索当前页面内容的搜索。

{{< figure src="https://img.atutang.com/notion-redesign/23.png!/format/webp/lossless/true#center" title="【解决方案3-2】带有图标的顶部导航" >}}

同时，我在弹窗内也增加了在Notion（全屏）页面内才显示的箭头导航。由于当前产品在弹窗页面内并未显示关闭按钮和箭头，我注意到一些用户很难在前后页面之间切换。他们没有意识到可以点击面包屑导航并且想知道如何返回上个页面。因此我决定添加箭头来帮助用户更好的浏览页面。

{{< figure src="https://img.atutang.com/notion-redesign/24.gif#center" title="【解决方案3-2】带有顶部导航的页面弹窗" >}}

### 我的日历（My Calendar）

我的日历让用户能够总览整个工作区内的待办事务。追踪分散的日历是很不友好的，用户希望能更直观的看到所有的任务代办。

{{< figure src="https://img.atutang.com/notion-redesign/25.gif#center" title="【解决方案3-3】我的日历" >}}

当用户在时间表内被安排任务时，这个任务会自动显示在我的日历中，我认为这将帮助用户在一个页面内处理各类事务。同时，这也能让用户更轻松的在很多页面中精准的进行日常安排。

## 总结

{{< figure src="https://img.atutang.com/notion-redesign/26.png!/format/webp/lossless/true#center" title="我众多便利贴中的一部分" >}}

重新设计SaaS应用相对于我原来参与过的项目而言是一个全新的挑战。除了对于产品的工作原理以及用户面临问题的了解之外，我还需要深入思考生产力工具背后的准确场景，以及我如何能够整合功能，顺利补充当前的设计，并最终提高用户的生产力和协作。

这个项目也让我对于自己B2B营销背景在UX设计中的价值。我与不同利益主体处理各类项目的经验，对于理解用户行为和激发灵感上带来了巨大的帮助。同时，我也非常感谢所有的为我提供了深刻洞见的调查参与者和用户。

请在下方评论区内随意发表你的意见或反馈。作为生产力工具的爱好者，我希望Notion在提升工作效率的同时为用户提供更愉悦的体验。