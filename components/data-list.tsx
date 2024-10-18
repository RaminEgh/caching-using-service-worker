'use client'
import ClientImageWithFallback from '@/components/client-image-with-fallback'
import { useEffect, useState, useMemo } from 'react'
import Loading from '@/components/loading'
import { BLUR_DATA_URL } from '@/constants'
import Pagination from './pagination'
import SelectRowsPerPage from './select-rows-per-page'

type Item = {
   albumId: number
   id: number
   title: string
   url: string
   thumbnailUrl: string
}
const dataListCount = 5000

const DataList = () => {
   const [currentPage, setCurrentPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(50)
   const [loading, setLoading] = useState(true)
   const [data, setData] = useState<Item[] | null>(null)
   const pages = useMemo(() => Math.ceil(dataListCount / rowsPerPage), [rowsPerPage])

   const fetchData = async (page: number, rows: number) => {
      setLoading(true)
      try {
         const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${page}&_limit=${rows}`, {
            cache: 'no-cache'
         })
         const result = await response.json()
         setData(result)
         setLoading(false)
         window.scrollTo(0, 0)
      } catch (error) {
         console.error('Error fetching data:', error)
         setLoading(false)
      }
   }

   useEffect(() => {
      fetchData(currentPage, rowsPerPage)
   }, [currentPage, rowsPerPage])

   return (
      <div className='min-h-32 relative p-4'>
                  <div className='w-full flex flex-col md:flex-row gap-2 md:justify-between'>
            <div>
               <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>

            <SelectRowsPerPage setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage} />
         </div>
         {loading && <Loading />}
         {data &&
            data.length > 0 &&
            data.map((item, index) => {
               return (
                  <div className='flex items-center gap-2' key={item.id}>
                     <span className='font-bold text-lg'>{currentPage * rowsPerPage + (index + 1)}</span>
                     <span className='py-2'>
                        <span className='flex items-center gap-2'>
                           <ClientImageWithFallback
                              placeholder='blur'
                              blurDataURL={BLUR_DATA_URL}
                              src={item.thumbnailUrl}
                              width={100}
                              height={100}
                              alt={item.title}
                              className='rounded-2xl'
                           />
                           <strong>{item.title}</strong>
                        </span>
                     </span>
                  </div>
               )
            })}

         <div className='w-full flex flex-col md:flex-row gap-2 md:justify-between'>
            <div>
               <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>

            <SelectRowsPerPage setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage} />
         </div>
      </div>
   )
}

export default DataList
