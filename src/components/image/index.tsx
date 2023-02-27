import React, { useCallback, useState } from 'react';
import TrashIcon from '../icons/trash.svg';
import cn from 'classnames';
export interface IImageProps
  extends Omit<React.AllHTMLAttributes<HTMLImageElement>, 'crossOrigin'> {
  onDelete: () => void;
}

const noop = (): undefined => undefined;

const Image = React.forwardRef<HTMLImageElement, IImageProps>(
  ({ onDelete, alt = 'image', className, ...rest }, ref) => {
    const [hovered, setHover] = useState(false);
    const handleMouseEnter = useCallback(() => {
      setHover(true);
    }, []);
    const handleMouseLeave = useCallback(() => {
      setHover(false);
    }, []);
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ width: rest.width, height: rest.height }}
        className={cn(className ? className : 'relative')}
      >
        <img {...rest} ref={ref} alt={alt} />
        <div
          onClick={hovered ? onDelete : noop}
          className={cn(
            'rounded-full absolute top-1 right-1 p-1 flex items-center justify-center bg-gray-700 hover:bg-gray-500 cursor-pointer',
            !hovered && 'opacity-0'
          )}
        >
          <TrashIcon fill={'#DDDDDD'} />
        </div>
      </div>
    );
  }
);

Image.displayName = 'Image';

export default Image;
