import { FC } from 'react'

const Loading: FC = () => {
   return (
      <div className='animate-pulse bg-slate-900/50 absolute top-0 bottom-0 left-0 right-0 rounded-2xl text-center'>
         <span className='md:text-lg font-semibold bg-white py-3 px-8 rounded-2xl fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
            Loading...
         </span>
      </div>
   )
}

export default Loading
