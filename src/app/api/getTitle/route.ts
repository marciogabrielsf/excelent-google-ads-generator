import { NextResponse } from "next/server";
import { Window } from "happy-dom";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  const { storeURL } = await req.json();

  try {
    const response = await fetch(storeURL);
    const html = await response.text();

    const window = new Window();
    window.document.body.innerHTML = html;

    const carTitle = window.document.querySelector("h2.post-title").textContent;

    return NextResponse.json({ carTitle });
  } catch {
    console.log("Invalid URL");
  }
}
