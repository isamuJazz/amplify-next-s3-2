import { FileComponent } from '@/components/atoms/FileInput'
import { SubmitButton } from '@/components/atoms/SubmitButton'
import { Grid, Stack, Box } from '@mui/material'

export const Upload = () => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', p:1, m:1, justifyContent: 'center', marginTop: '30%'}} >
        <Stack direction="row" spacing={2}>
          <FileComponent />
          <SubmitButton />
        </Stack>
      </Box>
    </>
  )
}
