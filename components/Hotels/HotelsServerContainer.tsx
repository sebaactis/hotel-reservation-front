import { useEffect, useState } from 'react';
import Hotels from './Hotels'
import { Hotel } from '@/types';
import hotelApi from '@/services/hotel/hotel.service';
import { toast } from 'sonner';

const HotelsServerContainer = () => {

    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [seed, setSeed] = useState("");

    useEffect(() => {
        const fetchHotels = async () => {

            try {
                const data = await hotelApi.getHotels(page, seed);

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
            {hotels?.length == 0 ?
                <div className="p-12 text-center">
                    <div className="text-gray-500 mb-2 text-xl">No se encontraron hoteles</div>
                </div> :
                <Hotels
                    hotels={hotels}
                    page={page}
                    seed={seed}
                    totalPages={totalPages}
                    setPage={setPage}
                />}

        </>
    )
}

export default HotelsServerContainer