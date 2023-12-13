'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const navlinks = [
  {
    id: 1,
    href: "/",
    name: "Home"
  },
  {
    id: 2,
    href: "/trips",
    name: "Trips"
  }
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="px-24 pt-12 flex justify-between">
      <p className="italic">VoyageSync</p>
      <ul className="flex gap-x-8">
        {navlinks.map((link) => {
          const isActive = pathname.startsWith(link.href)
          return (
            <li key={link.id}>
              <Link href={link.href} className={isActive ? "text-primary-color font-semibold" : "text-secondary-bg-color font-semibold"}>
                {link.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar