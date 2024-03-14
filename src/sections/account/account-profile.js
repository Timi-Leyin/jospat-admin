import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useContext } from 'react';
import { adminContext } from 'src/contexts/admin-context';

const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  city: 'Lagos',
  country: 'Nigeria',
  jobTitle: 'Senior Developer',
  name: 'Jay Tech Co',
  timezone: 'GTM-7'
};

export const AccountProfile = () => {
  const ctx = useContext(adminContext)
  return(
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {ctx.data.user && ctx.data.user.first_name + " " + ctx.data.user.last_name}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.city} {user.country}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
