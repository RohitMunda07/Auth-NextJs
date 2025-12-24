export default async function userProfile({ params }: any) {
    const resolvedSearch = await params;
    const id = resolvedSearch.id;
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <h1 className="text-2xl">Profile
                <span className="text-3xl bg-orange-400 text-white">{id}</span>
            </h1>
        </div>
    )
}