/* Portfolio interactions: reveal animation + bilingual switch + theme switch + DOI helpers */
const observer = new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const uiStyle=document.createElement('style');
uiStyle.textContent=`
.theme-light{--bg:#f7f8fa;--panel:#fff;--panel2:#eef1f5;--text:#111827;--muted:#5f6878;--line:rgba(17,24,39,.12);--accent:#5b8c00}
.theme-light .nav-wrap{background:rgba(247,248,250,.82)}
.theme-light .bg-grid{opacity:.45;background-image:linear-gradient(rgba(17,24,39,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(17,24,39,.045) 1px,transparent 1px)}
.theme-light .hero-title{color:#374151}.theme-light .about-text{color:#374151}.theme-light .edu-card p{color:#4b5563}.theme-light .job-desc{color:#4b5563}.theme-light .card-tags span,.theme-light .job-tags span,.theme-light .skill-list span,.theme-light .award-list span{color:#4b5563}.theme-light .profile-card{background:linear-gradient(145deg,rgba(255,255,255,.95),rgba(255,255,255,.72));box-shadow:0 30px 80px rgba(17,24,39,.12)}
.site-controls{display:flex;align-items:center;gap:7px;margin-left:10px}.site-control{border:1px solid var(--line);background:rgba(255,255,255,.03);color:var(--text);height:36px;min-width:36px;padding:0 10px;border-radius:999px;cursor:pointer;font:600 12px Inter,'Noto Sans SC',sans-serif;transition:.2s}.site-control:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-1px)}.lang-control{letter-spacing:.04em}.doi-link{display:inline-flex!important;align-items:center;gap:6px}.doi-link::after{content:'↗';font-size:12px}.theme-light .site-control{background:#fff}
@media(max-width:860px){.site-controls{margin-left:auto;margin-right:8px}.site-control{height:34px;min-width:34px;padding:0 8px}}
`;
document.head.appendChild(uiStyle);

const controls=document.createElement('div');
controls.className='site-controls';
controls.innerHTML='<button class="site-control lang-control" id="langToggle" type="button" aria-label="Switch language">EN</button><button class="site-control" id="themeToggle" type="button" aria-label="Toggle color theme">☼</button>';
const nav=document.querySelector('.nav');
const navCta=document.querySelector('.nav-cta');
if(nav && navCta) nav.insertBefore(controls,navCta);

