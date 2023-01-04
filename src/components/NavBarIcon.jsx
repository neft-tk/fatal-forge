function NavBarIcon({ icon, text }) {
  return (
    <div className={`relative group text-3xl md:text-4xl md:text-5xl hover:scale-125 hover:text-sky-600 text-neutral-200`}>
      {icon}

      <span className="navbar-tooltip group-hover:scale-100">
        {text}
      </span>
    </div>
  )
}

export default NavBarIcon