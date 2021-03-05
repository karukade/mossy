const withOptimizedImages = require("next-optimized-images")
const path = require("path")
module.exports = withOptimizedImages({
  handleImages: ["png", "webp", "jpg"],
  optimizeImagesInDev: true,
  webpack: (config) => {
    for (const rule of config.module.rules) {
      modifySassRule(rule)
    }
    return config
  },
})

/**
 * @param {{oneOf?: {test: RegExp | RegExp[], use: {loader: String, options?: Record<string, any>}[]}[]} rule
 */
const modifySassRule = (rule) => {
  if (!rule.oneOf) return
  for (const oneOf of rule.oneOf) {
    if (Array.isArray(oneOf.test)) continue
    if (String(oneOf.test) === "/\\.module\\.(scss|sass)$/") {
      oneOf.use = oneOf.use.map((rule) => {
        if (rule.loader.includes("resolve-url-loader")) {
          return {
            ...rule,
            options: {
              ...rule.options,
              keepQuery: true,
            },
          }
        }
        return rule
      })
    }
  }
}
