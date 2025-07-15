import React from 'react'

const IndexSkeleton = ({ width, height }: { width: string | number, height: string | number }) => {
    return (
        <div style={{ width }} role="status" class="max-w-2xl p-4 rounded-sm shadow-sm animate-pulse md:p-6">
            <div style={{ height }} class="     bg-gray-200 rounded-md dark:bg-gray-500"></div>
            <span class="sr-only">Loading...</span>
        </div>
    )
}

export default IndexSkeleton