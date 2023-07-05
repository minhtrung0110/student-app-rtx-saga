// @flow
import * as React from 'react';
import { forwardRef } from 'react';

function ImageCustom(props, ref) {
  const [image, setImage] = React.useState<any>();
  const [error, setError] = React.useState<any>();
  var classNameType = 'd-block app-border-8px d-flex justify-content-center';
  switch (props.type) {
    case 'avatar-overlay':
      classNameType = 'avatar-detail';
      break;
    case 'avatar':
      classNameType = 'img-avatar';
      break;
    default:
      classNameType = '';
      break;
  }
  const handleImageLoaded = () => {
    setImage('loaded');
    setError(false);
  };

  const handleImageError = () => {
    setImage('failed to load');
    setError(true);
  };

  return (
    <img
      src={error ? '' : props.src}
      ref={ref}
      //  onError={handleImageError.bind(this)}
      className={`${classNameType} ${props.className}`}
      alt={props.alt}
    />
  );
}

export default forwardRef(ImageCustom);

// d-block app-border-8px d-flex justify-content-center
