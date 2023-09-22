import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Tom from '../assets/imgs/Tom.png'


const Home: NextPage = () => {

  const [isChooseAdd, setIsChooseAdd] = useState(false)
  const [isShowDropdown, setIsShowDropdown] = useState(false)
  const [isNameArt, setIsNameArt] = useState('')
  const [isMessage, setIsMessage] = useState('')
  const [isUrl, setIsUrl] = useState('')

  const address = useAddress()
  const contractAddress = '0x2Cf1AAeFff6fC6200e5E908d16794Ba2B84CC5Bf'

  const { contract } = useContract(contractAddress);


  const { data: totalArt, isLoading: loadingTotalArts } = useContractRead(contract, 'getTotalArt')

  const { data: recentArt, isLoading: loadingRecentArt } = useContractRead(contract, 'getAllArt')

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsShowDropdown(false);
      }
    };

  }, [ref]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);


  return (
    <main className="h-screen flex justify-start items-center flex-col">
      <div className=" w-full py-2 px-2 sticky top-0 z-50 shadow-sm items-center border border-[#eeeeee] flex justify-between lg:px-4 lg:w-[80%] lg:mt-4 rounded-lg backdrop-blur-[2rem] bg-transparent">
        <h1 className="font-bold text-xl text-[#313131] uppercase">Nev</h1>
        <ConnectWallet />
      </div>
      <div className="w-full mt-4 bg-[#ffffff] px-2 lg:w-[80%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-bold">Total Art:</p>
            <div>
              {loadingTotalArts ? (
                <div role="status">
                  <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                </div>
              ) : (
                <span className="text-[0.9rem] font-bold text-red-600">
                  {totalArt?.toString()} 🎨
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="w-[2.5rem] cursor-pointer shadow-sm border active:scale-90 duration-200 border-[#ececec] h-[2.5rem] rounded-lg overflow-hidden"
              onClick={() => setIsShowDropdown(!isShowDropdown)}
              ref={ref}
            >
              <Image src={'https://i.pinimg.com/564x/5e/b3/0b/5eb30bea9368bc9e27f23885ce3f2e61.jpg'} width={50} height={50} alt="nev" className="w-full h-full object-cover" />
            </div>
            {
              isShowDropdown && (
                <div className="absolute w-[20rem] right-0 z-50 top-12 bg-[#ffffff] border-[#ececec] border text-[0.9rem] p-2 shadow-sm rounded-lg flex flex-col gap-2 items-start">
                  {
                    loadingRecentArt ? (
                      <div className="w-full flex justify-center gap-2 items-center py-2">
                        <div role="status">
                          <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                          </svg>
                        </div>
                        <span className="font-medium">Loading...</span>
                      </div>
                    ) : (
                      recentArt && (
                        recentArt.length > 0 ? (
                          recentArt.map((art: any, index: number) => (
                            <div key={index} className="border-[#ececec] relative border-b w-full flex flex-col gap-1 p-2">
                              <p className="font-bold text-[1rem]">{art.name}:</p>
                              <p className="text-[0.8rem] font-medium">{art.message}</p>
                              <span className="absolute top-2 right-2 text-red-500 font-medium text-[0.8rem]">
                                {/* TIMESTAMP  */}
                                [{new Date(art.timestamp * 1000).toLocaleDateString()}]
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="font-bold text-center w-full text-blue-500 py-4 underline">No message!</div>
                        )
                      )
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <button className="text-[0.9rem] py-2 w-full rounded-lg bg-[#ececec] font-medium active:scale-90 duration-200 lg:w-auto lg:px-8"
            onClick={() => setIsChooseAdd(!isChooseAdd)}
          >
            {
              isChooseAdd ? 'Cancel' : 'Add'
            }
          </button>

        </div>
        <div className={`flex flex-col justify-start items-start mt-4 w-full  rounded-lg shadow-sm lg:shadow-none ${isChooseAdd ? 'lg:flex-row gap-4 ' : 'grid grid-cols-1 gap-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-4'}`}>
          {
            isChooseAdd ? (
              <>
                <div className="text-[0.9rem] flex flex-col gap-4 lg:max-w-[30rem] border border-[#ececec] w-full shadow-sm p-2 rounded-lg">
                  <div className="flex flex-col items-start gap-1">
                    <label htmlFor="nameArt" className="font-medium text-gray-800">Name art:</label>
                    <input type="text" id='nameArt' className="py-2 w-full px-4 bg-[#ececec] rounded-lg outline-none text-[0.9rem]"
                      value={isNameArt}
                      onChange={(e) => setIsNameArt(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <label htmlFor="message" className="font-medium text-gray-800">Message:</label>
                    <input type="text" id='message' className="py-2 w-full px-4 bg-[#ececec] rounded-lg outline-none text-[0.9rem]"
                      value={isMessage}
                      onChange={(e) => setIsMessage(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <label htmlFor="url" className="font-medium text-gray-800">Link image:</label>
                    <input type="url" id='url' className="py-2 w-full px-4 bg-[#ececec] rounded-lg outline-none text-[0.9rem]"
                      value={isUrl}
                      onChange={(e) => setIsUrl(e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    {
                      address ? (
                        <Web3Button
                          contractAddress={contractAddress}
                          action={(contract) => {
                            contract.call("buyArt", [isMessage, isNameArt, isUrl], { value: ethers.utils.parseEther("0.01") })
                          }}
                          onSuccess={() => {
                            setIsChooseAdd(false)
                            setIsMessage('')
                            setIsNameArt('')
                          }}
                        >
                          <span className="text-[0.85rem]">{" Buy a Art 0.01ETH"}</span>
                        </Web3Button>
                      ) : (
                        <i className="text-red-500 font-medium text-[0.9rem]">Vui lòng kết nối với ví!</i>
                      )
                    }
                  </div>
                </div>
                <div className="hidden lg:block lg:flex-1 h-[19rem] rounded-lg shadow-sm relative bg-fixed h-full"
                  style={{
                    backgroundImage: `url('https://papers.co/wallpaper/papers.co-bj42-apple-iphone-ios13-background-orange-art-25-wallpaper.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <Image src={Tom} width={300} height={300} alt="nev" className="absolute bottom-2 right-2 hidden xl:block w-[8rem]" />
                </div>
              </>
            ) : (
              loadingRecentArt ? (
                [1, 2, 3, 4].map((art: any, index: number) => (
                  <div key={index} className="relative bg-[#ffffff] animate-pulse p-2 flex flex-col gap-2 rounded-lg shadow-sm border border-[#e7e7e7]">
                    <div className="h-[20rem] bg-[#c5c5c5] rounded-lg">
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="p-1 rounded-full w-[8rem] bg-[#c5c5c5]"></p>
                      <p className="p-1 rounded-full w-[6rem] bg-[#c5c5c5]"></p>
                    </div>
                    <div className="mt-2 bg-[#c5c5c5] py-5 rounded-lg">
                    </div>
                  </div>
                ))
              ) : recentArt.map((art: any, index: number) => (
                <div key={index} className="relative bg-[#ffffff] p-2 flex flex-col gap-2 rounded-lg shadow-sm border border-[#e7e7e7]">
                  <div>
                    <Image src={art.image} width={300} height={300} alt="nev" className="w-full object-cover rounded-lg" />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[1.1rem]">{art.name}</p>
                    <span className="text-[0.8rem] text-red-500 font-medium">
                      {new Date(art.timestamp * 1000).toLocaleDateString()}
                    </span>
                  </div>
                  <button className="mt-2 bg-[#ececec] text-[0.9rem] font-medium py-2 rounded-lg active:scale-90 duration-200">
                    Buy art
                  </button>
                </div>
              ))
            )
          }
        </div>
      </div>
    </main>
  );
};

export default Home;
