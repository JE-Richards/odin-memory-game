import './styles/Card.css';

export default function Card(props) {
  const { id, name, image, onCardClick } = props;

  return (
    <div className="card" onClick={() => onCardClick(id)}>
      <div className="card__img-container">
        {image ? (
          <img
            src={image}
            alt={`Sprite artwork for the pokemon ${name}`}
            className="card__img"
          />
        ) : (
          <div className="card__img--missing">
            {name} sprite is unavailable.
          </div>
        )}
      </div>
      <h1 className="card__title">{name}</h1>
    </div>
  );
}
