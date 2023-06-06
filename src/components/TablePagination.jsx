import { useState } from "react";

const TablePagination = ({ columnas, datos, total, page, paginate, handleEdit, handleDelete, handleAddCarrito }) => {

    const [itemsPerPage, setItemsPerPage] = useState(5)

    return (
        <>
            <table className="min-w-full">
                <thead>
                    <tr>
                        {columnas.map((columna, index) => (
                            <th className="py-3 px-6 text-left" key={index}>{columna.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {datos.map((data) => (
                        <tr key={data.id}>
                            {columnas.map((columna, index) => (
                                <td className="py-4 px-6" key={index}>{eval('data.' + columna.key)}</td>
                            ))}
                            <td className="py-4 px-6">
                                
                                <button className="py-2 px-4 bg-yellow-500 text-white hover:bg-yellow-600 rounded" onClick={() => handleAddCarrito(data)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
                                </button>
                                <button className="py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => handleEdit(data)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </button>
                                <button className="py-2 px-4 bg-red-500 text-white hover:bg-red-600 rounded" onClick={() => handleDelete(data)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            <div className="flex justify-center mt-4">
                <nav className="inline-flex rounded-md shadow">
                    <button
                        className="py-2 px-4 bg-gray-200 text-gray-500 rounded-l-md hover:bg-gray-300"
                        onClick={() => paginate(page - 1)}
                        disabled={page == 1}
                    >
                        anterior
                    </button>

                    {total > itemsPerPage && (
                        <div className="flex">
                            {Array.from({ length: Math.ceil(total / itemsPerPage) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}  py-2 px-4 mx-1 rounded-md focus:outline-none`}
                                >
                                    {index + 1}
                                </button>

                            ))}

                        </div>
                    )}


                    <button
                        className="py-2 px-4 bg-gray-200 text-gray-500 rounded-r-md hover:bg-gray-300"
                        onClick={() => paginate(page + 1)}
                        disabled={page == Math.ceil(total / itemsPerPage)}
                    >
                        siguiente
                    </button>
                </nav>

            </div>
        </>
    );
}

export default TablePagination;