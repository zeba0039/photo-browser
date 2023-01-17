import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash';
import {
  fetchPhotoById,
  fetchAlbumById,
  fetchUserById,
} from '../controller/controller';
import Loader from '../components/loader';

const PhotoDetails = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    async function getPhotoDetails() {
      const photoData = await fetchPhotoById({ id });
      setPhoto(photoData);
      const albumData = await fetchAlbumById({ id: photoData.albumId });
      setAlbum(albumData);
      const userData = await fetchUserById({ userId: albumData.userId });
      setUser(userData);
      setLoading(false);
    }
    getPhotoDetails();
  }, [id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='photo-details-container'>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='/'>Home</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                {capitalize(photo.title)}
              </li>
            </ol>
          </nav>
          <div className='content-container'>
            <div className='photo-container'>
              <img src={photo.url} alt={photo.thumbnailUrl} />
              <h1 className='photo-title'>{capitalize(photo.title)}</h1>
            </div>
            <div className='divider' />
            <div className='album-details'>
              <h3>Album</h3>
              <span
                className='cursor light'
                onClick={() =>
                  navigate(`/albums/${album.id}/photos`, {
                    state: { name: album.title },
                  })
                }
              >
                {capitalize(album.title)}
              </span>
            </div>
            <div className='divider' />
            <div className='user-details'>
              <h3>Credits</h3>
              <span className='name'>
                Name: <span className='light'>{user.name}</span>
              </span>
              <span className='email' mailto>
                Email:{' '}
                <a
                  href={`mailto:${user.email}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  {user.email}
                </a>
              </span>
              <span className='phone'>
                Phone: <span className='light'>{user.phone}</span>
              </span>
              <span className='website'>
                Website:{' '}
                <a
                  href={`http://${user.website}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  {user.website}
                </a>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoDetails;
