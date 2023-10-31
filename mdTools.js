/*
 * @Author: Marcus.ma
 * @Date: 2023-10-30 13:29:18
 * @LastEditors: Marcus.ma
 * @LastEditTime: 2023-10-31 09:47:22
 * @FilePath: /mdTools.js
 * @Description: 简单实现Textile 、Markdown相互转换。Mutual conversion between Textile and Markdown (simple conversion)
 *
 */
function textileToMarkdown(textile) {
  let markdown = textile;
  // Headers
  markdown = markdown.replace(/^h1\. (.+)$/gm, "# $1");
  markdown = markdown.replace(/^h2\. (.+)$/gm, "## $1");
  markdown = markdown.replace(/^h3\. (.+)$/gm, "### $1");
  markdown = markdown.replace(/^h4\. (.+)$/gm, "#### $1");
  markdown = markdown.replace(/^h5\. (.+)$/gm, "##### $1");
  markdown = markdown.replace(/^h6\. (.+)$/gm, "###### $1");
  // ... (and so on for other header levels)

  // Bold
  markdown = markdown.replace(/\*(.+?)\*/g, "**$1**");
  // Colors (convert to HTML span with style)
  markdown = markdown.replace(
    /\{color:#(.*?)\}(.*?){color}/g,
    " <font color=#$1>$2</span>"
  );

  // Links
  markdown = markdown.replace(/"(.*?)":(http:\/\/\S+)/g, "[$1]($2)");
  markdown = markdown.replace(/"(.*?)":(https:\/\/\S+)/g, "[$1]($2)");

  // Bullet lists
  markdown = markdown.replace(/^\* (.*)$/gm, "- $1");

  // Code blocks
  markdown = markdown.replace(/<pre>([\s\S]*?)<\/pre>/gm, "```\n$1\n```");

  // Inline code
  markdown = markdown.replace(/@(.*?)@/g, "`$1`");

  markdown = markdown.replace(/(^|\s)\+(.*?)\+(\s|$)/g, "$1_$2_$3");

  return markdown;
}

function markdownToTextile(md) {
  // 转换标题
  md = md.replace(/^# (.+)$/gm, "h1. $1");
  md = md.replace(/^## (.+)$/gm, "h2. $1");
  md = md.replace(/^### (.+)$/gm, "h3. $1");
  md = md.replace(/^#### (.+)$/gm, "h4. $1");
  md = md.replace(/^##### (.+)$/gm, "h5. $1");
  md = md.replace(/^###### (.+)$/gm, "h6. $1");

  // 转换粗体
  md = md.replace(/\*\*(.+?)\*\*/g, "*$1*");
  md = md.replace(/__(.+?)__/g, "*$1*");

  // 转换链接
  md = md.replace(/\[(.+?)\]\((.+?)\)/g, '"$1":$2');

  // 转换无序列表
  md = md.replace(/^\* (.+)$/gm, "* $1");

  // 转换有序列表
  md = md.replace(/^\d+\. (.+)$/gm, "# $1");

  // 转换代码块
  md = md.replace(/```([\s\S]+?)```/g, "<pre><code>$1</code></pre>");

  // 转换行内代码
  md = md.replace(/`(.+?)`/g, "@$1@");
  md = md.replace(/<font color=(.+?)>(.+?)<\/font>/g, "{color:$1}$2{color}");

  return md;
}
