import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
  
  return (
    <nav class="navbar">
        <Link to="/dash/import">
            <button class="navBtn Btn-import">
                <a href="/import"></a>
            </button>
        </Link>
        <Link to="/dash/table">
        <button class="navBtn Btn-table">
            <a href="/table">  </a>
        </button>
        </Link>
        <Link to="/dash">
        <button class="navBtn Btn-generateReport">
            <a href="/home">  </a>
        </button>
        </Link>
        <Link to="/dash/user">
        <button class="navBtn Btn-profile">
            <a href="/user">  </a>
        </button>
        </Link>
    </nav>
  )
}