import React from 'react'

export const HotelDetailSkeletonNames = ({ width }: { width: string | number }) => {
    return (
        <div style={{ width }} role="status" className="max-w-2xl p-4 rounded-sm shadow-sm animate-pulse md:p-6">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500"></div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export const HotelDetailsSkeletonRating = ({ width }: { width: string | number }) => {
    return (
        <div role="status" className="max-w-2xl rounded-full shadow-sm animate-pulse md:p-6">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 p-5"></div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export const HotelDetailsSkeletonDescription = () => {
    return (
        <div role="status" className="flex flex-col max-w-2xl rounded-md shadow-sm animate-pulse md:p-6 gap-5">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 p-3"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 p-3"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 p-3"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 p-3"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 p-3"></div>

            <span className="sr-only">Loading...</span>
        </div>
    )
}

export const HotelDetailsSkeletonBagdes = () => {
    return (
        <div role="status" className="flex  max-w-2xl rounded-md shadow-sm animate-pulse md:p-6 gap-5">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 py-3 px-12"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 py-3 px-12"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 py-3 px-12"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 py-3 px-12"></div>

            <span className="sr-only">Loading...</span>
        </div>
    )
}
