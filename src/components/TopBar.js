import './TopBar.css';

export default function TopBar(props) {
  const { user, logout, language, setLanguage } = props;

  const languageIcons = {
    es: '🇪🇸',
    fr: '🇫🇷',
    hi: '🇮🇳',
    pt: '🇵🇹',
    zh: '🇨🇳'
  };
 
  return (
    <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
      <div className="container-fluid">
        <button
          className="btn btn-link d-md-none rounded-circle me-3"
          id="sidebarToggleTop"
          type="button"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div>
          <div className="dropdown">
            <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Translate to:  {languageIcons[language]}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1"> 
              <li><div className="dropdown-item" onClick={() => setLanguage('es')}>🇪🇸 (es) Spanish</div></li>
              <li><div className="dropdown-item" onClick={() => setLanguage('fr')}>🇫🇷 (fr) French</div></li>
              <li><div className="dropdown-item" onClick={() => setLanguage('hi')}>🇮🇳 (hi) Hindi</div></li>
              <li><div className="dropdown-item" onClick={() => setLanguage('pt')}>🇵🇹 (pt) Portuguese</div></li>
              <li><div className="dropdown-item" onClick={() => setLanguage('zh')}>🇨🇳 (zh) Chinese</div></li> 
            </ul>
          </div>
        </div>

        <ul className="navbar-nav flex-nowrap ms-auto">
          {/* notifications section */}
          <li className="nav-item dropdown no-arrow mx-1">
            <div className="nav-item dropdown no-arrow">
              <a
                className="dropdown-toggle nav-link"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                href="/"
              >
                <span className="badge bg-danger badge-counter">3+</span>
                <i className="fas fa-bell fa-fw"></i>
              </a>

              <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                <h6 className="dropdown-header">Notifications</h6>

                <a className="dropdown-item d-flex align-items-center" href="/">
                  <div className="me-3">
                    <div className="bg-primary icon-circle">
                      <i className="fas fa-file-alt text-white"></i>
                    </div>
                  </div>
                  <div>
                    <span className="small text-gray-500">
                      Nov 3
                    </span>
                    <p>Remember to take quiz!</p>
                  </div>
                </a> 
              </div>
            </div>
          </li>
  
          <div className="d-none d-sm-block topbar-divider"></div>

          {/* profile */}
          <li className="nav-item dropdown no-arrow">
            <div className="nav-item dropdown no-arrow">
              <a
                className="dropdown-toggle nav-link"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                href="/"
              >
                <span className="d-none d-lg-inline me-2 text-gray-600 small">
                  {user && user.email}
                </span>
                <img
                  className="border rounded-circle img-profile"
                  src="assets/img/avatars/avatar1.jpeg"
                  alt="profile-img"
                />
              </a>
              <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">  
                <div className="dropdown-item" onClick={() => logout()}>
                  <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                  &nbsp;Logout
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
