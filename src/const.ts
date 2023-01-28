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
