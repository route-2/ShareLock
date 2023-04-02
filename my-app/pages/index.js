import Head from 'next/head'
import React, { useState } from "react";
import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ABI from "../contracts/mpc.json"





import { Inter } from 'next/font/google'
import { useProvider, useSigner } from 'wagmi';
 


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  


  const defaultSnapOrigin = `local:http://localhost:8080`;
  const [formData, setFormData] = useState({});
   // channel private key
   
  
  const provider = useProvider();
  const {data:signer} = useSigner();
  console.log(signer)
   

   const mpcContract = new ethers.Contract("0x9c74a0fd2d0249e4fe885ac0fadc920fb498bd6e",ABI,signer)
   console.log(mpcContract)
const sendNotification = async() => {
  const Pkey = `0x4d31dd75de7e5c056250e47f48370d96632246a81f7650b651571da85510d2f0`;
const _signer = new ethers.Wallet(Pkey);
 
const account=(await provider.listAccounts())[0]
   console.log(account)

  const apiResponse = await PushAPI.payloads.sendNotification({
    signer: _signer,
    type: 3, // target
    identityType: 2, // direct payload
    notification: {
      title: `Recovery`,
      body: `Approve with your part of the share!`
    },
    payload: {
      title: `[sdk-test] payload title`,
      body: `sample msg body`,
      cta: '',
      img: ''
    },
    recipients: `eip155:5:0x050F40Aa40C72f77AF60c9Aaf56cE9d36550AF70`, // recipient address
    channel: 'eip155:5:0xAa152e5a07204ad8703eC5A716E329d6bC208aDd', // your channel address
    env: 'staging'
  });
  console.log(apiResponse)
  

}

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFormSubmit = () => {
    console.log(formData); 
  };



 


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

  const combine = async()=>{
    await window.ethereum?.request({
      method:"wallet_invokeSnap",
      params:{
        snapId : defaultSnapOrigin,
        request:{
          method:"combine",
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
          <button className='bg-black font-semibold text-white px-4 py-2 m-4 rounded-xl' onClick={()=>callSnap()}> split </button>
          <button className='bg-black font-semibold text-white px-4 py-2 m-4 rounded-xl' onClick={()=>combine()}> combine </button>
          <ConnectButton />
        </div>
        



<div class="grid grid-cols-3 gap-4 justify-items-stretch h-72">
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
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"  type="text" placeholder="Address" id="guardianWallet1"
           
            onChange={handleInputChange}/>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
      Guardian Wallet 2
      </label>
    </div>
    <div class="md:w-2/3">
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"  type="text" placeholder="Address"  id="guardianWallet2"
           
           
            onChange={handleInputChange}/>
      
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
      Guardian Wallet 3
      </label>
    </div>
    <div class="md:w-2/3">
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"  type="text" placeholder="Address" id="guardianWallet3"
           
            onChange={handleInputChange}/>
      
    </div>
  </div>
  
  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button class="shadow bg-black hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={handleFormSubmit}>
        Sign Up
      </button>
    </div>
  </div>
 

</form>
  </div>
 
  
</div>
 <div class="md:flex mt-6 ml-44 md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button class="shadow  hover:bg-gray-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button" onClick={sendNotification}>
      Forgot Password?
      </button>
    </div>
  </div>


    </>
  )
}
