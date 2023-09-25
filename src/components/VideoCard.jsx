import { useEffect, useRef, useState } from 'react'

//import icons svg
import nature from '../assets/natureza.mp4'
import play from '../assets/play.svg'
import pause from '../assets/pause.svg'
import miniplay from '../assets/miniplayer.svg'
import theater from '../assets/theater.svg'
import fullscreen from '../assets/fullscreen.svg'
import volumeHigh from '../assets/volume-up.svg'
import volumeLow from '../assets/volume-down.svg'
import volumeOff from '../assets/volume-off.svg'
import ellipse from '../assets/ellipses-vertical.svg'

const VideoCard = () => {

  const video = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isTheater, setIsTheater] = useState(false)
  const [isOpenVel, setIsOpenVel] = useState(false)
  const [volume, setVolume] = useState(100)
  const [currentTimeVideo, setCurrentTimeVideo] = useState(0)
  const [timeVideo, setTimeVideo] = useState(0)

  useEffect(()=>{
    isPlaying ? video.current.play() : video.current.pause()
    setTimeVideo(video.current.duration)
  },[isPlaying, video])

  useEffect(()=>{
    video ? setTimeVideo(video.current.duration) : setTimeVideo(0)
  },[video])

  useEffect(()=>{
    const pressKeyFunc = (e) =>{

      if(e.keyCode == 32 || e.keyCode == 107) handlePlay()
      else if(e.keyCode == 102) handleFullScreenToggle()
      else if(e.keyCode == 116) handleTheaterToggle()
      else if(e.keyCode == 105) handleMiniPlayerToggle()

    }

    window.addEventListener('keydown', (e)=>pressKeyFunc(e))
    return window.removeEventListener('keydown', pressKeyFunc)
  },[])

  const handlePlay = () => {
    setIsPlaying(prevState => !prevState)
  }

  const handleMiniPlayerToggle = () =>{
      video.current.requestPictureInPicture()
  }

  const handleFullScreenToggle = () =>{
    if(document.fullscreenElement == null) video.current.requestFullscreen()
    else document.exitFullscreen()
  }
  
  const handleTheaterToggle = () =>{
    setIsTheater(prev => !prev)
  }

  const handleVolumeChange = (e) =>{
    setVolume(e.target.value)
    video.current.volume = e.target.value/100
  }

  const handleCurrentTimeVideoChange = (e) =>{
    setCurrentTimeVideo(e.target.value)
    video.current.currentTime = e.target.value
  }

  const handleTimeUpdate = () =>{
    setCurrentTimeVideo(video.current.currentTime)
  }

  const handleIsOpenVel = () =>{
    setIsOpenVel(prev => !prev)
  }

  const handleVelChange = (vel) =>{
    video.current.playbackRate = vel
    setIsOpenVel(false)
  }

  const handleFormatedTime = (time)=>{
    const minutes = Math.floor(time/60)
    const seconds = Math.floor(time%60)
    const formatedMin = String(minutes).padStart(2, '0')
    const formatedSec = String(seconds).padStart(2, '0')
    return `${formatedMin}:${formatedSec}`
  }

  return (

    <div className={`${isTheater ? 'w-full max-w-none' : 'w-11/12 max-w-5xl items-center mt-5'} text-slate-100 font-bold flex flex-col gap-2`}>
      <div className={`${isTheater && 'w-full h-full max-h-[90vh] bg-black'} relative group z-0 flex justify-center`}>
        <div className={`flex flex-col justify-end w-full absolute bottom-0 ${isPlaying && 'opacity-0'}
          group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-auto bg-gradient-to-t from-[rgba(0,0,0,.75)] to-transparent aspect-[6/1]`} >
          <div className='accent-violet-500'>
            <input type="range" min='0' max={timeVideo || 0} className='w-full cursor-pointer' onChange={handleCurrentTimeVideoChange} value={currentTimeVideo}/>
          </div>
          <div className='flex justify-between'>
            <div className={`flex items-center ${isTheater ? 'gap-6': 'gap-3'}`}>
              <button className='invert p-2' onClick={handlePlay}>
                {isPlaying ?
                  <img src={pause} alt="" className='w-5'/> :
                  <img src={play} alt="" className='w-5'/>}
              </button>
              <div className='flex group/vol'>
                <button className='invert p-2' onClick={()=>setVolume(0)}>
                  {volume == 0 ?
                    <img src={volumeOff} alt="" className='w-5'/> :
                    volume <= 50 ?
                    <img src={volumeLow} alt="" className='w-5'/> :
                    <img src={volumeHigh} alt="" className='w-5'/>
                  }
                </button>
                <input type="range" min='0' max='100' step='10' onChange={handleVolumeChange} value={volume}
                className='w-20 accent-violet-500 cursor-pointer hidden group-hover/vol:block transition-all'/>
              </div>
              {timeVideo ? 
                <span className='px-1 text-[7px] sm:text-sm'>{handleFormatedTime(currentTimeVideo)} / {handleFormatedTime(timeVideo)}</span>: 
                <span className='px-1 text-[7px] sm:text-sm'>00:00 / 00:00</span>
              }
            </div>
            <div className='flex sm:gap-4 px-1 pointer-events-auto'>
              <button className='p-2 invert' onClick={handleIsOpenVel}>
                <img src={ellipse} alt="" className='w-4'/>
              </button>
              {isOpenVel && 
                <div className='bg-[rgba(255,255,255,.7)] absolute bottom-20 right-2 text-slate-900 z-30 p-4 text-base font-normal text-center rounded'>
                  <span className='cursor-default font-semibold'>Velocidade</span>
                  <ul className='flex flex-col gap-2 cursor-pointer'>
                    <li onClick={()=>handleVelChange(0.5)}>0.5</li>
                    <li onClick={()=>handleVelChange(1)}>Normal</li>
                    <li onClick={()=>handleVelChange(1.5)}>1.5</li>
                    <li onClick={()=>handleVelChange(2)}>2.0</li>
                  </ul>
                </div>
              }
              <button className='p-2 invert' onClick={handleMiniPlayerToggle}>
                <img src={miniplay} alt="" className='w-4'/>
              </button>
              <button className='p-2 invert' onClick={handleTheaterToggle}>
                <img src={theater} alt="" className='w-4' />
              </button>
              <button className='p-2 invert' onClick={handleFullScreenToggle}>
                <img src={fullscreen} alt="" className='w-4'/>
              </button>
            </div>
          </div>
        </div>
        <video ref={video} src={nature}  onTimeUpdate={handleTimeUpdate}></video>
      </div>
      <div className='flex flex-col max-w-4xl gap-2 px-2 md:px-5'>
        <h2 className='text-2xl'>Title</h2>
        <p className='text-sm text-justify'>Description - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque distinctio sunt quas voluptatem ex! Consequuntur in quo ipsam? Iste tempore voluptate quibusdam esse assumenda sed, minus beatae nesciunt recusandae unde.</p>
      </div>
    </div> 
  )
}

export default VideoCard