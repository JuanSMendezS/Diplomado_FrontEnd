import { Button, Card, CardFooter, Image } from "@nextui-org/react";

const CompCard = ({ datos }) => {
  const { titulo, foto, autor, descripcion } = datos;
  return (
    <div>
      <Card
        isFooterBlurred
        className="w-[214px] h-[300px] col-span-12 sm:col-span-5"
      >
        <CardFooter className="absolute z-10 top-0  flex-col items-start bg-white/30 border-b-1 border-zinc-100/50 border-r-0 rounded-none">
          <p className="text-tiny text-black uppercase font-bold">{autor}</p>
          <h4 className="text-black font-medium text-xl">{titulo}</h4>
        </CardFooter>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={foto!==null?`data:image/${foto.extension};base64,${foto.Base64}`:null}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-tiny">{descripcion}</p>
          </div>
          <Button className="text-tiny" color="secondary" size="sm">
            Prestar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompCard;
