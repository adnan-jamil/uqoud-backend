import { Request, Response } from "express";
const FAQs = require("../models/FAQsModel");
const Products = require("../models/ProductModel");
export const NewFAQs = async (req: Request, res: Response) => {
  const { question, answer, productId, isActive, isDeleted } = req.body;
  const product = await Products.find({ productId });

  if (!product) {
    return res
      .status(400)
      .json({ statusCode: 400, msg: "Invalid Product Id", success: false });
  }
  try {
    let faq = new FAQs({
      productId,
      question,
      answer,
      isActive,
      isDeleted,
    });
    faq = await faq.save();
    if (!faq) {
      return res.status(500).json({
        statusCode: 500,
        msg: "Error while saving new FAQ",
        success: false,
      });
    }
    return res.status(201).json({
      statusCode: 201,
      data: faq,
      msg: "Data Saved successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
// get All DATA
export const AllFAQs = async (req: Request, res: Response) => {
  try {
    let allfaq = await FAQs.find();
    if (!allfaq) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "No Data Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: allfaq, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const getSingleProductFAQs = async (req: Request, res: Response) => {
  try {
    let allfaq = await FAQs.find({ productId: req.params.id });
    if (!allfaq) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "No Data Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: allfaq, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateFAQ = async (req: Request, res: Response) => {
  try {
    let updatefaq = await FAQs.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatefaq) {
      return res
        .status(500)
        .json({ statusCode: 500, msg: "Not Updated", success: false });
    }
    return res.status(200).json({
      statusCode: 200,
      data: updatefaq,
      msg: "Data updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteFAQ = async (req: Request, res: Response) => {
  try {
    let faqdel = await FAQs.findByIdAndRemove(req.params.id);
    if (!faqdel) {
      return res.status(500).json({ statusCode: 500, msg: "Not Deleted" });
    }
    return res.status(200).json({
      statusCode: 200,
      msg: "Data Deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
