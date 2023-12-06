import Image from 'next/image';
import Card from '@/components/Card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
     <h1 className="font-heading font-bold text-6xl mb-6">See the world for less</h1>
     <div>
      <ul className="flex gap-x-6 mb-8">
        <li>
          <div>
            {/* <img src="" alt="all" /> */}
            <p>Search All</p>
          </div>
        </li>
        <li>
          <div>
            {/* <img src="" alt="all" /> */}
            <p>Flight</p>
          </div>
        </li>
        <li>
          <div>
            {/* <img src="" alt="all" /> */}
            <p>Stays</p>
          </div>
        </li>
        <li>
          <div>
            {/* <img src="" alt="all" /> */}
            <p>Things To Do</p>
          </div>
        </li>
        <li>
          <div>
            {/* <img src="" alt="all" /> */}
            <p>Restaurants</p>
          </div>
        </li>
        <li>
          <div>
            {/* <img src="" alt="all" /> */}
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
     <Image src="/hero.jpg" alt="hero" width={600} height="50"/>
     <p className='font-heading font-bold text-4xl my-8'>How it works</p>
     <div className="flex gap-x-4">
      <Card
        title="Search for accomodation"
        content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis cumque, harum nihil ea odit nisi"
        href="/hero.jpg"
        alt="accomodation"
      />
      <Card
        title="Search for flights"
        content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis cumque, harum nihil ea odit nisi"
        href="/hero.jpg"
        alt="flights"
      />
      <Card
        title="Create an itinerary"
        content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis cumque, harum nihil ea odit nisi"
        href="/hero.jpg"
        alt="itinerary"
      />
     </div>
    </main>
  )
}
