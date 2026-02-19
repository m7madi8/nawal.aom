export default defineNuxtPlugin((nuxtApp) => {
  const previousWarnHandler = nuxtApp.vueApp.config.warnHandler

  nuxtApp.vueApp.config.warnHandler = (msg, instance, trace) => {
    const isSuspenseExperimental = msg.includes('<Suspense> is an experimental feature')
    const isDevtoolsStyleAttrWarning =
      msg.includes('Extraneous non-props attributes (style)') &&
      (trace?.includes('<VueElement') ?? false)

    if (isSuspenseExperimental || isDevtoolsStyleAttrWarning) {
      return
    }

    if (previousWarnHandler) {
      previousWarnHandler(msg, instance, trace)
      return
    }

    console.warn(`[Vue warn]: ${msg}${trace ? `\n${trace}` : ''}`)
  }
})
