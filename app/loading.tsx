export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/40 backdrop-blur">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
    );
}