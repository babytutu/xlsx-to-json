const xlsx = require('node-xlsx')
const fs = require('fs')
const filePath = 'data'
const outPath = 'json'

try {
  fs.statSync(outPath).isDirectory()
} catch (e) {
  fs.mkdirSync(outPath)
}

fs.readdir(filePath, (err, files) => {
  if (err) throw err
  files.forEach(i => {
    if (i.indexOf('.xlsx') > -1) {
      const workSheetsFromFile = xlsx.parse(`${filePath}/${i}`)
      const data = workSheetsFromFile[0].data
      let arr = []
      const title = data.shift()
      data.forEach(i => {
        let obj = {}
        title.forEach((k, index) => {
          obj[k] = i[index]
        })
        arr.push(obj)
      })

      fs.writeFileSync(`${outPath}/${i.replace('xlsx', 'json')}`, JSON.stringify(arr, '', 2), 'utf8')
      console.log(`文件${i}转换完成`)
    }
  })
})
