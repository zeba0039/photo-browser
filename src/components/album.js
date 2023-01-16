import { useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash';

const Album = ({ title, id }) => {
  let navigate = useNavigate();
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return (
    <div className='album-tile' style={{ backgroundColor: `#${randomColor}` }}>
      <h1>{title[0].toUpperCase()}</h1>
      <div className='details'>
        <span>{capitalize(title)}</span>
        <button
          onClick={() => {
            navigate(`/albums/${id}/photos`, { state: { name: title } });
          }}
          className='more-photos'
        >
          More Photos
        </button>
      </div>
    </div>
  );
};

export default Album;
