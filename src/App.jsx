import {FaSearch} from 'react-icons/fa'
import {HiUpload} from 'react-icons/hi'
import {IoIosNotifications} from 'react-icons/io'
import {GoHomeFill, GoPlusCircle} from 'react-icons/go'
import {MdVideoLibrary, MdOutlineSubscriptions} from 'react-icons/md'

import VideoCard from './components/VideoCard'

function App() {

  return (
    <main className="h-screen min-h-screen bg-slate-950">
      <div className='flex flex-col h-full'>
        <nav className="h-14 w-full bg-transparent flex justify-between items-center">
          <div className="h-full py-2 px-4 bg-purple-500 leading-loose font-bold"> 
            <span> MyTube </span>
          </div>
          <div className='text-slate-200 flex items-center gap-2'>
            <input type="text" className='hidden rounded outline-none px-2 py-1 text-slate-900 sm:block' />
            <FaSearch className='text-xl cursor-pointer'/>
          </div>
          <ul className="text-slate-200 flex items-center gap-3 p-1 text-xl">
            <li><HiUpload/></li>
            <li><IoIosNotifications/></li>
            <li>
              <div className="w-10 aspect-square bg-purple-600 rounded-full"></div>
            </li>
          </ul>
        </nav>
        <div className='w-full h-full bg-slate-900 flex-wrap flex justify-center'>
          <VideoCard/>
        </div>
      </div>
      <div className='bg-slate-100 h-14 w-full fixed bottom-0 flex justify-around items-center invert text-2xl sm:hidden'>
      <GoHomeFill/>
      <GoPlusCircle/>
      <MdOutlineSubscriptions/>
      <MdVideoLibrary/>
      </div>
    </main>
  )
}

export default App
