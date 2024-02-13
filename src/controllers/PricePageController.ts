import { Request, Response } from "express";
const PricePage = require("../models/PricePageModel");
export const addPricePage = async (req: Request, res: Response) => {
  const { title, description, page_tag, isActive, isDeleted } = req.body;
  try {
    let work;
    work = new PricePage({
      title,
      description,
      page_tag,
      isActive,
      isDeleted,
    });
    work = await work.save();
    if (!work) {
      return res.status(500).json({
        statusCode: 500,
        msg: "Error while saving new Work",
        success: false,
      });
    }
    return res.status(201).json({
      statusCode: 201,
      data: work,
      msg: "Data Saved successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get All DATA
export const GetPricePage = async (req: Request, res: Response) => {
  try {
    let getwork = await PricePage.find();
    if (!getwork) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getwork, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const updatePricePage = async (req: Request, res: Response) => {
  try {
    let getwork = await PricePage.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!getwork) {
      return res.status(404).json({ statusCode: 404, msg: "No Data Found" });
    }
    return res.status(200).json({
      statusCode: 200,
      data: getwork,
      msg: "Data Updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletePricePage = async (req: Request, res: Response) => {
  try {
    let getworkdel = await PricePage.findByIdAndRemove(req.params.id);
    if (!getworkdel) {
      return res.status(404).json({ statusCode: 404, msg: "No Data Found" });
    }
    return res.status(200).json({
      statusCode: 200,
      msg: "Item Deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
