import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CompImagen from "../components/CompImagen";

export const Home = () => {
  var settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const imagenes = [
    {
      id: 1,
      descripcion:
        "La lectura es un viaje que te lleva a lugares inimaginables, te presenta personajes inolvidables y te permite vivir mil vidas en una sola.",
      url: "https://images.pexels.com/photos/1034008/pexels-photo-1034008.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      descripcion:
        "Los libros son las llaves que abren las puertas de la imaginación y el conocimiento. Ábrelos y descubre mundos sin fin.",
      url: "https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      descripcion:
        "La lectura es el alimento de la mente, el combustible del alma y la puerta hacia un futuro lleno de posibilidades.",
      url: "https://images.pexels.com/photos/2923463/pexels-photo-2923463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];
  return (
    <div className="m-auto w-[90%] h-[50%] ">
      <Slider  {...settings}>
        {imagenes.map((imagen) => {
          return <CompImagen key={imagen.id} datos={imagen} />;
        })}
      </Slider>
    </div>
  );
};

