import './style.scss'
import MusicDisc from '../../../../assets/images/HomePage/Music Disc.png'
import Back from '../../../../assets/images/HomePage/Back'
import Next from '../../../../assets/images/HomePage/Next'
import Play from '../../../../assets/images/HomePage/Play';
import Pause from '../../../../assets/images/HomePage/Pause';
import MenuMusic from '../../../../assets/images/HomePage/Menu'
import { useEffect, useState } from 'react';
import ListMusic from '../../../../Data/Music.json'
function Container() {
    const [status,setStatus] = useState(false)
    const [showControl,setShowControl] = useState(false)
    const [id,setId] = useState(0)
    const [menu,setMenu] = useState(false)
    const [audio] = useState(new Audio(ListMusic[id].Audio));
    const handleStatus = () => {
        setStatus(!status)
    }
    const handleNext = () => {
        if(id === ListMusic.length-1)
        {
            audio.src = ListMusic[0].Audio
            setId(0)
            audio.play();
            setStatus(true)
        }
        else
        {
            audio.src = ListMusic[Number(id)+1].Audio
            setId(Number(id)+1)
            audio.play();
            setStatus(true)
        }
    }
    const handlePrev = () => {
        if(id === 0)
        {
            audio.src = ListMusic[ListMusic.length-1].Audio
            setId(ListMusic.length-1)
            audio.play();
            setStatus(true)
        }
        else
        {
            audio.src = ListMusic[Number(id)-1].Audio
            setId(Number(id)-1)
            audio.play();
            setStatus(true)
        }
    }
    const handleClickItemMusic = (e) => {
        audio.src = ListMusic[Number(e.target.id)].Audio
        setId(Number(e.target.id))
        audio.play();
        setStatus(true)
    }
    audio.addEventListener('ended',()=>{
        if(id === ListMusic.length-1)
        {
            audio.src = ListMusic[0].Audio
            setId(0)
            audio.play();
        }
        else
        {
            audio.src = ListMusic[Number(id)+1].Audio
            setId(Number(id)+1)
            audio.play();
        }
    })
    useEffect(()=>{
        status ? audio.play() : audio.pause();
    },[status,audio])
    document.title = 'NPT Music';
    return (
        <>
        <div className='Title'>{ListMusic[id].NameAudio}</div>
        <div className={`Color ${status ? 'Rotate' : ''}`}></div> 
        <div className={`Container ${status ? 'ChangeColorBg' : ''}`}
        style = {{borderTopRightRadius:`${menu ? 0 : '10px'}`,borderBottomRightRadius:`${menu ? 0 : '10px'}`}}
        onMouseOver={()=>setShowControl(true)} onMouseLeave = {()=>setShowControl(false)}>
            <nav className='MusicDisc'>
                <img src= {MusicDisc} alt = "Music CD" className={`${status ? 'DiscRotate' : ''}`}/>
            </nav>
            <div className={`ControlMusic ${showControl ? 'ShowControl' : ''}`}>
                <nav className='Back' onClick={handlePrev}><Back width={'100%'} height = {'100%'}/></nav>
                <nav className='Status' onClick={handleStatus}>{status ? <Pause width={'100%'} height = {'100%'}/> : <Play width={'50%'} height = {'100%'}/>}</nav>
                <nav className='Next' onClick={handleNext}><Next width={'100%'} height = {'100%'}/></nav>
                <input type={'range'} min = {0} step={0.05} max = {1} className = 'volume' onChange = {(e)=>{
                    audio.volume = e.target.value
                }}/>
            </div>
            <MenuMusic classname={`MenuMusic ${menu ? 'RotateMenuMusic' : ''}`} click = {()=>{
                setMenu(!menu)
            }}/>
        </div>
        <div className={`Menu ${menu ? 'showMenu' : ''}`}>
            {ListMusic.map((audio,index)=>(
                <>
                <nav key={index++} style = {{border:`${id === index ? '5px solid green' : '5px solid black'}`}} onSelect = {(e)=>{e.target.select()}} className="MenuItems"
                >
                <div className='Trash' id = {index} onClick={handleClickItemMusic}></div>
                <div key={index++} className="NameAudio">
                    {audio.NameAudio}
                </div>
                <div key={index++} className="Order">
                    {audio.NameOrder}
                </div>
                </nav></>
            ))}
            </div>
        </>
     );
}

export default Container;