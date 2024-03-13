import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = () => {

  return (
    <>
      <Head>
        <title>
          Register | Admin Jospat
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Update Item
              </Typography>
            </Stack>
            <form
            >
              <Stack spacing={3}>
                <TextField
                  label="Item Old Name"
                  name="name"
                />
                <TextField
                  label="Item Old Price"
                  name="price"
                  type='number'
                />
                <TextField
                  label="Item Old Description"
                  name="description"
                />
                <TextField
                  label="Item New Name"
                  name="name"
                />
                <TextField
                  label="Item New Price"
                  name="price"
                  type='number'
                />
                <TextField
                  label="Item New Description"
                  name="description"
                />
              </Stack>
                <Link
                  component={NextLink}
                  href="/"
                  underline="hover"
                  variant="subtitle2"
                ><Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >Update
              </Button>
              </Link>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};
export default Page;
