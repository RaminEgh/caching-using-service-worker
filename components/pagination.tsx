type Props = {
   currentPage: number
   pages: number
   setCurrentPage: (page: number) => void
}
const Pagination = ({ currentPage, pages, setCurrentPage }: Props) => {
   const renderPaginationButtons = () => {
      const paginationButtons = []

      const startPage = Math.max(3, currentPage - 2) // Start 3 pages before the current page
      const endPage = Math.min(pages - 3, currentPage + 2) // End 3 pages after the current page

      // First 3 pages
      for (let i = 0; i < 3; i++) {
         paginationButtons.push(
            <button
               key={i}
               onClick={() => setCurrentPage(i)}
               className={`min-w-20 px-4 py-2 rounded border ${currentPage === i ? 'bg-blue-50 pointer-events-none' : ''}`}
            >
               {i + 1}
            </button>
         )
      }

      // Add dots if the current page is beyond page 3
      if (currentPage > 4) {
         paginationButtons.push(<span key='dots1'>...</span>)
      }

      // Pages around the current page
      for (let i = startPage; i <= endPage; i++) {
         paginationButtons.push(
            <button
               key={i}
               onClick={() => setCurrentPage(i)}
               className={`min-w-20 px-4 py-2 rounded border ${currentPage === i ? 'bg-blue-50' : ''}`}
            >
               {i + 1}
            </button>
         )
      }

      // Add dots if the current page is not near the end
      if (currentPage < pages - 4) {
         paginationButtons.push(<span key='dots2'>...</span>)
      }

      // Last 3 pages
      for (let i = pages - 3; i < pages; i++) {
         paginationButtons.push(
            <button
               key={i}
               onClick={() => setCurrentPage(i)}
               className={`min-w-20 px-4 py-2 rounded border ${currentPage === i ? 'bg-blue-50' : ''}`}
            >
               {i + 1}
            </button>
         )
      }

      return paginationButtons
   }
   return <div className='flex w-full justify-center flex-wrap items-center gap-1 py-4'>{renderPaginationButtons()}</div>
}

export default Pagination
