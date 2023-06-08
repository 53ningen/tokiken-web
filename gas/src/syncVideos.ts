type YouTubeVideoData = {
  videoId: string
  videoPublishedAt: string
  channelId: string
  channelTitle: string
  videoTitle: string
  videoTypeId: string
  songId: string
  videoUrl: string
}

export const addVideo = (videoId: string = '') => {
  const { Const } = exports
  const sheetName = 'YouTubeVideo'

  // Sheet から登録済みの VideoId を取得
  const sheet = SpreadsheetApp.openById(Const.contentsSpreadsheetId).getSheetByName(sheetName)
  const numRows = sheet!.getDataRange().getNumRows() - 1
  const registeredVideoIds = sheet!
    .getRange(2, 1, numRows)
    .getValues()
    .flatMap((vs) => (vs[0] === '' ? [] : [vs[0]]))

  if (registeredVideoIds.includes(videoId)) {
    console.log(`already registered: ${videoId}`)
    return
  }

  // YouTubeChannel シートのカラム位置を取得
  const [columns, ..._] = sheet!.getRange(1, 1, 1, 20).getValues()
  const indices = {
    videoId: columns.findIndex((c) => c === 'videoId'),
    videoPublishedAt: columns.findIndex((c) => c === 'videoPublishedAt'),
    channelId: columns.findIndex((c) => c === 'channelId'),
    channelTitle: columns.findIndex((c) => c === 'channelTitle'),
    videoTitle: columns.findIndex((c) => c === 'videoTitle'),
    videoTypeId: columns.findIndex((c) => c === 'videoTypeId'),
    songId: columns.findIndex((c) => c === 'songId'),
    videoUrl: columns.findIndex((c) => c === 'videoUrl'),
  }

  // Video 情報を取得
  const res = YouTube.Videos?.list(['id', 'snippet'].join(','), {
    id: videoId,
  })
  const v = res!.items![0]
  const row = {
    videoId: v.id,
    videoPublishedAt: v.snippet?.publishedAt,
    channelId: v.snippet?.channelId,
    channelTitle: v.snippet?.channelTitle,
    videoTitle: v.snippet?.title,
    videoTypeId: SyncVideos.getVideoType(v.snippet?.channelId, v.snippet?.title),
    songId: '',
    videoUrl: `https://www.youtube.com/watch?v=${v.id}`,
  } as YouTubeVideoData

  // シートに新しいデータを挿入する
  const rowNumber = numRows + 2 // 2: header + self
  sheet?.getRange(rowNumber, indices.videoId + 1).setValue(row.videoId)
  sheet?.getRange(rowNumber, indices.videoPublishedAt + 1).setValue(row.videoPublishedAt)
  sheet?.getRange(rowNumber, indices.channelId + 1).setValue(row.channelId)
  sheet?.getRange(rowNumber, indices.channelTitle + 1).setValue(row.channelTitle)
  sheet?.getRange(rowNumber, indices.videoTitle + 1).setValue(row.videoTitle)
  sheet?.getRange(rowNumber, indices.videoTypeId + 1).setValue(row.videoTypeId)
  sheet?.getRange(rowNumber, indices.songId + 1).setValue(row.songId)
  sheet?.getRange(rowNumber, indices.videoUrl + 1).setValue(row.videoUrl)
  console.log(`Inserted: ${JSON.stringify(row)}`)
  sheet?.getDataRange().removeDuplicates([indices.videoId + 1])
}

export const syncVideos = async () => {
  const { Const } = exports

  // 各種パラメータ
  const sheetName = 'YouTubeVideo'
  const targetChannelIds = [
    // 超ときめき♡宣伝部 OFFICIAL Channel
    'UCPO-HYS3fdDIKlMMgpcCzdg',
    // 超ときめき♡宣伝部サブチャンネル
    'UCSCKAUrOcDbgPJU5RriNROw',
    // 辻野かなみのつじの〜んびりチャンネル【超ときめき♡宣伝部】
    'UCTzXzFlpQ499MjVT4zqaqJQ',
    // Haruka Koizumi【超ときめき♡宣伝部】
    'UCa_d0vpgZMQpCohGa6bKvlA',
    // 〜スマイル100%〜菅田愛貴ちゃんねる
    'UC6TlNNvPmG1DRNY5aAiMyuA',
    // ひとちゃんねる
    'UCGC45RR74JOhOPIc6rHO31g',
  ]
  const maxResults = 50
  const syncRangeMs = 1 * 24 * 60 * 60 * 1000 // 1 day

  // YouTubeChannel シートのカラム位置を取得
  const sheet = SpreadsheetApp.openById(Const.contentsSpreadsheetId).getSheetByName(sheetName)
  const [columns, ..._] = sheet!.getRange(1, 1, 1, 20).getValues()
  const indices = {
    videoId: columns.findIndex((c) => c === 'videoId'),
    videoPublishedAt: columns.findIndex((c) => c === 'videoPublishedAt'),
    channelId: columns.findIndex((c) => c === 'channelId'),
    channelTitle: columns.findIndex((c) => c === 'channelTitle'),
    videoTitle: columns.findIndex((c) => c === 'videoTitle'),
    videoTypeId: columns.findIndex((c) => c === 'videoTypeId'),
    songId: columns.findIndex((c) => c === 'songId'),
    videoUrl: columns.findIndex((c) => c === 'videoUrl'),
  }

  // Sheet から登録済みの VideoId を取得
  const numRows = sheet!.getDataRange().getNumRows() - 1
  const registeredVideoIds = sheet!
    .getRange(2, 1, numRows)
    .getValues()
    .flatMap((vs) => (vs[0] === '' ? [] : [vs[0]]))

  // YouTube から各チャンネルの直近の VideoId リストを取得
  let rowsToInsert: YouTubeVideoData[] = []
  const now = new Date()
  const fromDate = new Date(now.getTime() - syncRangeMs).toISOString()
  const untilDate = now.toISOString()
  for (const channelId of targetChannelIds) {
    const ids = SyncVideos.listVideoIds(channelId, fromDate, untilDate, maxResults).filter(
      (id) => !registeredVideoIds.includes(id)
    )

    const vs = SyncVideos.listVideos(ids).map((v) => {
      return {
        videoId: v.id,
        videoPublishedAt: v.snippet?.publishedAt,
        channelId: v.snippet?.channelId,
        channelTitle: v.snippet?.channelTitle,
        videoTitle: v.snippet?.title,
        videoTypeId: SyncVideos.getVideoType(v.snippet?.channelId, v.snippet?.title),
        songId: '',
        videoUrl: `https://www.youtube.com/watch?v=${v.id}`,
      } as YouTubeVideoData
    })
    rowsToInsert.push(...vs)
  }
  rowsToInsert = rowsToInsert.sort(
    (a, b) => Date.parse(a.videoPublishedAt) - Date.parse(b.videoPublishedAt)
  )
  // シートに新しいデータを挿入する
  for (const [i, row] of rowsToInsert.entries()) {
    const rowNumber = numRows + i + 2 // 2: header + self
    sheet?.getRange(rowNumber, indices.videoId + 1).setValue(row.videoId)
    sheet?.getRange(rowNumber, indices.videoPublishedAt + 1).setValue(row.videoPublishedAt)
    sheet?.getRange(rowNumber, indices.channelId + 1).setValue(row.channelId)
    sheet?.getRange(rowNumber, indices.channelTitle + 1).setValue(row.channelTitle)
    sheet?.getRange(rowNumber, indices.videoTitle + 1).setValue(row.videoTitle)
    sheet?.getRange(rowNumber, indices.videoTypeId + 1).setValue(row.videoTypeId)
    sheet?.getRange(rowNumber, indices.songId + 1).setValue(row.songId)
    sheet?.getRange(rowNumber, indices.videoUrl + 1).setValue(row.videoUrl)
    console.log(`Inserted: ${JSON.stringify(row)}`)
  }
  sheet?.getDataRange().removeDuplicates([indices.videoId + 1])
}

