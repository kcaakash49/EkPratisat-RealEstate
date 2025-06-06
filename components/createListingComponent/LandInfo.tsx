

export default function ({ formData, handleChange }: any) {
    return (
        <>
            <div>
                <label htmlFor="landArea" className="block text-sm font-medium text-gray-700">Land Area (sq meter)</label>
                <input
                    type="number"
                    id="landArea"
                    name="landArea"
                    value={formData.landArea ?? ""}
                    onChange={handleChange}
                    min='1'
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    required
                />
            </div>
        </>
    )
}