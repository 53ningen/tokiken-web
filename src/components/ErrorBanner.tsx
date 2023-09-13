import { Alert, AlertColor, Button, Typography } from '@mui/material'
import { MouseEventHandler, ReactNode } from 'react'

interface ErrorBannerProps {
  errorMessage?: ReactNode
  action?: MouseEventHandler
  actionName?: ReactNode
  severity?: AlertColor
}

export const ErrorBanner = ({ errorMessage, action, actionName, severity = 'error' }: ErrorBannerProps) => {
  return (
    <>
      {errorMessage && (
        <Alert
          severity={severity}
          action={
            action &&
            actionName && (
              <Button color="inherit" size="small" onClick={action}>
                {actionName}
              </Button>
            )
          }>
          <Typography variant="subtitle2">{errorMessage}</Typography>
        </Alert>
      )}
    </>
  )
}
