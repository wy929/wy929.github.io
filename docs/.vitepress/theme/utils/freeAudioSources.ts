// 完全免费的发音音频资源管理器

interface AudioSource {
  url: string
  type: 'wikimedia' | 'wiktionary' | 'local' | 'forvo-free'
  quality: 'high' | 'medium' | 'low'
}

// Wikimedia Commons 音频文件映射
const wikimediaAudio: Record<string, Record<string, string>> = {
  'en-US': {
    'hello': 'https://upload.wikimedia.org/wikipedia/commons/4/46/En-us-hello.ogg',
    'world': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/En-us-world.ogg',
    'water': 'https://upload.wikimedia.org/wikipedia/commons/a/a8/En-us-water.ogg',
    'house': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/En-us-house.ogg',
    'computer': 'https://upload.wikimedia.org/wikipedia/commons/2/24/En-us-computer.ogg',
  },
  'fr-FR': {
    'bonjour': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Fr-bonjour.ogg',
    'merci': 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Fr-merci.ogg',
    'eau': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Fr-eau.ogg',
    'maison': 'https://upload.wikimedia.org/wikipedia/commons/2/29/Fr-maison.ogg',
    'ordinateur': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Fr-ordinateur.ogg',
  }
}

// 本地音频文件路径（你可以下载并托管）
const localAudio: Record<string, Record<string, string>> = {
  'en-US': {
    'pronunciation': '/audio/en/pronunciation.mp3',
    'dictionary': '/audio/en/dictionary.mp3',
    'language': '/audio/en/language.mp3',
  },
  'fr-FR': {
    'prononciation': '/audio/fr/prononciation.mp3',
    'dictionnaire': '/audio/fr/dictionnaire.mp3',
    'langue': '/audio/fr/langue.mp3',
  }
}

/**
 * 获取Wiktionary音频链接
 */
export async function getWiktionaryAudio(word: string, lang: string): Promise<string | null> {
  try {
    const langPrefix = lang.split('-')[0] // en-US -> en
    const url = `https://${langPrefix}.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(word)}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    // 解析响应中的音频链接
    const audioRegex = /\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[^"']+\.ogg/g
    const content = JSON.stringify(data)
    const matches = content.match(audioRegex)
    
    if (matches && matches.length > 0) {
      return `https:${matches[0]}`
    }
    
    return null
  } catch (error) {
    console.warn('Wiktionary API error:', error)
    return null
  }
}

/**
 * 从Forvo免费API获取音频
 */
export async function getForvoFreeAudio(word: string, lang: string): Promise<string | null> {
  try {
    // 需要注册获取免费API key
    const API_KEY = 'your-free-forvo-api-key' // 替换为你的免费API密钥
    const langCode = lang.split('-')[0]
    
    const url = `https://apifree.forvo.com/key/${API_KEY}/format/json/action/word-pronunciations/word/${encodeURIComponent(word)}/language/${langCode}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.items && data.items.length > 0) {
      // 选择评分最高的发音
      const bestPronunciation = data.items
        .sort((a: any, b: any) => (b.num_votes || 0) - (a.num_votes || 0))[0]
      
      return bestPronunciation.pathmp3
    }
    
    return null
  } catch (error) {
    console.warn('Forvo API error:', error)
    return null
  }
}

/**
 * 获取最佳音频源（按优先级）
 */
export async function getBestFreeAudio(word: string, lang: string): Promise<AudioSource | null> {
  const lowerWord = word.toLowerCase()
  
  // 1. 优先使用本地高质量音频
  if (localAudio[lang]?.[lowerWord]) {
    return {
      url: localAudio[lang][lowerWord],
      type: 'local',
      quality: 'high'
    }
  }
  
  // 2. 使用Wikimedia Commons音频
  if (wikimediaAudio[lang]?.[lowerWord]) {
    return {
      url: wikimediaAudio[lang][lowerWord],
      type: 'wikimedia',
      quality: 'high'
    }
  }
  
  // 3. 尝试Wiktionary动态获取
  try {
    const wiktionaryUrl = await getWiktionaryAudio(word, lang)
    if (wiktionaryUrl) {
      return {
        url: wiktionaryUrl,
        type: 'wiktionary',
        quality: 'medium'
      }
    }
  } catch (error) {
    console.warn('Wiktionary lookup failed:', error)
  }
  
  // 4. 最后尝试Forvo免费API（如果有API密钥）
  try {
    const forvoUrl = await getForvoFreeAudio(word, lang)
    if (forvoUrl) {
      return {
        url: forvoUrl,
        type: 'forvo-free',
        quality: 'high'
      }
    }
  } catch (error) {
    console.warn('Forvo free API failed:', error)
  }
  
  return null
}

/**
 * 批量下载Wikimedia音频文件的工具函数
 */
export function generateWikimediaDownloadScript(words: string[], lang: string) {
  const langPrefix = lang.split('-')[0]
  const script = words.map(word => {
    const audioUrl = wikimediaAudio[lang]?.[word.toLowerCase()]
    if (audioUrl) {
      return `curl -o "./public/audio/${langPrefix}/${word}.ogg" "${audioUrl}"`
    }
    return `# ${word} - no audio found`
  }).join('\n')
  
  console.log('Download script:')
  console.log(script)
  return script
}

// 常用词汇列表，可以预先下载
export const commonWords = {
  'en-US': [
    'hello', 'world', 'water', 'house', 'computer', 'book', 'car', 'phone',
    'food', 'time', 'people', 'work', 'school', 'family', 'friend', 'love'
  ],
  'fr-FR': [
    'bonjour', 'merci', 'eau', 'maison', 'ordinateur', 'livre', 'voiture', 'téléphone',
    'nourriture', 'temps', 'gens', 'travail', 'école', 'famille', 'ami', 'amour'
  ]
}