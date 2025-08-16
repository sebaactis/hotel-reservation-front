import { useEffect, useState } from 'react';
import Hotels from './Hotels'
import { Hotel } from '@/types';

const HotelsServerContainer = () => {

    const baseUrl = "http://localhost:8080/api/v1/hotel?"

    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [seed, setSeed] = useState("");

    useEffect(() => {
        const fetchHotels = async () => {

            try {
                const request = await fetch(`${baseUrl}page=${page}&random=true` + (seed ? `&seed=${seed}` : ""))
                const data = await request.json();

                setHotels(data.entity.page.content);
                setPage(data.entity.page.pageable.pageNumber);
                setTotalPages(data.entity.page.totalPages);

                if (!seed) setSeed(data.entity.seed);

                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                toast.error("Error al cargar los hoteles: " + error);
            }
        }

        fetchHotels();
    }, [page])


    return (
        <>
            <Hotels
                hotels={hotels}
                page={page}
                seed={seed}
                totalPages={totalPages}
                setPage={setPage}
            />
        </>
    )
}

export default HotelsServerContainer