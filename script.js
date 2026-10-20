/* Robust bilingual switch + theme switch + DOI links */
(function(){
'use strict';

const revealEls=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});revealEls.forEach(e=>ob.observe(e));}else revealEls.forEach(e=>e.classList.add('show'));

const style=document.createElement('style');style.textContent=`
.theme-light{--bg:#f7f8fa;--panel:#fff;--panel2:#eef1f5;--text:#111827;--muted:#5f6878;--line:rgba(17,24,39,.12);--accent:#5b8c00}.theme-light .nav-wrap{background:rgba(247,248,250,.9)}.theme-light .bg-grid{opacity:.45}.theme-light .hero-title,.theme-light .about-text,.theme-light .edu-card p,.theme-light .job-desc{color:#374151}.theme-light .profile-card{background:linear-gradient(145deg,#fff,#f5f7fa);box-shadow:0 30px 80px rgba(17,24,39,.12)}
.site-control{appearance:none;position:relative;z-index:100;border:1px solid var(--line);background:var(--panel,#141820);color:var(--text);height:36px;min-width:40px;padding:0 11px;border-radius:999px;cursor:pointer;font:700 12px Inter,'Noto Sans SC',sans-serif;line-height:34px;text-align:center;display:inline-flex;align-items:center;justify-content:center;pointer-events:auto;box-shadow:0 4px 14px rgba(0,0,0,.12);transition:.2s}.site-control:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-1px)}.theme-light .site-control{background:#fff}@media(max-width:860px){.site-control{height:34px;min-width:38px;padding:0 9px}}@media(max-width:520px){.site-control{height:33px;min-width:36px;padding:0 8px}}
`;document.head.appendChild(style);

const langButton=document.getElementById('langToggle');
const themeButton=document.getElementById('themeToggle');

