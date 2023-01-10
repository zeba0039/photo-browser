import React, { useEffect, useState } from 'react';
import Album from '../components/album';
import { fetchAlbums } from '../controller/controller';
import Pagination from '../components/pagination';
import Loader from '../components/loader';

const HomePage = () => {
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalCount, setCount] = useState(20);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAlbums() {
      const { data, count } = await fetchAlbums({
        params: { _page: page, _limit: limit },
      });
      setAlbums(data);
      setCount(parseInt(count));
      setLoading(false);
    }
    getAlbums();
  }, [page, limit]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      {loading || albums.length === 0 ? (
        <Loader />
      ) : (
        <>
          <div className='albums-container'>
            {albums.map(({ id, title }) => {
              return <Album id={id} title={title} key={id} />;
            })}
          </div>
          <Pagination
            page={page}
            limit={limit}
            totalCount={totalCount}
            handlePageClick={handlePageClick}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
