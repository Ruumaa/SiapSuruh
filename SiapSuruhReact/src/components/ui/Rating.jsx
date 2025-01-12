import { Fragment } from 'react';
const Rating = ({ rating }) => {
  return (
    <div className="rating rating-lg">
      {[...Array(5)].map((_, i) => (
        <Fragment key={i}>
          <input
            type="radio"
            name={`rating-8`}
            className={`mask mask-star-2 bg-orange-400 cursor-default`}
            checked={i < Math.floor(rating)}
            readOnly
          />
        </Fragment>
      ))}
    </div>
  );
};

export default Rating;
