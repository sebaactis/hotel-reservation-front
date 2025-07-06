import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


const HotelPagination = ({ totalPages, page, seed, onChangePage }: { totalPages: number, page: number, seed: string, onChangePage: any }) => {


    const renderPageLinks = () => {
        const pageLinks = [];
        for (let i = 1; i <= totalPages; i++) {
            pageLinks.push(
                <PaginationItem className="" key={i}>
                    <PaginationLink
                        href="#"
                        isActive={i === page + 1}
                        onClick={() => onChangePage(i - 1)}
                        className={i === page + 1
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 border-0"
                            : "bg-gray-600/70 hover:bg-gray-700"}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return pageLinks;
    }

    return (
        <Pagination className="mt-10">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className="bg-gray-600/70 hover:bg-gray-700"
                        href="#"
                        onClick={() => {
                            if (page > 0) onChangePage(page - 1);
                        }}
                    />
                </PaginationItem>

                {renderPageLinks()}

                <PaginationItem>
                    <PaginationNext
                        className="bg-gray-600/70 hover:bg-gray-700"
                        href="#"
                        onClick={() => {
                            if (page + 1 < totalPages) onChangePage(page + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default HotelPagination