import { NextApiRequest, NextApiResponse } from "next";
import Compras from "../../../models/Compras";
import dbConnect from "../../../utils/dbConnect";
import { comprasController } from "./controller/comprasController";
dbConnect();
export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "GET":
      try {
        const compras = await Compras.find({});
        response.status(200).json({ success: true, data: compras });
      } catch (error) {
        response.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const compra = await comprasController.create(request.body);

        return response.status(200).json({ success: true, data: compra });
      } catch (error) {
        response.status(400).json({ success: false });
      }
      break;
    default:
      response.status(400).json({ success: true });
      break;
  }
};
