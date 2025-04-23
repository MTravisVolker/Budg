import { Routes, Route } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Bills from './pages/Bills'
import BankAccounts from './pages/BankAccounts'
import Categories from './pages/Categories'
import Recurrences from './pages/Recurrences'
import Statuses from './pages/Statuses'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/bank-accounts" element={<BankAccounts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/recurrences" element={<Recurrences />} />
          <Route path="/statuses" element={<Statuses />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App 