namespace SyncVideos {
  export const listVideoIds = (
    channelId: string,
    publishedAfter: string,
    publishedBefore: string,
    maxResults: number,
    pageToken?: string
  ) => {
    const res = YouTube.Search?.list('id', {
      channelId,
      maxResults,
      pageToken,
      publishedAfter,
      publishedBefore,
      type: 'video',
    })
    const ids = res?.items?.map((i) => i.id?.videoId as string) || []
    const nextPageToken = res?.nextPageToken
    if (nextPageToken) {
      const nextIds = SyncVideos.listVideoIds(
        channelId,
        publishedAfter,
        publishedBefore,
        maxResults,
        nextPageToken
      )
      ids.push(...nextIds)
      return ids
    } else {
      return ids
    }
  }

  export const listVideos = (ids: string[], pageToken?: string) => {
    const res = YouTube.Videos?.list(['id', 'snippet'].join(','), {
      id: ids.join(','),
      pageToken: pageToken,
    })
    const items = res?.items || []
    const nextPageToken = res?.nextPageToken
    if (nextPageToken) {
      const nextVideos = SyncVideos.listVideos(ids, nextPageToken)
      items.push(...nextVideos)
      return items
    } else {
      return items
    }
  }

  export const getVideoType = (channelId?: string, videoTitle?: string) => {
    switch (channelId) {
      case 'UCTzXzFlpQ499MjVT4zqaqJQ':
        return 'かなみんチャンネル'
      case 'UCa_d0vpgZMQpCohGa6bKvlA':
        return 'おはるチャンネル'
      case 'UC6TlNNvPmG1DRNY5aAiMyuA':
        return '菅田愛貴ちゃんねる'
      case 'UCGC45RR74JOhOPIc6rHO31g':
        return 'ひとちゃんねる'
    }
    const videoTypeMapping = [
      // 優先度順
      { keyword: '#Shorts', videoType: 'Shorts' },
      { keyword: '#shorts', videoType: 'Shorts' },

      // ときバロTV
      { keyword: '上昇TV', videoType: 'ときバロTV' },
      { keyword: ' epi.', videoType: 'ときバロTV' },
      { keyword: 'epi ', videoType: 'ときバロTV' },
      { keyword: ' ep6', videoType: 'ときバロTV' },
      { keyword: ' ep7', videoType: 'ときバロTV' },
      { keyword: ' ep8', videoType: 'ときバロTV' },
      { keyword: ' ep9', videoType: 'ときバロTV' },

      // 超ときめき「都会のトム&ソーヤ」宣伝部
      { keyword: '超ときめき「都会のトム&ソーヤ」宣伝部', videoType: '都会のトムソーヤ宣伝部' },

      // VLOG
      { keyword: 'Cho Tokimeki♡VLOG', videoType: 'VLOG' },
      { keyword: '#TOKISENVLOG', videoType: 'VLOG' },

      { keyword: 'グッズCM', videoType: 'グッズCM' },
      { keyword: 'グッズCM', videoType: 'グッズCM' },
      { keyword: '握手会の旅', videoType: '握手会の旅' },

      { keyword: 'ソロダンス', videoType: 'Dance' },
      { keyword: 'ペアダンス', videoType: 'Dance' },
      { keyword: 'Dance Practice', videoType: 'Dance' },

      { keyword: 'Live at ', videoType: 'LIVE' },
      { keyword: 'MUSIC VIDEO', videoType: 'MusicVideo' },
      { keyword: 'MUSICVIDEO', videoType: 'MusicVideo' },
      { keyword: '踊ってみた', videoType: '踊ってみた' },
      { keyword: '歌ってみた', videoType: '歌ってみた' },
      { keyword: '生配信', videoType: '生配信' },
      { keyword: ' Ust ', videoType: '生配信' },
    ]

    let videoTypeId = 'Uncategorized'
    if (!videoTitle) {
      return videoTypeId
    }
    for (const mapping of videoTypeMapping) {
      if (videoTitle.includes(mapping.keyword)) {
        videoTypeId = mapping.videoType
        break
      }
    }
    return videoTypeId
  }
}
