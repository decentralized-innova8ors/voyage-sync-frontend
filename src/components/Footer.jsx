const Footer = () => {
  return (
    <footer className="px-24 py-12 bg-secondary-bg-color text-secondary-main-color">
      <div className="flex justify-between">
        <div>
          <p className="italic">VoyageSync</p>
          <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis cumque, harum nihil ea odit nisi</p>
        </div>
        <div>
          <p className="font-semibold mb-2">About</p>
          <ul className="text-sm flex flex-col gap-y-2">
            <li>
              Trips
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Community</p>
          <ul className="text-sm flex flex-col gap-y-2">
            <li>
              Events
            </li>
            <li>
              Blog
            </li>
            <li>
              Podcast
            </li>
            <li>
              Invite a friend
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Socials</p>
          <ul className="text-sm flex flex-col gap-y-2">
            <li>
              Discord
            </li>
            <li>
              Instagram
            </li>
            <li>
              Twitter
            </li>
            <li>
              Facebook
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-4"/>
      <div className="flex justify-between">
        <p className="text-left text-sm">@2023.All rights reserved</p>
        <div className="flex gap-x-12 text-sm">
          <p>Privacy & Policy</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer