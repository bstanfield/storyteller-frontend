const IMAGE_SERVER = 'https://storyteller.imgix.net/'

export function staticImageUrl(
  imagePath: string,
  options?: { url?: string; w?: number }
) {
  const url = new URL(options?.url || IMAGE_SERVER)

  delete options?.url
  const searchParams = new URLSearchParams()

  // compressing gifs disables animation
  if (!imagePath.endsWith('.gif')) {
    searchParams.set('auto', ['format', 'compress'])
    searchParams.set('q', '35')
  }

  if (options) {
    for (const [key, value] of Object.entries(options)) {
      searchParams.set(key, value.toString())
    }
  }

  url.pathname = `/${imagePath}`
  url.search = searchParams.toString()

  return url.toString()
}
