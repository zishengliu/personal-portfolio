# AI 法规雷达（GitHub Pages 版）

一个用于课程演示的静态网页 + 定时监控脚本，跟踪生成式人工智能、算法治理、AI 司法与监管政策。

## 功能
- 响应式网页展示：搜索、主题筛选、排序、政策卡片、法律关注点和官方原文链接。
- Python 标准库脚本定时检索 Google News RSS，并将查询限定在中国网信网、最高人民法院、中国政府网、工信部和国家发展改革委等官方域名。
- GitHub Actions 每天 09:15（北京时间/新加坡时间；01:15 UTC）自动运行，生成 `law-radar/data.json` 并部署 GitHub Pages。
- 与历史 `seen_ids` 比较，标记本次首次发现的信息；抓取全部失败时保留最近成功结果或展示明确标注的离线样例，不把网络故障误报为“没有新政策”。

## 预期网址
`https://zishengliu.github.io/personal-portfolio/law-radar/`

## 手动运行
```bash
python scripts/update_law_radar.py
```

## 配置说明
1. 仓库 Settings → Actions → General → Workflow permissions 中，如默认工作流令牌权限被限制，请启用允许 Actions 写入仓库内容（Read and write permissions）。工作流需要 `contents: write` 来保存历史去重状态与最新 JSON。
2. GitHub Pages 应设置为 GitHub Actions 部署方式。工作流使用 configure-pages、upload-pages-artifact 和 deploy-pages。
3. 可前往仓库 Actions → Deploy portfolio and update AI Law Radar → Run workflow 手动触发一次测试。
4. 如果 Google News RSS 在 GitHub Actions 运行环境中也无法访问，网页会标记数据源异常并保留最近可用数据；这不意味着没有新法规。请点开来源链接核验。

## 重要限制
这是轻量级法律信息监控工具，不是法律意见系统。使用 Google News RSS 作为发现渠道并限制搜索到官方域名；搜索结果、摘要与来源页仍需人工核对。监控可能遗漏直接发布但未被索引的文件。
