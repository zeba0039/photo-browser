import { useState } from 'react';
import { capitalize } from 'lodash';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

const Photo = ({ title, id, thumbnailUrl, url }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className='photo'>
        <img
          src={thumbnailUrl}
          alt={thumbnailUrl}
          onClick={() => {
            setShowModal(true);
          }}
        />
      </div>
      {showModal && (
        <Rodal
          visible={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          className='modal-container'
        >
          <div className='modal-content row'>
            <div className='col-lg-8 col-md-8 col-sm-12'>
              <img src={url} alt={thumbnailUrl} />
            </div>
            <div className='photo-details col-lg-4 col-md-4 col-sm-12'>
              <h3>{capitalize(title)}</h3>
            </div>
          </div>
        </Rodal>
      )}
    </>
  );
};

export default Photo;
