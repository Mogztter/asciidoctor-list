const listDocinfoProcessor = function () {
  const self = this
  self.atLocation('footer')
  self.process((doc) => {
    if (doc.getBackend() !== 'html5') {
      return ''
    }
    return `
<style>
th.tableblock {
  position: relative;
  cursor: pointer;
}

th.tableblock.halign-left.valign-top.sort.desc::after {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M12.78 6.22a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0L3.22 7.28a.75.75 0 011.06-1.06L8 9.94l3.72-3.72a.75.75 0 011.06 0z"></path></svg>');
  display: inline-block;
  content: " ";
  height: 1em;
  width: 1em;
  position: absolute;
  right: 0.75em;
  top: 50%;
  transform: translateY(-50%);
}

th.tableblock.halign-left.valign-top.sort.asc::after {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M3.22 9.78a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 01-1.06 1.06L8 6.06 4.28 9.78a.75.75 0 01-1.06 0z"></path></svg>');
  display: inline-block;
  content: " ";
  height: 1em;
  width: 1em;
  position: absolute;
  right: 0.75em;
  top: 50%;
  transform: translateY(-50%);
}
</style>
<script src="//www.unpkg.com/slugify@1.4.6/slugify.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/list.js/2.3.1/list.min.js"></script>
<script>
const tableElement = document.getElementById('users-list')

const tbodyElement = tableElement.querySelector('tbody')
tbodyElement.classList.add('list')

const valueNames = []
const tableHeaderCells = Array.from(tableElement.getElementsByTagName('th'))
tableHeaderCells.forEach((elem) => {
  elem.classList.add('sort')
  const valueName = slugify(elem.innerText)
  elem.dataset.sort = valueName
  valueNames.push(valueName)
})

const options = {
  valueNames: valueNames
}

const tableRows = Array.from(tbodyElement.getElementsByTagName('tr'))
tableRows.forEach((elem) => {
  Array.from(elem.children).forEach((cell, index) => {
    const className = options.valueNames[index]
    if (className) {
      cell.classList.add(className)
    }
  })
})

new List(tableElement, options)
</script>`
  })
}

module.exports.register = function register (registry) {
  if (typeof registry.register === 'function') {
    registry.register(function () {
      this.docinfoProcessor(listDocinfoProcessor)
    })
  } else if (typeof registry.block === 'function') {
    registry.docinfoProcessor(listDocinfoProcessor)
  }
  return registry
}
