// This component is used to render the icons and tooltips in the navbar.

export default function NavBarIcon({ icon, text }) {
  return (
    // React icons are passed in as props and interpolated.
    <div className={`relative group text-3xl md:text-4xl hover:scale-125 hover:text-sky-600 text-neutral-200`}>
      {icon}
      {/* Tooltip (also passed in) */}
      <span className="navbar-tooltip group-hover:scale-100">
        {text}
      </span>
    </div>
  )
}
