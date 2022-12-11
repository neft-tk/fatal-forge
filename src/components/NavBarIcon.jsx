function NavBarIcon({ icon, text }) {
  return (
    <div className="navbar-icon group">
      {icon}

      <span className="navbar-tooltip group-hover:scale-100">
        {text}
      </span>
    </div>
  )
}

export default NavBarIcon