import React from "react";
import { Button } from "../ui/button";

export const Pagination = ({ totalPages, currentPage, handlePageChange }: { totalPages: number, currentPage: number, handlePageChange: (page: number) => void }) => {
    return <>

        {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="!bg-[#0060FF] hover:bg-[#0060FF] text-white border-white/20 cursor-pointer"
                >
                    Anterior
                </Button>

                <div className="flex items-center gap-4">
                    {totalPages > 2 && (
                        <select
                            className="px-4 p-2 bg-[#0060FF] backdrop-blur-sm rounded-lg border border-white/20 text-white"
                            value={currentPage}
                            onChange={(e) => handlePageChange(Number(e.target.value))}
                        >
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <option key={page} value={page}>
                                    Página {page}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="!bg-[#0060FF] hover:bg-[#0060FF] text-white border-white/20 cursor-pointer"
                >
                    Siguiente
                </Button>
            </div>
        )}</>
};