const T={
zh:{
nav:['关于','经历','科研','技能','联系'],
heroTitle:'产品经理 · 策略产品 · 数据分析 · AI 产品',
heroDesc:'清华大学法学院法律硕士，北京大学信息管理与信息系统本科毕业。具备数学、统计学与数据分析基础，熟悉需求分析、策略设计、指标体系搭建与原型设计，关注 AI 产品、数据驱动决策与信息技术的实际应用。',
viewExp:'查看经历',viewResearch:'查看研究',stats:['科研论文','互联网实习','北大毕业'],
cardDesc:'把业务问题转化为可落地的产品与策略方案，并用数据验证效果。',
aboutTitle:'连接产品、数据与法律，<br><em>理解复杂业务问题。</em>',aboutP1:'本科毕业于北京大学信息管理与信息系统专业，具备扎实的数学、统计学与数据分析基础，熟悉 Python、SQL 等工具。',aboutP2:'曾在快手、美团参与策略产品与数据产品工作，拥有从业务问题识别、方案设计、产品落地到效果评估的实践经验；2026 年起进入清华大学法学院攻读法律硕士，进一步拓展产品、技术与法律交叉领域的能力。',
edu:['法学院 · 法律硕士','信息管理与信息系统 · 管理学学位'],
expTitle:'从业务痛点出发，<br><em>用策略与产品解决问题。</em>',jobs:[['策略产品实习生','策略产品','AI 多模态','广告策略','数据分析','面对机审误伤率 40%、人审审核时效低的结构性痛点，以及基建创意分配随机、账户类目相关性缺失的问题，主导 AI 审核方案从 0 到 1 上线并搭建质量分评测体系；参与基于类目相关性的智能基建召回方案设计，通过账户高消耗类目加权分配创意并新增广告组汰换策略。最终审核通过率从 75.33% 提升至 89.68%；同时提升广点通已卸载设备量，CTR 与 CVR 均实现正向提升。'],['数据产品经理实习生','产品优化','BI 工具','数据分析','用户调研','HRData 小助手是面向 HR 的内部 BI 工具，原有三个分发入口采用 Text-to-SQL 查询方式，效率有限且准确率有待提升。负责产品优化，将入口重构为离职分析、团队绩效、校招进展等常见业务场景，优化交互界面并新增数据自动解释功能，同时搭建指标看板，显著提升查询效率与用户留存，降低 HR 使用门槛，增强决策支持能力。']],
researchTitle:'以用户与信息问题为切入点，<br><em>探索搜索、交互与协作。</em>',
papers:[['2025 · 情报理论与实践','对话式搜索中提示框架对用户搜索行为的影响研究','刘子声、全力、王雨格等。研究不同提示框架对用户在对话式搜索中的搜索行为影响。'],["2025 · CSCW Companion '25 · ACM",'“I feel recognized and developed a sense of belonging”: Sustaining Volunteer Participation in Ancient Text Collation','Zisheng Liu, Wenqi Li, Haolei Liu, and Pengyi Zhang. 研究古籍整理志愿者的持续参与及其社会心理体验。']],
skillsTitle:'贯通产品、策略、数据与技术的工具箱。',skillLang:['英语读写 · 优良','英语听说 · 日常交流'],contactTitle:'一起把复杂问题<br><em>做得更简单。</em>',location:'北京 · 中国',doi:'查看 DOI ↗'
},
en:{
nav:['About','Experience','Research','Skills','Contact'],heroTitle:'Product Manager · Strategy · Data · AI',heroDesc:'LL.M. candidate at Tsinghua University School of Law, with a B.M. in Information Management & Information Systems from Peking University. Experienced in product strategy, data analysis, metrics design and AI product delivery, with a focus on turning complex business problems into measurable solutions.',viewExp:'View Experience',viewResearch:'View Research',stats:['Research Papers','Internships','PKU Graduate'],cardDesc:'Turning business problems into practical product and strategy solutions, then validating impact with data.',aboutTitle:'Connecting product, data and law,<br><em>to understand complex problems.</em>',aboutP1:'Graduated from Peking University in Information Management & Information Systems, with a strong foundation in mathematics, statistics and data analysis, and hands-on experience with Python and SQL.',aboutP2:'Worked on strategy and data products at Kuaishou and Meituan, covering problem discovery, solution design, product delivery and impact evaluation. Starting in 2026, pursuing an LL.M. at Tsinghua University to deepen the intersection of product, technology and law.',edu:['School of Law · LL.M.','Information Management & Information Systems · B.M.'],expTitle:'Start from business pain points,<br><em>solve them with product and strategy.</em>',jobs:[['Strategy Product Intern','Strategy Product','Multimodal AI','Ad Strategy','Data Analytics','Led an AI review solution from 0 to 1 to address a 40% false-positive rate and slow human review, while building a quality-score evaluation framework. Also contributed to category-relevance creative retrieval, weighted allocation by high-spend account categories and ad-group replacement strategy. Approval rate improved from 75.33% to 89.68%, while CTR and CVR also improved.'],['Data Product Manager Intern','Product Optimization','BI Tool','Data Analytics','User Research','Optimized Meituan HRData, an internal BI tool whose three Text-to-SQL entry points had limited efficiency and accuracy. Rebuilt the experience around common scenarios such as attrition analysis, team performance and campus recruiting, added automatic data explanations and built metric dashboards to improve efficiency, retention and decision support.']],researchTitle:'Exploring search, interaction and collaboration,<br><em>through user and information problems.</em>',papers:[['2025 · Information Studies: Theory & Application','The Impact of Prompt Frameworks on User Search Behavior in Conversational Search','Zisheng Liu, Li Quan, Yuge Wang, et al. A study of how prompt frameworks influence user behavior in conversational search.'],["2025 · CSCW Companion '25 · ACM",'“I feel recognized and developed a sense of belonging”: Sustaining Volunteer Participation in Ancient Text Collation','Zisheng Liu, Wenqi Li, Haolei Liu, and Pengyi Zhang. A study of sustained volunteer participation and social-psychological experience in ancient text collation.']],skillsTitle:'A toolkit spanning product, strategy, data and technology.',skillLang:['English · Reading & Writing: Excellent','English · Speaking & Listening: Conversational'],contactTitle:'Let’s make complex problems<br><em>simple.</em>',location:'Beijing · China',doi:'View DOI ↗'
}}

