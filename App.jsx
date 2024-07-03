import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState("")
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  //useRef hook
  const passwordRef= useRef(null);
  //useRef hook is used here to select the input content when copy is pressed(for better UI)... It give reference to any UI element and allow us to manipulate it
  const passwordGenerator = useCallback(() => { 
    //for better optimization
    let pass = ""; //variable which will store password
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // string values that can be used to generate password are stored in this variable
    if (numberAllowed) str += ("01234567890") // if numberAllowed is true then add these set of strings in str
    if (charAllowed) str += ("!@#$%^&*()`~{}[]:;'<>,.?/");
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      //random index is selected from the string
      pass += str.charAt(char);//value present at index of string is stored in pass variable
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed])
  //useCallback is used for memoization
  const copyToClipBoard= useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <h1 className="justify-center text-2xl text-red-400">Random Password Generator</h1>
      <div className="bg-red-200 w-2/3 h-1/2 lg:h-1/3 lg:w-1/2 absolute lg:top-20  lg:left-1/4 rounded-xl md:w-2/3 md:h-3/4 md:top-20 md:left-28 top-24 left-16">
        <div className="flex justify-content w-4/5 h-10 box-border absolute left-6 md:left-10 top-10
      ">
          <input type='text' value={password} className='outline-none w-full py-1 px-3 rounded-l-lg' placeholder='Password' readOnly ref={passwordRef}/>
          <button className='outline-none bg-red-500 px-3 py-0.5 rounded-r-lg' onClick={copyToClipBoard}>Copy</button>
        </div>
        <div className='flex items-center gap-x-1 absolute top-24 left-10 w-5/6'>
          <label className='text-white font-bold'>Length: {length}</label>
          <input type='range' min={8} max={100} value={length} className='cursor-pointer absolute left-1 w-4/5 top-8'
            onChange={(e) => { setLength(e.target.value) }} />
          

        </div>
        <div className='flex absolute left-10 top-36 gap-1'>
            <label className='text-white font-semibold '>Number Allowed:</label>
            <input type='checkbox' defaultChecked={numberAllowed} id='numberAllowed' onChange={() => {
              setNumberAllowed((prev) => !prev);
            }} />
          </div>
          <div className='flex absolute top-44 left-10 gap-1'>
            <label className='text-white font-semibold'>Character Allowed:</label>
            <input type='checkbox' defaultChecked={charAllowed} id='charAllowed' onChange={() => {
              setCharAllowed((prev) => !prev);
            }} />
          </div>
      </div>



    </>
  )
}

export default App
