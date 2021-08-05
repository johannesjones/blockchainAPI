import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Table } from "react-bootstrap";

const Blocks = ({ blocks, loading, blocksPerPage, totalBlocks, currentPage, paginate }) => {
    if (loading) {
        return (
            <div className="mt-5" style={{ textAlign: "center" }}>
                <ClipLoader />
            </div>
        );
    }
    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Block hash</th>
                        <th>Block time</th>
                        <th>Block height</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {blocks.map((block, index) => (
                                <Link to={`/details/${block.hash}`}>
                                    <ul key={index}>{block.hash}</ul>
                                </Link>
                            ))}
                        </td>
                        <td>
                            {blocks.map((block, index) => (
                                <ul key={index}>
                                    {new Intl.DateTimeFormat("en-GB", {
                                        dateStyle: "long",
                                    }).format(
                                        new Date().setDate(
                                            new Date(block.time).getDate()
                                        )
                                    )}
                                </ul>
                            ))}
                        </td>
                        <td>
                            {blocks.map((block, index) => (
                                <ul key={index}>{block.height} </ul>
                            ))}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Pagination
                blocks={blocks}
                blocksPerPage={blocksPerPage}
                totalBlocks={totalBlocks}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default Blocks;
