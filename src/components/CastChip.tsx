import { Chip, ChipProps } from '@mui/material'
import { Cast } from '../spreadsheets'
import theme from '../theme'

export interface CastChipProps {
  cast: Cast | string
  props?: ChipProps
}

export const CastChip = ({ cast, props }: CastChipProps) => {
  const getColor = (cast: Cast | string): 'tokisen' | 'kanami' | 'julia' | 'hitoka' | 'haruka' | 'aki' | 'hiyori' => {
    switch (cast) {
      case '辻野かなみ':
        return 'kanami'
      case '杏ジュリア':
      case '小高サラ':
        return 'julia'
      case '坂井仁香':
        return 'hitoka'
      case '小泉遥香':
        return 'haruka'
      case '菅田愛貴':
      case '藤本ばんび':
      case '永坂真心':
        return 'aki'
      case '吉川ひより':
        return 'hiyori'
      case 'パブりん':
      case 'ときめき♡宣伝部':
      case '超ときめき♡宣伝部':
      default:
        return 'tokisen'
    }
  }
  return (
    <Chip
      variant="filled"
      size="small"
      label={cast}
      style={{ marginRight: theme.spacing(1) }}
      color={getColor(cast)}
      {...props}
    />
  )
}