function setText(el,html){if(el)el.innerHTML=html}
function applyLanguage(lang){
 const d=T[lang];
 document.documentElement.lang=lang==='zh'?'zh-CN':'en';
 document.querySelectorAll('.nav-links a').forEach((a,i)=>a.textContent=d.nav[i]);
 setText(document.querySelector('.hero-title'),d.heroTitle);setText(document.querySelector('.hero-desc'),d.heroDesc);
 setText(document.querySelector('.hero-actions .primary'),d.viewExp+' <span>↓</span>');setText(document.querySelector('.hero-actions .ghost'),d.viewResearch);
 document.querySelectorAll('.quick-stats span').forEach((e,i)=>e.textContent=d.stats[i]);setText(document.querySelector('.profile-card p'),d.cardDesc);
 const sh=document.querySelectorAll('.section-head h2');setText(sh[0],d.aboutTitle);setText(sh[1],d.expTitle);setText(sh[2],d.researchTitle);setText(sh[3],d.skillsTitle);
 const about=document.querySelectorAll('.about-text p');about.forEach((e,i)=>e.innerHTML=i===0?d.aboutP1:d.aboutP2);
 document.querySelectorAll('.edu-card p').forEach((e,i)=>e.textContent=d.edu[i]);
 document.querySelectorAll('.job-card').forEach((card,i)=>{const j=d.jobs[i];setText(card.querySelector('h3'),j[0]);card.querySelectorAll('.job-tags span').forEach((e,k)=>e.textContent=j[k+1]);setText(card.querySelector('.job-desc'),j[5]);});
 document.querySelectorAll('.paper-card').forEach((card,i)=>{const p=d.papers[i];setText(card.querySelector('.paper-year'),p[0]);setText(card.querySelector('h3'),p[1]);setText(card.querySelector('p'),p[2]);setText(card.querySelector('.paper-foot span'),lang==='zh'?'第一作者':'First Author');setText(card.querySelector('.paper-foot a'),d.doi);card.querySelector('.paper-foot a').classList.add('doi-link');});
 document.querySelectorAll('.skill-list').forEach((list,i)=>{if(i===3)list.querySelectorAll('span').forEach((e,k)=>e.textContent=d.skillLang[k]);});
 setText(document.querySelector('.contact h2'),d.contactTitle);setText(document.querySelector('.contact-right p'),d.location);
 document.getElementById('langToggle').textContent=lang==='zh'?'EN':'中';
 localStorage.setItem('portfolio-lang',lang);
}

function setTheme(theme){document.body.classList.toggle('theme-light',theme==='light');const b=document.getElementById('themeToggle');if(b){b.textContent=theme==='light'?'☾':'☼';b.setAttribute('aria-label',theme==='light'?'Switch to dark mode':'Switch to light mode')}localStorage.setItem('portfolio-theme',theme)}

document.getElementById('langToggle').addEventListener('click',()=>applyLanguage((localStorage.getItem('portfolio-lang')||'zh')==='zh'?'en':'zh'));
document.getElementById('themeToggle').addEventListener('click',()=>setTheme((localStorage.getItem('portfolio-theme')||'dark')==='dark'?'light':'dark'));

document.querySelectorAll('.paper-foot a').forEach(a=>{a.classList.add('doi-link');a.setAttribute('title','Open DOI');a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer')});
applyLanguage(localStorage.getItem('portfolio-lang')||'zh');
setTheme(localStorage.getItem('portfolio-theme')||'dark');
