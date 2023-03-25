import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const defaultSnapOrigin = `local:http://localhost:8080`;

  const connectSnap = async (
    snapId = defaultSnapOrigin,
    params = {}
  ) => {
    await window.ethereum?.request({
      method: "wallet_requestSnaps",
      params: {
        [snapId]: params,
      },
    });
  };

  const callSnap = async()=>{
    await window.ethereum?.request({
      method:"wallet_invokeSnap",
      params:{
        snapId : defaultSnapOrigin,
        request:{
          method:"split",
        },
      },
    });
  }

  

  return (
    <>
      <Head>
       
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="/dist/output.css" rel="stylesheet"/>
      </Head>
      
      <div className='flex flex-row items-center align-middle ' >
          <button className='bg-black font-semibold text-white px-4 py-2 m-4 rounded-xl' onClick={()=>connectSnap()}>Install Snap</button>
          <button className='bg-black font-semibold text-white px-4 py-2 m-4 rounded-xl' onClick={()=>callSnap()}> Hello </button>
        
        </div>
        



<div class="grid grid-cols-3 gap-4 justify-items-stretch h-48">
  <div class="text-gray-700  flex justify-center items-center px-4 py-2"> 
  
  </div>
  <div class="justify-self-center shadow-2xl rounded-lg text-gray-800 flex justify-center items-center px-4 py-2">  
  
  <form class="w-full max-w-sm content-center">
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Guardian Wallet 1
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Address"/>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
      Guardian Wallet 1
      </label>
    </div>
    <div class="md:w-2/3">
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Address"/>
      
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
      Guardian Wallet 3
      </label>
    </div>
    <div class="md:w-2/3">
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Address"/>
      
    </div>
  </div>
  
  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button class="shadow bg-black hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Sign Up
      </button>
    </div>
  </div>
</form>
  </div>
  
</div>


    </>
  )
}
