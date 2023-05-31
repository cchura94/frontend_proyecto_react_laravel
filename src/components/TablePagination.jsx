import { useState } from "react";

const TablePagination = ({ columnas, datos, total, page, paginate, handleEdit, handleDelete }) => {

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
                                <td className="py-4 px-6" key={index}>{ eval('data.'+columna.key) }</td>
                            ))}
                            <td className="py-4 px-6">
                                <button className="py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => handleEdit(data)}>editar</button> 
                                <button className="py-2 px-4 bg-red-500 text-white hover:bg-red-600 rounded" onClick={() => handleDelete(data)}>eliminar</button>    
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