import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField,
} from '@material-ui/core'

export default function SignupSignin(props: {
  nickname: string;
  onHandleSignin: (nickname: string) => Promise<void>;
  onHandleSignup: (nickname: string) => Promise<void>;
}): React.ReactElement {
  const [nickname, setNickname] = useState(props.nickname);
  const [allowSubmit, setAllowSubmit] = useState(!!props.nickname);

  useEffect(() => {
    if (nickname) {
      setAllowSubmit(true)
    } else {
      setAllowSubmit(false)
    }
  }, [nickname, props])

  return (
    <Box
      component="form"
      sx={{
        height: '70vh',
        marginTop: '30vh',
      }}
      noValidate
      autoComplete="off"
    >
      <Card variant="outlined">
        <CardHeader
          title="SignIn/SignUp"
          titleTypographyProps={{
            align: "left",
            sx: { fontSize: 14 },
            color: "text.secondary",
            gutterBottom: true,
          }}
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
                  props.onHandleSignin(nickname)
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
              variant="text"
              onClick={() => props.onHandleSignup(nickname)}
            >
              SignUp
            </Button>
            <Button
              disabled={!allowSubmit}
              variant="contained"
              onClick={() => props.onHandleSignin(nickname)}
            >
              SignIn
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </Box>
  )
}
