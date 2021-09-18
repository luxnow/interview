import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardContent,
  colors,
  Divider,
  TextField,
} from '@material-ui/core'
import stringToAvatarChars from '../utils/string-avatar'

export default function Profile(props: {
  nickname: string;
  onHandleUpdate: (nickname: string) => Promise<void>;
  onHandleSignout: () => Promise<void>;
}): React.ReactElement {
  const [nickname, setNickname] = useState(props.nickname)
  const [allowSubmit, setAllowSubmit] = useState(false);

  useEffect(() => {
    if (nickname && nickname !== props.nickname) {
      setAllowSubmit(true)
    } else {
      setAllowSubmit(false)
    }
  }, [nickname, props])

  return (
    <Box
      component="form"
      sx={{
        height: '100vh',
        paddingTop: '30vh',
      }}
      noValidate
      autoComplete="off"
    >
      <Card variant="outlined" sx={{ boxShadow: 4, bgcolor: "ghostwhite" }}>
        <CardHeader
          title={`${props.nickname}'s profile`}
          titleTypographyProps={{
            align: "left",
            sx: { fontSize: 14 },
            color: "text.secondary",
            gutterBottom: true,
          }}
          avatar={
            <Avatar sx={{ bgcolor: colors.deepPurple[500]}}>
              {stringToAvatarChars(props.nickname)}
            </Avatar>
          }
          action={<Button
            variant="text"
            onClick={() => props.onHandleSignout()}
          >
            Signout
          </Button>}
        />
        <CardContent>
          <TextField
            id="outlined-nickname"
            label="Nick Name"
            placeholder="input your nick name"
            defaultValue={props.nickname}
            fullWidth
            onChange={(ev) => {
              if (ev.currentTarget.value !== nickname) {
                setNickname(ev.currentTarget.value)
              }
            }}
            onKeyDown={(ev) => {
              if (ev.code === "Enter") {
                ev.preventDefault();
                if (allowSubmit) {
                  props.onHandleUpdate(nickname)
                }
              }
            }}
          />
          <Divider />
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            sx={{ marginTop: "10px" }}
            fullWidth
          >
            <Button
              disabled={!allowSubmit}
              variant="contained"
              onClick={() => props.onHandleUpdate(nickname)}
            >
                Update
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </Box>
  )
}
