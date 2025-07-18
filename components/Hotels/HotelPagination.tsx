import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Dispatch, SetStateAction } from "react";

interface Props {
    totalPages: number;
    page: number;
    seed: string;
    onChangePage: Dispatch<SetStateAction<number>>;
}


const HotelPagination = ({ totalPages, page, seed, onChangePage }: Props) => {

    const renderPageLinks = () => {
        const pageLinks = [];
        for (let i = 1; i <= totalPages; i++) {
            pageLinks.push(
                <PaginationItem className="" key={i}>
                    <PaginationLink
                        isActive={i === page + 1}
                        onClick={() => onChangePage(i - 1)}

                        className={i === page + 1
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 border-0 cursor-pointer"
                            : "bg-gray-600/70 hover:bg-gray-700 cursor-pointer"}
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
                        className={page == 0 ? "bg-gray-600/40 hover:bg-gray-600/40" :
                            "bg-gray-600/70 hover:bg-gray-700 cursor-pointer"
                        }
                        onClick={() => {
                            if (page > 0) onChangePage(page - 1);
                        }}
                    />
                </PaginationItem>

                {renderPageLinks()}

                <PaginationItem>
                    <PaginationNext
                        className={page + 1 >= totalPages ? "bg-gray-600/40 hover:bg-gray-600/40" :
                            "bg-gray-600/70 hover:bg-gray-700 cursor-pointer"
                        }
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