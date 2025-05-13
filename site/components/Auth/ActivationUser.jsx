import * as React from 'react'

import { useRouter } from "next/router";
import Link from "next/link"
import { DataContext } from '../../store/GlobalState';
import { postData } from '../../utils/fetchData';
import LoaderComponent from "../smallComponents/Loader"

// Material UI Components 
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useTheme } from '@emotion/react';
import AuthPageCover from './AuthPageCover';

const ActivationUser = () => {
  const initialState = { err: '', success: '' };
  const [data, setData] = React.useState(initialState)
  const { err, success } = data

  const { state,dispatch } = React.useContext(DataContext);
  const { auth } = state;
  const router = useRouter();
  const theme = useTheme()

  const { token } = router.query;

  React.useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
    if (token) {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      setData({ ...initialState});
      const activationEmail = async () => {
        const res = await postData("/auth/user/activate", { activation_token: token });
        setData({ success: res.msg, err: res.err == "jwt expired" ? "Link Expired" : res.err ,loading:false});
        dispatch({ type: "NOTIFY", payload: { loading: false } });
      };
      activationEmail();
    }
  }, [auth, token]);

  return (
    <AuthPageCover title="Email Activation" backButton={false}>
      {(err || success) && (
          <Stack spacing={2} sx={{ textAlign: "center",borderRadius: `${theme.shape.borderRadius*2}px`}}>
            <Typography color={err ? "error.light" : "success.light"} variant="h6" sx={{ textTransform: "capitalize" }}>
              {err}
              {success}
            </Typography>
            {success &&
              <Link href="/auth/signin">
                <Button variant="contained" color="primary">Go To Login Page</Button>
              </Link>}
            {err &&
              <Link href="/auth/signup">
                <Button variant="contained" color="primary">Go To Register Page</Button>
              </Link>}
          </Stack>
      ) }
    </AuthPageCover>
  );
}

export default ActivationUser