const T={
zh:{nav:['关于','经历','科研','项目','技能','联系'],heroName:'刘子声',avatar:'刘',heroTitle:'产品经理 · 策略产品 · 数据分析 · AI 产品',heroDesc:'清华大学法学院法律硕士，北京大学信息管理与信息系统本科毕业。具备数学、统计学与数据分析基础，熟悉需求分析、策略设计、指标体系搭建与原型设计，关注 AI 产品、数据驱动决策与信息技术的实际应用。',viewExp:'查看经历',viewResearch:'查看研究',stats:['科研论文','互联网实习','北大毕业'],profileTitle:'产品思维<br>AI 策略',profileDesc:'把业务问题转化为可落地的产品与策略方案，并用数据验证效果。',aboutTitle:'连接产品、数据与法律，<br><em>理解复杂业务问题。</em>',aboutP:['本科毕业于北京大学信息管理与信息系统专业，具备扎实的数学、统计学与数据分析基础，熟悉 Python、SQL 等工具。','曾在快手、美团参与策略产品与数据产品工作，拥有从业务问题识别、方案设计、产品落地到效果评估的实践经验；2026 年起进入清华大学法学院攻读法律硕士，进一步拓展产品、技术与法律交叉领域的能力。'],edu:[['清华大学','法学院 · 法律硕士'],['北京大学','信息管理与信息系统 · 管理学学位']],expTitle:'从业务痛点出发，<br><em>用策略与产品解决问题。</em>',jobs:[{company:'快手',title:'策略产品实习生',tags:['策略产品','AI 多模态','广告策略','数据分析'],desc:'面对机审误伤率 40%、人审审核时效低的结构性痛点，以及基建创意分配随机、账户类目相关性缺失的问题，主导 AI 审核方案从 0 到 1 上线并搭建质量分评测体系；参与基于类目相关性的智能基建召回方案设计，通过账户高消耗类目加权分配创意并新增广告组汰换策略。最终审核通过率从 75.33% 提升至 89.68%；同时提升广点通已卸载设备量，CTR 与 CVR 均实现正向提升。'},{company:'美团',title:'数据产品经理实习生',tags:['产品优化','BI 工具','数据分析','用户调研'],desc:'HRData 小助手是面向 HR 的内部 BI 工具，原有三个分发入口采用 Text-to-SQL 查询方式，效率有限且准确率有待提升。负责产品优化，将入口重构为离职分析、团队绩效、校招进展等常见业务场景，优化交互界面并新增数据自动解释功能，同时搭建指标看板，显著提升查询效率与用户留存，降低 HR 使用门槛，增强决策支持能力。'}],researchTitle:'以用户与信息问题为切入点，<br><em>探索搜索、交互与协作。</em>',projectsTitle:'把日常问题变成<br><em>可以使用的工具。</em>',projects:[{tag:'AI × 法律',title:'AI 法规雷达',desc:'持续追踪法律法规与政策动态，按主题整理更新，并提供可访问的网页入口。',links:['打开项目 ↗','源代码 ↗']},{tag:'桌面端 × AI 效率工具',title:'邮件晨报助手',desc:'面向 Gmail、QQ 邮箱与清华邮箱的 Windows 桌面工具。每日汇总新邮件，按紧急事项、学术、求职、账单与订阅分类；邮件在本机处理，支持系统通知和定时运行。',links:['查看 GitHub 代码 ↗','安装说明 ↗']}],papers:[{year:'2025 · 情报理论与实践',title:'对话式搜索中提示框架对用户搜索行为的影响研究',desc:'刘子声、全力、王雨格等。研究不同提示框架对用户在对话式搜索中的搜索行为影响。'},{year:"2025 · CSCW Companion '25 · ACM",title:'“I feel recognized and developed a sense of belonging”: Sustaining Volunteer Participation in Ancient Text Collation',desc:'Zisheng Liu, Wenqi Li, Haolei Liu, and Pengyi Zhang。研究古籍整理志愿者的持续参与及其社会心理体验。'}],skillsTitle:'贯通产品、策略、数据与技术的工具箱。',skillHead:['编程','产品','数据','语言'],skillLang:['英语读写 · 优良','英语听说 · 日常交流'],honors:['北京市优秀毕业生 · 2026','北京大学优秀毕业生 · 2026','国家奖学金 · 2025','北京大学三好学生标兵 · 2025','北京大学优秀学生党支部书记 · 2025','北京大学三等奖学金 · 2023 / 2024','优秀科研奖 · 2024'],contactTitle:'一起把复杂问题<br><em>做得更简单。</em>',location:'北京 · 中国',doi:'查看 DOI ↗',author:'第一作者',footer:'产品 × 数据 × AI × 法律'},
en:{nav:['About','Experience','Research','Projects','Skills','Contact'],heroName:'Zisheng Liu',avatar:'ZL',heroTitle:'Product Manager · Strategy · Data · AI',heroDesc:'LL.M. candidate at Tsinghua University School of Law, with a B.M. in Information Management & Information Systems from Peking University. Experienced in product strategy, data analysis, metrics design and AI product delivery, with a focus on turning complex business problems into measurable solutions.',viewExp:'View Experience',viewResearch:'View Research',stats:['Research Papers','Internships','PKU Graduate'],profileTitle:'Product-minded<br>AI Strategist',profileDesc:'Turning business problems into practical product and strategy solutions, then validating impact with data.',aboutTitle:'Connecting product, data and law,<br><em>to understand complex problems.</em>',aboutP:['Graduated from Peking University in Information Management & Information Systems, with a strong foundation in mathematics, statistics and data analysis, and hands-on experience with Python and SQL.','Worked on strategy and data products at Kuaishou and Meituan, covering problem discovery, solution design, product delivery and impact evaluation. Starting in 2026, pursuing an LL.M. at Tsinghua University to deepen the intersection of product, technology and law.'],edu:[['Tsinghua University','School of Law · LL.M.'],['Peking University','Information Management & Information Systems · B.M.']],expTitle:'Start from business pain points,<br><em>solve them with product and strategy.</em>',jobs:[{company:'Kuaishou',title:'Strategy Product Intern',tags:['Strategy Product','Multimodal AI','Ad Strategy','Data Analytics'],desc:'Led an AI review solution from 0 to 1 to address a 40% false-positive rate and slow human review, while building a quality-score evaluation framework. Also contributed to category-relevance creative retrieval, weighted allocation by high-spend account categories and ad-group replacement strategy. Approval rate improved from 75.33% to 89.68%, while CTR and CVR also improved.'},{company:'Meituan',title:'Data Product Manager Intern',tags:['Product Optimization','BI Tool','Data Analytics','User Research'],desc:'Optimized Meituan HRData, an internal BI tool whose three Text-to-SQL entry points had limited efficiency and accuracy. Rebuilt the experience around common scenarios such as attrition analysis, team performance and campus recruiting, added automatic data explanations and built metric dashboards to improve efficiency, retention and decision support.'}],researchTitle:'Exploring search, interaction and collaboration,<br><em>through user and information problems.</em>',projectsTitle:'Turn everyday problems into<br><em>tools you can actually use.</em>',projects:[{tag:'AI × LAW',title:'AI Law Radar',desc:'Tracks legal and policy updates, organizes new items by topic, and provides a browsable web interface.',links:['Open project ↗','Source code ↗']},{tag:'DESKTOP × AI PRODUCTIVITY',title:'Mail Briefing Assistant',desc:'A Windows desktop utility for Gmail, QQ Mail and Tsinghua Mail. Summarizes new messages every morning, categorizes urgent items, academics, jobs, bills and subscriptions, and keeps mail processing local with scheduled system notifications.',links:['View GitHub code ↗','Installation guide ↗']}],papers:[{year:'2025 · Information Studies: Theory & Application',title:'The Impact of Prompt Frameworks on User Search Behavior in Conversational Search',desc:'Zisheng Liu, Li Quan, Yuge Wang, et al. A study of how prompt frameworks influence user behavior in conversational search.'},{year:"2025 · CSCW Companion '25 · ACM",title:'“I feel recognized and developed a sense of belonging”: Sustaining Volunteer Participation in Ancient Text Collation',desc:'Zisheng Liu, Wenqi Li, Haolei Liu, and Pengyi Zhang. A study of sustained volunteer participation and social-psychological experience in ancient text collation.'}],skillsTitle:'A toolkit spanning product, strategy, data and technology.',skillHead:['Programming','Product','Data','Language'],skillLang:['English · Reading & Writing: Excellent','English · Speaking & Listening: Conversational'],honors:['Beijing Outstanding Graduate · 2026','Peking University Outstanding Graduate · 2026','National Scholarship · 2025','Peking University Model Student · 2025','Peking University Outstanding Student Party Branch Secretary · 2025','Peking University Third-Class Scholarship · 2023 / 2024','Outstanding Research Award · 2024'],contactTitle:'Let’s make complex problems<br><em>simple.</em>',location:'Beijing · China',doi:'View DOI ↗',author:'First Author',footer:'PRODUCT × DATA × AI × LAW'}
};

