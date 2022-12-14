function NavBarIcon({ icon, text, classes }) {
  return (
    <div className={`navbar-icon group ${classes}`}>
      {icon}

      <span className="navbar-tooltip group-hover:scale-100">
        {text}
      </span>
    </div>
  )
}

export default NavBarIcon