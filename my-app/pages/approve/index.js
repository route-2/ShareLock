import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

export default function Approve() {
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
              method:"approve",
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
      
     
        


      <div class="grid  place-items-stretch  h-48"> 
      <div class="w-full max-w-xs  place-self-center">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
   
    
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=>callSnap()} type="button">
       I Approve
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
  </form>
 
</div>
</div>





    </>
  )
}