const set=(el,v,html=false)=>{if(!el)return;html?el.innerHTML=v:el.textContent=v};

let githubRepos=[];
let projectsLoading=true;
let projectsError='';
const GITHUB_OWNER='zishengliu';
function textOrFallback(repo,lang){
  const known={
    'ai-law-radar':{
      zh:['AI 法规雷达','持续追踪生成式人工智能、算法治理、AI 司法与监管政策，按主题筛选并生成法律监控简报。'],
      en:['AI Law Radar','Tracks generative AI, algorithm governance, AI-related judicial rules and regulatory policy, then organizes updates into a searchable legal monitoring brief.']
    },
    'mail-briefing-assistant':{
      zh:['邮件晨报助手','面向 Gmail、QQ 邮箱与清华邮箱的 Windows 桌面工具。汇总新邮件并分类整理，支持系统通知与定时运行。'],
      en:['Mail Briefing Assistant','A Windows desktop tool for Gmail, QQ Mail and Tsinghua email that summarizes and categorizes new messages, with desktop notifications and scheduled runs.']
    },
    'personal-portfolio':{
      zh:['个人主页与作品集','个人网站，集中展示教育经历、实习经历、研究成果与开源项目。'],
      en:['Personal Portfolio','A personal website showcasing education, experience, research and open-source projects.']
    }
  };
  const pair=known[repo.name]&&known[repo.name][lang==='en'?'en':'zh'];
  const title=(pair&&pair[0])||repo.name.replace(/[-_]/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase()});
  const description=repo.description||(pair&&pair[1])||(lang==='en'?'GitHub repository. Open the project page for source code, documentation and recent changes.':'GitHub 项目仓库。可打开仓库查看源代码、说明文档和最近更新。');
  return {title,description};
}
function renderGitHubProjects(lang){
  const grid=document.getElementById('github-projects-grid');
  const status=document.getElementById('projects-status');
  const footnote=document.getElementById('projects-footnote');
  if(!grid)return;
  if(projectsLoading && !githubRepos.length){
    grid.innerHTML='';
    const card=document.createElement('article');card.className='project-card';
    const icon=document.createElement('div');icon.className='project-icon';icon.textContent='⌁';
    const tag=document.createElement('span');tag.className='project-tag';tag.textContent='GITHUB REPOSITORIES';
    const title=document.createElement('h3');title.textContent=lang==='en'?'Loading GitHub projects…':'正在读取 GitHub 项目…';
    const desc=document.createElement('p');desc.textContent=lang==='en'?'Fetching public repositories from GitHub.':'正在从 GitHub 获取公开仓库列表。';
    card.append(icon,tag,title,desc);grid.appendChild(card);
    if(status)status.textContent=lang==='en'?'Loading public repositories from GitHub…':'正在从 GitHub 读取公开仓库…';
    return;
  }
  const repos=githubRepos.slice().sort((a,b)=>new Date(b.updated_at||0)-new Date(a.updated_at||0));
  const knownRadar=repos.some(r=>r.name==='ai-law-radar');
  if(!knownRadar){
    repos.push({
      name:'ai-law-radar',
      description:'持续追踪生成式人工智能、算法治理、AI 司法与监管政策，并生成法律监控简报。',
      language:'Python',stargazers_count:0,forks_count:0,
      html_url:'https://github.com/'+GITHUB_OWNER+'/ai-law-radar',
      homepage:'https://'+GITHUB_OWNER+'.github.io/ai-law-radar/',
      default_branch:'main',updated_at:''
    });
  }
  if(!repos.length){
    grid.innerHTML='';
    const card=document.createElement('div');card.className='project-card';
    const title=document.createElement('h3');title.textContent=lang==='en'?'No public repositories found':'暂未找到公开仓库';
    const desc=document.createElement('p');desc.textContent=lang==='en'?'Check the GitHub profile or try reloading this page.':'请检查 GitHub 账号或刷新页面重试。';
    card.append(title,desc);grid.appendChild(card);
  }else{
    grid.innerHTML='';
    repos.forEach((repo,index)=>{
      const meta=textOrFallback(repo,lang);
      const card=document.createElement('article');card.className='project-card reveal show';
      const icon=document.createElement('div');icon.className='project-icon';
      icon.textContent=repo.name==='ai-law-radar'?'⚖':repo.name==='mail-briefing-assistant'?'✉':repo.name==='personal-portfolio'?'↗':'⌘';
      const tag=document.createElement('span');tag.className='project-tag';
      tag.textContent=repo.name==='ai-law-radar'?'AI × LAW':([repo.language||'GitHub Project', ...(repo.topics||[]).slice(0,2)].join(' · '));
      const title=document.createElement('h3');title.textContent=meta.title;
      const desc=document.createElement('p');desc.textContent=meta.description;
      const metaLine=document.createElement('div');metaLine.className='project-meta';
      const updated=repo.updated_at?new Date(repo.updated_at).toLocaleDateString(lang==='en'?'en-SG':'zh-CN'):'';
      const stats=[];
      if(repo.language)stats.push(repo.language);
      if(Number(repo.stargazers_count)>0)stats.push('★ '+repo.stargazers_count);
      if(updated)stats.push((lang==='en'?'Updated ':'更新于 ')+updated);
      metaLine.textContent=stats.join(' · ');
      const links=document.createElement('div');links.className='project-links';
      function addLink(label,url){
        if(!url)return;
        const a=document.createElement('a');a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener noreferrer';links.appendChild(a);
      }
      let home=repo.homepage&&/^https:\/\//i.test(repo.homepage)?repo.homepage:'';
      if(repo.name==='ai-law-radar')home='https://'+GITHUB_OWNER+'.github.io/ai-law-radar/';
      addLink(home?(lang==='en'?'Open project ↗':'打开项目 ↗'):(lang==='en'?'View repository ↗':'查看仓库 ↗'),home||repo.html_url);
      addLink(lang==='en'?'Source code ↗':'源代码 ↗',repo.html_url);
      addLink(lang==='en'?'README ↗':'项目说明 ↗',repo.html_url+'/blob/'+(repo.default_branch||'main')+'/README.md');
      card.append(icon,tag,title,desc,metaLine,links);
      grid.appendChild(card);
    });
  }
  if(status){
    if(projectsError)status.textContent=lang==='en'?'Could not load the live GitHub repository list; showing available fallback cards.':'暂时无法读取 GitHub 实时仓库列表，当前展示可用的备用项目入口。';
    else status.textContent=(lang==='en'?'Loaded ':'已加载 ')+repos.length+(lang==='en'?' project repositories':' 个项目仓库');
  }
  if(footnote)footnote.textContent=lang==='en'?'Public repository list is loaded automatically from GitHub. Private repositories are not exposed on this public page.':'项目列表自动同步 GitHub 公开仓库；私有仓库不会暴露在公开网页中。';
}
async function loadGitHubProjects(){
  projectsLoading=true;
  try{
    const response=await fetch('https://api.github.com/users/'+GITHUB_OWNER+'/repos?per_page=100&sort=updated&type=owner',{headers:{'Accept':'application/vnd.github+json'},cache:'no-store'});
    if(!response.ok)throw new Error('GitHub API HTTP '+response.status);
    const data=await response.json();
    if(!Array.isArray(data))throw new Error('Unexpected GitHub API response');
    githubRepos=data.filter(r=>r&&r.name&&r.name!=='personal-portfolio'&&r.html_url&&r.private!==true);
    projectsError='';
  }catch(error){
    projectsError=String(error&&error.message||error);
    githubRepos=[
      {name:'mail-briefing-assistant',description:'',language:'Python',html_url:'https://github.com/'+GITHUB_OWNER+'/mail-briefing-assistant',homepage:'',default_branch:'main',updated_at:''}
    ];
  }finally{
    projectsLoading=false;
    renderGitHubProjects(localStorage.getItem('portfolio-lang')||'zh');
  }
}

