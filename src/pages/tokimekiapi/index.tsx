import { Box, Container, Stack, Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import Link from '../../components/Link'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { SiteName } from '../../const'
import theme from '../../theme'

const apiBaseUrl = 'https://api.tokiken.com'

interface TokimekiAPIProps {
  apiActions: APIAction[]
}

export default function TokimekiAPIHome({ apiActions }: TokimekiAPIProps) {
  const title = '超ときめき♡API'
  const description = '超ときめき♡研究部のページ生成の元となるデータの一部を REST API として提供しています'
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <NavBar items={[{ path: '/tokimekiapi', title: title }]} />
      <Stack textAlign="center" py={1}>
        <Typography variant="h3" color={theme.palette.primary.main}>
          {title}
        </Typography>
        <Typography variant="caption">{description}</Typography>
      </Stack>
      <Stack spacing={2}>
        <Container maxWidth="md">
          <Stack p={{ xs: 1, sm: 2 }} spacing={2}>
            <Stack spacing={8}>
              <Stack spacing={2}>
                <Typography variant="h2">超ときめき♡API のご利用にあたって</Typography>
                <Typography variant="body2">
                  <ul>
                    <li>ご利用はいただくことによる生じたいかなる不利益についても責任を負いかねます</li>
                    <li>予告なく API の提供を中断・停止することがございます</li>
                  </ul>
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <Typography variant="h2">超ときめき♡API のエンドポイント</Typography>
                <Typography variant="body1">{apiBaseUrl}</Typography>
                <Typography variant="caption">TLS 1.2 での接続が必須となります</Typography>
              </Stack>
              <Stack spacing={4}>
                <Typography variant="h2">超ときめき♡API の実行可能なアクション</Typography>
                {apiActions.map((a) => {
                  return <APIActionItem key={a.action} action={a} />
                })}
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </>
  )
}

interface APIActionItemProps {
  action: APIAction
}

const APIActionItem = ({ action }: APIActionItemProps) => {
  return (
    <Stack id={action.action} spacing={1}>
      <Box width="100%" sx={{ backgroundColor: theme.palette.grey[300] }}>
        <Typography p={1} variant="h4">
          {action.action}
        </Typography>
      </Box>
      <Typography variant="body2">アクション内容</Typography>
      <Typography variant="caption">{action.description}</Typography>
      <Typography variant="body2">返却値</Typography>
      <Typography variant="caption">{action.returns}</Typography>
      <Typography variant="body2">実行例</Typography>
      <Typography variant="caption">
        <Link href={`${apiBaseUrl}${action.example}`} target="_blank">
          {apiBaseUrl}
          {action.example}
        </Link>
      </Typography>
    </Stack>
  )
}

interface APIAction {
  action: string
  description: string
  returns: string
  example: string
}

export const getStaticProps: GetStaticProps<TokimekiAPIProps> = async () => {
  const apiActions: APIAction[] = [
    {
      action: 'GET /songs',
      description: '楽曲リストを取得します。',
      returns: 'Song エンティティの配列を返却します。',
      example: '/songs',
    },
    {
      action: 'GET /songs/{songId}',
      description:
        '{songId} で指定した楽曲を取得します。{songId} は各楽曲に振られた一意な識別子であり GET /songs アクションで各楽曲の {songId} の確認が可能です。',
      returns: 'Song エンティティを返却します。',
      example: '/songs/サンタさんがやってこない',
    },
    {
      action: 'GET /songs/{songId}/credits',
      description: '{songId} で指定した楽曲のクレジット一覧を取得します。',
      returns: 'Credit エンティティの配列を返却します。',
      example: '/songs/サンタさんがやってこない/credits',
    },
    {
      action: 'GET /records',
      description:
        'レコードのリストを取得します。レコードは「STAR」のようにリリースされたシングルやアルバムを指します。',
      returns: 'Record エンティティの配列を返却します。',
      example: '/records',
    },
    {
      action: 'GET /record/{recordId}',
      description:
        '{recordId} で指定したレコードを取得します。{recordId} は各レコードに振られた一意な識別子であり GET /records アクションで各レコードの {recordId} の確認が可能です。',
      returns: 'Record エンティティを返却します。',
      example: '/records/ハートギュッと',
    },
    {
      action: 'GET /editions',
      description:
        'レコード盤のリストを取得します。レコード盤は「ときめきがすべて」としてリリースされたレコードのうち「たまありみるみる盤」のようにシングルやアルバムの盤（形態）を指します。',
      returns: 'RecordEdition エンティティの配列を返却します。',
      example: '/editions',
    },
    {
      action: 'GET /editions/{catalogNumber}',
      description:
        '{catalogNumber} で指定したレコード盤を取得します。{catalogNumber} は原則として各レコード盤の規格品番となっていますがデジタルリリース盤などの場合、独自の識別子が割り当てられています。GET /editions アクションで各レコード盤の {catalogNumber} の確認が可能です。',
      returns: 'RecordEdition エンティティを返却します',
      example: '/editions/AVCD-96983A',
    },
    {
      action: 'GET /editions/{catalogNumber}/tracks',
      description:
        '{catalogNumber} で指定したレコード盤のトラック一覧を取得します。トラックとは各 CD/DVD/Blu-ray のトラックやチャプタそのものを指します。',
      returns: 'Track エンティティの配列を返却します。',
      example: '/editions/AVCD-96983A/tracks',
    },
    {
      action: 'GET /artists',
      description:
        'アーティストのリストを取得します。アーティストとは楽曲に携わった作詞/作曲/編曲家やレコーディングエンジニア、振付師などを指します。',
      returns: 'Artists エンティティの配列を返却します。',
      example: '/artists',
    },
    {
      action: 'GET /artists/{artistId}',
      description:
        '{artistId} で指定したアーティストを取得します。GET /artists アクションで各アーティストの {artistId} の確認が可能です。',
      returns: 'Artists エンティティを返却します',
      example: '/artists/浅利進吾',
    },
    {
      action: 'GET /artists/{artistId}/credits',
      description: '{artistId} で指定したアーティストのクレジット一覧を取得します',
      returns: 'Credit エンティティの配列を返却します。',
      example: '/artists/浅利進吾/credits',
    },
  ]
  return {
    props: {
      apiActions,
    },
  }
}
