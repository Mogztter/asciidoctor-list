const asciidoctor = require('@asciidoctor/core')()
const asciidoctorList = require('../src/asciidoctor-list')

const registry = asciidoctorList.register(asciidoctor.Extensions.create())
asciidoctor.convertFile('list.adoc', { extension_registry: registry, safe: 'safe' })
