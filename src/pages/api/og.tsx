import { ImageResponse } from "@vercel/og";
import React from "react";

export const config = {
  runtime: "edge",
};

const raleway = fetch(
  new URL("../../../public/Raleway-ExtraLight.ttf", import.meta.url)
)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch font: ${res.statusText}`);
    }
    return res.arrayBuffer();
  });

export default async function handler() {
  const ralewayData = await raleway;

  const { title } = {
    title: "renribsilva",
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF", // cor de fundo em hexadecimal
          fontFamily: "Raleway",
        }}
      >
        <h1
          style={{
            fontSize: 200,
            color: "#272728", // cor do texto em hexadecimal
          }}
        >
          {title}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Raleway",
          data: ralewayData,
        },
      ],
    }
  );
}
