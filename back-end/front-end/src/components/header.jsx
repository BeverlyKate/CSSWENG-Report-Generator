import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const currentUrl = window.location.href;
  var dynamicTitle = "Generate report";
  const navigate = useNavigate();

  console.log('True or false', currentUrl.includes('/table'))

  if (currentUrl.includes('/table')) {
    dynamicTitle = "View table";
  }
  if (currentUrl.includes('/report')) {
    dynamicTitle = "Report";
  }
  if (currentUrl.includes('/import')) {
    dynamicTitle = "Import excel file";
  }
  if (currentUrl.includes('/user')) {
    dynamicTitle = "Profile";
  }

  return (
    <div className="header">
      <div className="left">
        <Link to="/dash">
          <button id="CompanyLogo" onClick={() => navigate('/dash')}>
          </button>
        </Link>
        <h2 className="Title">{dynamicTitle}</h2>
      </div>
    </div>
  )
}