const fs = require('fs')
const path = require('path')
const markdown = require('markdown-it')
const shiki = require('shiki')

shiki.getHighlighter({
    theme: 'nord'
}).then(highlighter => {
    const md = markdown({
        html: true,
        highlight: (code, lang) => {
            return highlighter.codeToHtml(code, { lang })
        }
    })

    const html = md.render(fs.readFileSync(path.resolve(`${__dirname}/index.md`), 'utf-8'))
    const out = `
    <title>Shiki</title>
    <link rel="stylesheet" href="style.css">
    ${html}
    <script src="index.js"></script>
  `
    fs.writeFileSync(path.resolve(`${__dirname}/../dist/index.html`), out)

    console.log('done')
})