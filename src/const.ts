import { format } from 'date-fns'

export const Locale = 'ja-JP'

export const NumOfVideosPerPage = 30

export const RevalidateYouTubeData = 4 * 60 * 60
export const RevalidateEventList = 4 * 60 * 60
export const RevalidateEvent = 4 * 60 * 60

export const RevalidatePost = 60
export const RevalidateNotFoundPost = 60

export const SiteUrl = 'https://tokiken.com'
export const SiteName = '超ときめき♡研究部（非公式）'
export const SiteCopyRight = '超ときめき♡研究部'
export const SiteDescription = 'ときめく何かを研究する超ときめき♡研究部（非公式）のページ'

export const NoImageUrl = 'https://tokiken.com/noimage.png'
export const BlankImageUrl = 'https://tokiken.com/blank.png'

export const AmazonImgUrl = (asin?: string) =>
  asin ? `https://images-fe.ssl-images-amazon.com/images/P/${asin}.09.LZZZZZZZ` : undefined
export const AmazonProductUrl = (asin?: string) =>
  asin ? `https://www.amazon.co.jp/dp/${asin}/ref=nosim?tag=${process.env.NEXT_PUBLIC_ASSOCIATE_ID}` : undefined

export const AppleMusicAt = '1001l3a5L'

export const ISO8601toDateTimeString = (dt?: string) => {
  return dt ? format(new Date(dt), 'yyyy-MM-dd HH:mm') : ''
}

export const TokisenRegimes = [
  {
    startDate: '2015-04-11',
    members: [
      { name: '辻野かなみ', no: 1, color: 'ときめき♡ブルー' },
      { name: '小泉遥香', no: 2, color: 'ときめき♡ピンク' },
      { name: '坂井仁香', no: 3, color: 'ときめき♡レッド' },
      { name: '吉川ひより', no: 4, color: 'ときめき♡グリーン' },
      { name: '永坂真心', no: 5, color: 'ときめき♡イエロー' },
    ],
    groupName: 'ときめき♡宣伝部',
  },
  {
    startDate: '2017-03-21',
    members: [
      { name: '辻野かなみ', no: 1, color: 'ときめき♡ブルー' },
      { name: '小泉遥香', no: 2, color: 'ときめき♡ピンク' },
      { name: '坂井仁香', no: 3, color: 'ときめき♡レッド' },
      { name: '吉川ひより', no: 4, color: 'ときめき♡グリーン' },
    ],
    groupName: 'ときめき♡宣伝部',
  },
  {
    startDate: '2017-06-18',
    members: [
      { name: '辻野かなみ', no: 1, color: '超ときめき♡ブルー' },
      { name: '藤本ばんび', no: 2, color: '超ときめき♡レモン' },
      { name: '坂井仁香', no: 3, color: '超ときめき♡レッド' },
      { name: '小泉遥香', no: 4, color: '超ときめき♡ピンク' },
      { name: '小高サラ', no: 5, color: '超ときめき♡パープル' },
      { name: '吉川ひより', no: 6, color: '超ときめき♡グリーン' },
    ],
    groupName: 'ときめき♡宣伝部',
  },
  {
    startDate: '2018-10-08',
    members: [
      { name: '辻野かなみ', no: 1, color: '超ときめき♡ブルー' },
      { name: '藤本ばんび', no: 2, color: '超ときめき♡レモン' },
      { name: '坂井仁香', no: 3, color: '超ときめき♡レッド' },
      { name: '小泉遥香', no: 4, color: '超ときめき♡ピンク' },
      { name: '吉川ひより', no: 6, color: '超ときめき♡グリーン' },
    ],
    groupName: 'ときめき♡宣伝部',
  },
  {
    startDate: '2018-10-14',
    members: [
      { name: '辻野かなみ', no: 1, color: 'ときめき♡ブルー' },
      { name: '藤本ばんび', no: 2, color: 'ときめき♡レモン' },
      { name: '坂井仁香', no: 3, color: 'ときめき♡レッド' },
      { name: '小泉遥香', no: 4, color: 'ときめき♡ピンク' },
      { name: '杏ジュリア', no: 5, color: '二代目超ときめき♡パープル' },
      { name: '吉川ひより', no: 6, color: 'ときめき♡グリーン' },
    ],
    groupName: 'ときめき♡宣伝部',
  },
  {
    startDate: '2020-04-01',
    members: [
      { name: '辻野かなみ', no: 1, color: '超ときめき♡ブルー' },
      { name: '杏ジュリア', no: 2, color: '超ときめき♡パープル' },
      { name: '坂井仁香', no: 3, color: '超ときめき♡レッド' },
      { name: '小泉遥香', no: 4, color: '超ときめき♡ピンク' },
      { name: '菅田愛貴', no: 5, color: '超ときめき♡レモン' },
      { name: '吉川ひより', no: 6, color: '超ときめき♡グリーン' },
    ],
    groupName: '超ときめき♡宣伝部',
  },
]
