import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Details = ({ key, match, history }) => {

    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const res = await fetch(`/api/details/${match.params.hash}`);
      const data = await res.json();
      // console.log('Res data: ', data);
      setDetails(data);
      setLoading(false);
    }

    fetchDetails();
  }, []);

    if (loading) {
        return (
            <div className="mt-5" style={{ textAlign: "center" }}>
                <ClipLoader />
            </div>
        );
    }

    return (
        <div>
            {/* <h2>Block Details for hash:</h2>
            <p>{match.params.hash}</p> */}
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Size</th>
                        <th>Block Index</th>
                        <th>Previous Hash</th>
                        <th>Number of transactions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{details.size}</td>
                        <td>{details.index}</td>
                        <td>{details.prev_hash}</td>
                        <td>{details.transactions}</td>
                    </tr>
                </tbody>
            </Table>
            <br></br>
            <Link to="/">
                <div className="" style={{ textAlign: "center" }}>
                    -- Back to List --
                </div>
            </Link>
        </div>
    );
}

export default Details;
