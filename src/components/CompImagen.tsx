"use client";
import React from "react";
import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

const CompImagen = ({ datos }) => {
  const { url, descripcion } = datos;
  return (
    <div>
      <Card
        isFooterBlurred
        className="w-[90%] h-[600px] col-span-12 sm:col-span-7 m-auto"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Your day your way
          </p>
          <h4 className="text-white/90 font-medium text-xl">
            Your checklist for better sleep
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={url}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center justify-center">
            <div className="flex flex-col text-center">
              <p className=" text-white/60 text-2xl py-6 text-center">
                {descripcion}
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompImagen;
