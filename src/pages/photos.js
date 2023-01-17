import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash';
import { Carousel } from 'react-responsive-carousel';
import Rodal from 'rodal';
import { fetchAllPhotos, fetchPhotos } from '../controller/controller';
import Pagination from '../components/pagination';
import Loader from '../components/loader';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'rodal/lib/rodal.css';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalCount, setCount] = useState(20);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  let navigate = useNavigate();
  let name;
  if (location.state) {
    name = location.state.name;
  }
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
      {loading || photos.length === 0 ? (
        <Loader />
      ) : (
        <>
          {id ? (
            <>
              <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <a href='/'>Home</a>
                  </li>
                  <li className='breadcrumb-item active' aria-current='page'>
                    {capitalize(name)}
                  </li>
                </ol>
              </nav>
            </>
          ) : (
            <>
              <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <a href='/'>Home</a>
                  </li>
                  <li className='breadcrumb-item active' aria-current='page'>
                    Photos
                  </li>
                </ol>
              </nav>
            </>
          )}
          <div className='albums-container'>
            {photos.map(({ id, thumbnailUrl }) => {
              return (
                <div
                  className='photo'
                  key={id}
                  onClick={() => setShowModal(true)}
                >
                  <img src={thumbnailUrl} alt={thumbnailUrl} />
                </div>
              );
            })}
          </div>
          {showModal && (
            <Rodal
              visible={showModal}
              onClose={() => {
                setShowModal(false);
              }}
              className='modal-container'
            >
              <Carousel showArrows={true} autoPlay>
                {photos.map(({ id, title, url }) => {
                  return (
                    <div key={id}>
                      <img src={url} alt={url} />
                      <p
                        className='legend'
                        onClick={() => {
                          navigate(`/photo/${id}`);
                        }}
                      >
                        {capitalize(title)}
                      </p>
                    </div>
                  );
                })}
              </Carousel>
            </Rodal>
          )}
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
