import { useState } from 'react'
import './App.css'
import { Switch, Route, Link } from 'react-router-dom/cjs/react-router-dom.min'
import Order from './components/Order'
import Success from './components/Success'
import Home from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <header>
      <nav>
      <Link to="/Home">Anasayfa</Link>
      <Link to="/Order">Sipariş Oluştur</Link>
      <Link to="/Success">Success</Link>
      </nav>
    </header>
      <Switch>
      <Route exact path="/">
        <h1>Main</h1>
      </Route>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/Order">
          <Order />
        </Route>
        <Route path="/Success">
          <Success />
        </Route>
      </Switch>
    </>
  )
}

export default App