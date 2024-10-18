import DataList from '@/components/data-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Cached data by Service worker',
   keywords: ['ReactJS', 'NextJS', 'Service Workers']
}

export default function Home() {
   return (
      <main className='container mx-auto px-4 md:px-6 bg-background'>
         <section className='flex flex-col'>
            <div className='w-full flex justify-between items-center'>
               <h1 className='text-4xl font-bold py-8 px-4'>Cached data by Service worker </h1>
            </div>

            <DataList />
         </section>
      </main>
   )
}
