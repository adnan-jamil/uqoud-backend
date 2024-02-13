import { Request, Response } from "express";
const PriceSupport = require("../models/PriceCustomerSupportModel");
export const addPriceSupport = async (req: Request, res: Response) => {
  const { title, description, price_id, isActive, isDeleted } = req.body;
  if (price_id === undefined) {
    return res
      .status(400)
      .json({ statusCode: 400, msg: "Invalid ID provided", success: false });
  }
  try {
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
    }
    let contract;
    contract = new PriceSupport({
      title,
      description,
      price_id,
      image: imageFileName,
      isActive,
      isDeleted,
    });
    contract = await contract.save();
    if (!contract) {
      return res
        .status(400)
        .json({ msg: "Error while saving", success: false });
    }
    return res
      .status(200)
      .json({ data: contract, msg: "Data Saved successfully", success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const updatePriceSupport = async (req: Request, res: Response) => {
  try {
    let updateData = req.body;
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
      updateData.image = `${imageFileName}`;
    }
    let contract;
    contract = await PriceSupport.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateData,
      },
      { new: true }
    );
    if (!contract) {
      return res
        .status(400)
        .json({ msg: "Error while saving", success: false });
    }
    return res
      .status(200)
      .json({ data: contract, msg: "Data Saved successfully", success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get All DATA
export const GetAllpriceSupport = async (req: Request, res: Response) => {
  try {
    let getcontract = await PriceSupport.find();
    if (!getcontract) {
      return res.status(404).json({ msg: "No Data Found", success: false });
    }
    return res.status(200).json({
      data: getcontract,
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const deletepriceSupport = async (req: Request, res: Response) => {
  try {
    let getcontract = await PriceSupport.findByIdAndRemove(req.params.id);
    if (!getcontract) {
      return res.status(404).json({ msg: "Data not found", success: false });
    }
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
