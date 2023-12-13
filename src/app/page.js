import Image from 'next/image';
import Card from '@/components/Card';
import { BsHouse } from "react-icons/bs";
import { MdFlight } from "react-icons/md";
import { LuBedSingle } from "react-icons/lu";
import { IoTelescopeOutline } from "react-icons/io5";
import { MdOutlineRestaurant } from "react-icons/md";
import { GrTrophy } from "react-icons/gr";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
     <h1 className="font-heading font-bold text-6xl mb-6">See the world for less</h1>
     <div>
      <ul className="flex gap-x-6 mb-8">
        <li>
          <div className='flex items-center gap-x-2'>
            <BsHouse fontSize="1.5rem" />
            <p>Search All</p>
          </div>
        </li>
        <li>
          <div className='flex items-center gap-x-2'>
            <MdFlight fontSize="1.5rem" />
            <p>Flight</p>
          </div>
        </li>
        <li>
          <div className='flex items-center gap-x-2'>
            <LuBedSingle fontSize="1.5rem" />
            <p>Stays</p>
          </div>
        </li>
        <li>
          <div className='flex items-center gap-x-2'>
            <IoTelescopeOutline fontSize="1.5rem" />
            <p>Things To Do</p>
          </div>
        </li>
        <li>
          <div className='flex items-center gap-x-2'>
            <MdOutlineRestaurant fontSize="1.5rem" />
            <p>Restaurants</p>
          </div>
        </li>
        <li>
          <div className='flex items-center gap-x-2'>
            <GrTrophy fontSize="1.5rem" />
            <p>Attractions & Tours</p>
          </div>
        </li>
      </ul>
      <form className='mb-12'>
        <input
          className='border border-secondary-main-color rounded-3xl shadow-md px-6 py-3 w-full'
          type="text"
          placeholder='Places to visit, Things to do, Restaurants...'/>
      </form>
     </div>
     <Image src="/illustration_04.svg" alt="hero" width={600} height="50"/>
     <p className='font-heading font-bold text-4xl my-8'>How it works</p>
     <div className="flex gap-x-4">
      <Card
        title="Search for accomodation"
        content="Explore and book accommodations seamlessly on Voyage Sync—your ultimate travel companion. 
        Find your perfect stay anywhere in the world, effortlessly."
        href="/illustration_01.svg"
        alt="accomodation"
      />
      <Card
        title="Search for flights"
        content="Discover seamless flight bookings worldwide on Voyage Sync.
        Find and book your ideal flight with ease and confidence, all in one place."
        href="/illustration_02.svg"
        alt="flights"
      />
      <Card
        title="Create an itinerary"
        content="Craft your perfect journey effortlessly on Voyage Sync. Build personalized itineraries with ease, tailored to your travel aspirations."
        href="/illustration_03.svg"
        alt="itinerary"
      />
     </div>
    </main>
  )
}
