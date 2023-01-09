import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllPhotos, fetchPhotos } from '../controller/controller';
import Pagination from '../components/pagination';
import Loader from '../components/loader';
import Photo from '../components/photo';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalCount, setCount] = useState(20);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    async function getPhotos() {
      let resp;
      if (id) {
        resp = await fetchPhotos({
          id,
          params: { _page: page, _limit: limit },
        });
      } else {
        resp = await fetchAllPhotos({
          params: { _page: page, _limit: limit },
        });
      }
      const { data, count } = resp;
      setPhotos(data);
      setCount(parseInt(count));
      setLoading(false);
    }
    getPhotos();
  }, [page, limit, id]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='albums-container'>
            {photos.map(({ id, title, thumbnailUrl, url }) => {
              return (
                <Photo
                  id={id}
                  title={title}
                  key={id}
                  thumbnailUrl={thumbnailUrl}
                  url={url}
                />
              );
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
export default Photos;