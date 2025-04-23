import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ReceiptIcon from '@mui/icons-material/Receipt'
import CategoryIcon from '@mui/icons-material/Category'
import EventRepeatIcon from '@mui/icons-material/EventRepeat'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Budg
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<AccountBalanceIcon />}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/bills"
            startIcon={<ReceiptIcon />}
          >
            Bills
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/bank-accounts"
            startIcon={<AccountBalanceIcon />}
          >
            Bank Accounts
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/categories"
            startIcon={<CategoryIcon />}
          >
            Categories
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/recurrences"
            startIcon={<EventRepeatIcon />}
          >
            Recurrences
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/statuses"
            startIcon={<CheckCircleIcon />}
          >
            Statuses
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar 