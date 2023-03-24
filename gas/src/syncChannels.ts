declare const exports: typeof import('./Const')

type YouTubeChannelData = {
  rowNumber: number
  channelId: string
  channelTitle: string
  channelVideoCount: string
  channelThumbnailUrl: string
}

export const syncChannelsInfo = async () => {
  const { Const } = exports
  const sheetName = 'YouTubeChannel'

  // YouTubeChannel シートのデータを取得
  const sheet = SpreadsheetApp.openById(Const.contentsSpreadsheetId).getSheetByName(sheetName)
  const [columns, ...values] = sheet!.getDataRange().getValues()
  const indices = {
    channelId: columns.findIndex((c) => c === 'channelId'),
    channelTitle: columns.findIndex((c) => c === 'channelTitle'),
    channelVideoCount: columns.findIndex((c) => c === 'channelVideoCount'),
    channelThumbnailUrl: columns.findIndex((c) => c === 'channelThumbnailUrl'),
  }
  const rows = values.map((vs, i) => {
    return {
      rowNumber: i + 2, // 1 origin and add header row
      channelId: vs[indices.channelId] as string,
      channelTitle: vs[indices.channelTitle] as string,
      channelVideoCount: vs[indices.channelVideoCount] as string,
      channelThumbnailUrl: vs[indices.channelThumbnailUrl] as string,
    } as YouTubeChannelData
  })

  // 更新が必要なデータの抽出
  let rowsToUpdate: YouTubeChannelData[] = []
  const chunkSize = 50
  const numChunks = Math.ceil(rows.length / chunkSize)
  for (let i = 0; i < numChunks; i++) {
    const chunk = rows.slice(i * chunkSize, (i + 1) * chunkSize)
    const ids = chunk.map((c) => c.channelId)
    const res = YouTube.Channels?.list(['id', 'snippet'].join(','), {
      id: ids,
      maxResults: chunkSize,
    })
    const updatedRows =
      res?.items?.flatMap((i) => {
        const row = rows.find((r) => r.channelId === i.id)
        const updated =
          row?.channelThumbnailUrl !== i.snippet?.thumbnails?.medium?.url ||
          row?.channelTitle !== i.snippet?.title
        return row && updated
          ? [
              {
                rowNumber: row.rowNumber,
                channelId: row.channelId,
                channelTitle: i.snippet?.title,
                channelVideoCount: row.channelVideoCount,
                channelThumbnailUrl: i.snippet?.thumbnails?.medium?.url,
              } as YouTubeChannelData,
            ]
          : []
      }) || []
    rowsToUpdate.push(...updatedRows)
  }

  // YouTubeChannel シートの更新
  for (const row of rowsToUpdate) {
    sheet?.getRange(row.rowNumber, indices.channelTitle + 1).setValue(row.channelTitle)
    sheet
      ?.getRange(row.rowNumber, indices.channelThumbnailUrl + 1)
      .setValue(row.channelThumbnailUrl)
    console.log(`Updated: ${JSON.stringify(row)}`)
  }
}
