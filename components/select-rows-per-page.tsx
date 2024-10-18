import { memo } from 'react'
type Props = {
   rowsPerPage: number
   setRowsPerPage: (rowsPerPage: number) => void
}
const SelectRowsPerPage = ({ rowsPerPage, setRowsPerPage }: Props) => {
   return (
      <div className='flex justify-between items-center'>
         <small>Row Per Page:</small>
         <select value={rowsPerPage} onChange={(event) => setRowsPerPage(+event.target.value)} className='px-8'>
            <option value={50}>50</option>
            <option value={100}>100</option>
         </select>
      </div>
   )
}

export default memo(SelectRowsPerPage)