function applyLanguage(lang){const d=T[lang]||T.zh;document.documentElement.lang=lang==='zh'?'zh-CN':'en';
set(document.querySelector('.hero h1'),d.heroName);set(document.querySelector('.avatar'),d.avatar);
document.querySelectorAll('.nav-links a').forEach((e,i)=>set(e,d.nav[i]));set(document.querySelector('.eyebrow'),lang==='zh'?'产品 × 数据 × AI × 法律':'PRODUCT × DATA × AI × LAW');set(document.querySelector('.hero-title'),d.heroTitle);set(document.querySelector('.hero-desc'),d.heroDesc);set(document.querySelector('.hero-actions .primary'),d.viewExp+' <span>↓</span>',true);set(document.querySelector('.hero-actions .ghost'),d.viewResearch);set(document.querySelector('.hero-actions .radar-link'),lang==='zh'?'AI 法规雷达 ↗':'AI Law Radar ↗');document.querySelectorAll('.quick-stats span').forEach((e,i)=>set(e,d.stats[i]));set(document.querySelector('.profile-card h3'),d.profileTitle,true);set(document.querySelector('.profile-card p'),d.profileDesc);
const heads=document.querySelectorAll('.section-head h2');set(heads[0],d.aboutTitle,true);set(heads[1],d.expTitle,true);set(heads[2],d.researchTitle,true);set(heads[3],d.projectsTitle,true);set(heads[4],d.skillsTitle,true);document.querySelectorAll('.about-text p').forEach((e,i)=>set(e,d.aboutP[i]));
document.querySelectorAll('.edu-item').forEach((e,i)=>{if(d.edu[i]){set(e.querySelector('h3'),d.edu[i][0]);set(e.querySelector('p'),d.edu[i][1]);}});
document.querySelectorAll('.job-card').forEach((e,i)=>{const j=d.jobs[i];if(!j)return;set(e.querySelector('.company'),j.company);set(e.querySelector('h3'),j.title);e.querySelectorAll('.job-tags span').forEach((x,k)=>set(x,j.tags[k]));set(e.querySelector('.job-desc'),j.desc);});
document.querySelectorAll('.paper-card').forEach((e,i)=>{const p=d.papers[i];if(!p)return;set(e.querySelector('.paper-year'),p.year);set(e.querySelector('h3'),p.title);set(e.querySelector('p'),p.desc);set(e.querySelector('.paper-foot span'),d.author);set(e.querySelector('.paper-foot a'),d.doi);});
renderGitHubProjects(lang);
document.querySelectorAll('.skill-block h3').forEach((e,i)=>set(e,d.skillHead[i]));const ll=document.querySelectorAll('.skill-list')[3];if(ll)ll.querySelectorAll('span').forEach((e,i)=>set(e,d.skillLang[i]));document.querySelectorAll('.award-list span').forEach((e,i)=>set(e,d.honors[i]));set(document.querySelector('.contact h2'),d.contactTitle,true);set(document.querySelector('.contact-right p'),d.location);const fs=document.querySelectorAll('.footer span');if(fs[1])set(fs[1],d.footer);if(langButton){set(langButton,lang==='zh'?'EN':'中');langButton.title=lang==='zh'?'Switch to English':'切换到中文';}localStorage.setItem('portfolio-lang',lang);}
function applyTheme(theme){const light=theme==='light';document.body.classList.toggle('theme-light',light);if(themeButton){set(themeButton,light?'☾':'☼');themeButton.title=light?'Switch to dark mode / 切换深色模式':'Switch to light mode / 切换浅色模式';}localStorage.setItem('portfolio-theme',light?'light':'dark');}
if(langButton)langButton.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();applyLanguage((localStorage.getItem('portfolio-lang')||'zh')==='zh'?'en':'zh');});
if(themeButton)themeButton.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();applyTheme((localStorage.getItem('portfolio-theme')||'dark')==='dark'?'light':'dark');});
document.querySelectorAll('.paper-foot a').forEach(a=>{a.target='_blank';a.rel='noopener noreferrer';a.classList.add('doi-link');});
applyLanguage(localStorage.getItem('portfolio-lang')||'zh');applyTheme(localStorage.getItem('portfolio-theme')||'dark');
loadGitHubProjects();
})();
