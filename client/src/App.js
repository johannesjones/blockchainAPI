import { useState,  useEffect } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Blocks from "./components/Blocks";
import Details from "./components/Details";
// import Pagination from "./components/Pagination";
import './App.css';

const App = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blocksPerPage] = useState(12);

  useEffect(() => {
    const fetchBlocks = async () => {
      setLoading(true);
      const res = await fetch('/api');
      const data = await res.json();
      // console.log('Res data: ', data);
      setBlocks(data);
      setLoading(false);
    }

    fetchBlocks();
  }, []);

  // Get current Block
  const indexOfLastBlock = currentPage * blocksPerPage;
  const indexOfFirstBlock = indexOfLastBlock - blocksPerPage;
  const currentBlocks = blocks.slice(indexOfFirstBlock, indexOfLastBlock);


  console.log('Blocks: ', blocks);
  
  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
      <BrowserRouter>
          <div className="container mt-5">
              <Route
                  exact
                  path="/"
                  render={() => (
                      <div>
                          <h2 className="text-primary mb-3">
                              Latest Blocks{" "}
                              {/* {new Intl.DateTimeFormat("en-GB", {
                                  dateStyle: "long",
                              }).format(
                                  new Date().setDate(new Date().getDate() - 1)
                              )} */}
                          </h2>
                          <Blocks
                              blocks={currentBlocks}
                              loading={loading}
                              blocksPerPage={blocksPerPage}
                              totalBlocks={blocks.length}
                              currentPage={currentPage}
                              paginate={paginate}
                          />
                      </div>
                  )}
              />
              <Route
                  path="/details/:hash"
                  render={(props) => (
                      <div className="details">
                          <h2 className="text-primary mb-3">
                              Block Details for hash:
                          </h2>
                          <p>{props.match.params.hash}</p>
                          <Details
                              key={props.match.url}
                              match={props.match}
                              history={props.history}
                          />
                      </div>
                  )}
              />
          </div>
      </BrowserRouter>
  );
};

export default App;
