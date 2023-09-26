"use client";
import React from "react";

import { Button } from "@nextui-org/button";

export default function App({ name, color, buscar, id }) {
  return (
    <Button color={color} variant="ghost" onClick={() => buscar(id)}>
      {name}
    </Button>
  );
}
