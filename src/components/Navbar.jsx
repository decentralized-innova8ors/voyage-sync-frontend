import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="px-24 pt-12 flex justify-between">
      <p>LOGO</p>
      <ul className="flex gap-x-8">
        <li><Link href="/" className="hover:underline">Home</Link></li>
        <li><Link href="/trips" className="hover:underline">Trips</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar